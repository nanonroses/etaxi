/**
 * Passenger Authentication Utilities
 *
 * For passenger mobile app (React Native) authentication
 * Uses OTP (One-Time Password) instead of regular passwords
 */

import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';

// JWT Secret (MUST be defined in environment variables)
// IMPORTANTE: Usar una clave DIFERENTE a DRIVER_JWT_SECRET y AUTH_SECRET
const PASSENGER_JWT_SECRET = process.env.PASSENGER_JWT_SECRET || process.env.DRIVER_JWT_SECRET || '';
const PASSENGER_JWT_EXPIRES_IN = '30d'; // 30 days

/**
 * Validates that PASSENGER_JWT_SECRET is configured
 * Throws error if not configured (at runtime, not build time)
 */
function ensureJWTSecret(): string {
  if (!PASSENGER_JWT_SECRET) {
    throw new Error(
      'PASSENGER_JWT_SECRET must be defined in environment variables. ' +
      'Generate a secure secret with: openssl rand -base64 32'
    );
  }
  return PASSENGER_JWT_SECRET;
}

// JWT Payload Interface
export interface PassengerJWTPayload {
  passengerId: string;
  phone: string;
  iat?: number;
  exp?: number;
}

/**
 * Generate JWT token for passenger
 */
export function generatePassengerToken(payload: Omit<PassengerJWTPayload, 'iat' | 'exp'>): string {
  const secret = ensureJWTSecret();
  return jwt.sign(payload, secret, {
    expiresIn: PASSENGER_JWT_EXPIRES_IN,
  });
}

/**
 * Verify and decode passenger JWT token
 */
export function verifyPassengerToken(token: string): PassengerJWTPayload | null {
  try {
    const secret = ensureJWTSecret();
    const decoded = jwt.verify(token, secret) as PassengerJWTPayload;
    return decoded;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('JWT verification failed:', error);
    }
    return null;
  }
}

// ====================================
// OTP (One-Time Password) Management
// ====================================

// In-memory OTP storage (for MVP)
// En producción, usar Redis o base de datos
interface OTPEntry {
  code: string;
  expiresAt: Date;
  attempts: number;
}

const otpStore = new Map<string, OTPEntry>();

// Cleanup expired OTPs every 10 minutes
setInterval(() => {
  const now = new Date();
  for (const [phone, entry] of otpStore.entries()) {
    if (entry.expiresAt < now) {
      otpStore.delete(phone);
    }
  }
}, 10 * 60 * 1000);

/**
 * Generate a 6-digit OTP code
 */
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Send OTP to phone number
 * En MVP: solo guarda en memoria
 * En producción: integrar con servicio de SMS (Twilio, AWS SNS, etc.)
 */
export async function sendOTP(phone: string): Promise<{ success: boolean; otp?: string }> {
  try {
    // Validar formato de teléfono
    if (!phone || !phone.startsWith('+569')) {
      throw new Error('Invalid phone number format');
    }

    // Generar OTP
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutos

    // Guardar en memoria
    otpStore.set(phone, {
      code: otp,
      expiresAt,
      attempts: 0,
    });

    // TODO: Integrar con servicio de SMS real
    // Log OTP only in development for testing
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log(`[DEV ONLY] OTP for ${phone}: ${otp}`);
      return { success: true, otp };
    }

    return { success: true };
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('Error sending OTP:', error);
    }
    return { success: false };
  }
}

/**
 * Verify OTP code
 */
export function verifyOTP(phone: string, code: string): boolean {
  const entry = otpStore.get(phone);

  if (!entry) {
    return false;
  }

  // Check if expired
  if (entry.expiresAt < new Date()) {
    otpStore.delete(phone);
    return false;
  }

  // Check attempts
  if (entry.attempts >= 5) {
    otpStore.delete(phone);
    return false;
  }

  // Verify code
  if (entry.code !== code) {
    entry.attempts++;
    return false;
  }

  // Success - remove OTP
  otpStore.delete(phone);
  return true;
}

/**
 * Find or create passenger by phone
 */
export async function findOrCreatePassenger(phone: string, name?: string, email?: string) {
  try {
    // Try to find existing passenger
    let passenger = await prisma.passenger.findUnique({
      where: { phone },
    });

    // Create if doesn't exist
    if (!passenger) {
      passenger = await prisma.passenger.create({
        data: {
          phone,
          name: name || null,
          email: email || null,
        },
      });
    }

    return passenger;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('Error finding/creating passenger:', error);
    }
    throw error;
  }
}

/**
 * Extract and verify passenger from Authorization header
 * To be used in protected API routes
 */
export async function getPassengerFromRequest(request: NextRequest) {
  try {
    // Get Authorization header
    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

    // Extract token
    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Verify token
    const payload = verifyPassengerToken(token);
    if (!payload) {
      return null;
    }

    // Fetch passenger from database
    const passenger = await prisma.passenger.findUnique({
      where: { id: payload.passengerId },
    });

    if (!passenger) {
      return null;
    }

    return passenger;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('Error extracting passenger from request:', error);
    }
    return null;
  }
}

/**
 * Middleware helper to require authentication
 * Returns passenger if authenticated, throws error otherwise
 */
export async function requirePassengerAuth(request: NextRequest) {
  const passenger = await getPassengerFromRequest(request);

  if (!passenger) {
    throw new Error('Unauthorized - Invalid or missing token');
  }

  return passenger;
}
