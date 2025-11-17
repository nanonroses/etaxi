/**
 * Driver Authentication Utilities
 *
 * For mobile app (React Native) authentication
 * Separate from backoffice NextAuth authentication
 */

import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

// JWT Secret (MUST be defined in environment variables)
const DRIVER_JWT_SECRET = process.env.DRIVER_JWT_SECRET || '';
const DRIVER_JWT_EXPIRES_IN = '7d'; // 7 days

/**
 * Validates that DRIVER_JWT_SECRET is configured
 * Throws error if not configured (at runtime, not build time)
 */
function ensureJWTSecret(): string {
  if (!DRIVER_JWT_SECRET) {
    throw new Error(
      'DRIVER_JWT_SECRET must be defined in environment variables. ' +
      'Generate a secure secret with: openssl rand -base64 32'
    );
  }
  return DRIVER_JWT_SECRET;
}

// JWT Payload Interface
export interface DriverJWTPayload {
  driverId: string;
  operatorId: string;
  phone: string;
  iat?: number;
  exp?: number;
}

/**
 * Hash a password with bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

/**
 * Compare password with hashed password
 */
export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

/**
 * Generate JWT token for driver
 */
export function generateDriverToken(payload: Omit<DriverJWTPayload, 'iat' | 'exp'>): string {
  const secret = ensureJWTSecret();
  return jwt.sign(payload, secret, {
    expiresIn: DRIVER_JWT_EXPIRES_IN,
  });
}

/**
 * Verify and decode driver JWT token
 */
export function verifyDriverToken(token: string): DriverJWTPayload | null {
  try {
    const secret = ensureJWTSecret();
    const decoded = jwt.verify(token, secret) as DriverJWTPayload;
    return decoded;
  } catch (error) {
    console.error('JWT verification failed:', error);
    return null;
  }
}

/**
 * Authenticate driver with phone/email and password
 * Returns driver object if successful, null otherwise
 */
export async function authenticateDriver(phoneOrEmail: string, password: string) {
  try {
    // Try to find driver by phone or email
    const driver = await prisma.driver.findFirst({
      where: {
        OR: [
          { phone: phoneOrEmail },
          { email: phoneOrEmail },
        ],
      },
      include: {
        fleetOperator: true,
      },
    });

    if (!driver) {
      return null;
    }

    // Check if driver is enabled
    if (!driver.isEnabled) {
      throw new Error('Driver account is disabled');
    }

    // Check if license is valid
    if (driver.licenseValidUntil && new Date(driver.licenseValidUntil) < new Date()) {
      throw new Error('Driver license has expired');
    }

    // Verify password
    const isPasswordValid = await comparePassword(password, driver.password);
    if (!isPasswordValid) {
      return null;
    }

    // Remove password from response
    const { password: _, ...driverWithoutPassword } = driver;

    return driverWithoutPassword;
  } catch (error) {
    console.error('Driver authentication error:', error);
    throw error;
  }
}

/**
 * Extract and verify driver from Authorization header
 * To be used in protected API routes
 */
export async function getDriverFromRequest(request: NextRequest) {
  try {
    // Get Authorization header
    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

    // Extract token
    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Verify token
    const payload = verifyDriverToken(token);
    if (!payload) {
      return null;
    }

    // Fetch driver from database
    const driver = await prisma.driver.findUnique({
      where: { id: payload.driverId },
      include: {
        fleetOperator: {
          select: {
            id: true,
            name: true,
            type: true,
            city: true,
          },
        },
      },
    });

    if (!driver) {
      return null;
    }

    // Check if driver is still enabled
    if (!driver.isEnabled) {
      return null;
    }

    // Remove password from response
    const { password: _, ...driverWithoutPassword } = driver;

    return driverWithoutPassword;
  } catch (error) {
    console.error('Error extracting driver from request:', error);
    return null;
  }
}

/**
 * Middleware helper to require authentication
 * Returns driver if authenticated, throws error otherwise
 */
export async function requireDriverAuth(request: NextRequest) {
  const driver = await getDriverFromRequest(request);

  if (!driver) {
    throw new Error('Unauthorized - Invalid or missing token');
  }

  return driver;
}
