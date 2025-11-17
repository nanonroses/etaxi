/**
 * Driver Login API
 *
 * POST /api/driver/login
 *
 * For mobile app (React Native) authentication
 * Returns JWT token on successful login
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateDriver, generateDriverToken } from '@/lib/driver-auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { phoneOrEmail, password } = body;

    // Validate input
    if (!phoneOrEmail || !password) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Phone/email and password are required',
        },
        { status: 400 }
      );
    }

    // Authenticate driver
    let driver;
    try {
      driver = await authenticateDriver(phoneOrEmail, password);
    } catch (error: any) {
      // Handle specific errors (disabled account, expired license)
      return NextResponse.json(
        {
          ok: false,
          error: error.message || 'Authentication failed',
        },
        { status: 403 }
      );
    }

    if (!driver) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Invalid credentials',
        },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = generateDriverToken({
      driverId: driver.id,
      operatorId: driver.fleetOperatorId,
      phone: driver.phone,
    });

    // Return success response
    return NextResponse.json(
      {
        ok: true,
        token,
        driver: {
          id: driver.id,
          fullName: driver.fullName,
          phone: driver.phone,
          email: driver.email,
          professionalLicense: driver.professionalLicense,
          licenseValidUntil: driver.licenseValidUntil,
          isEnabled: driver.isEnabled,
          fleetOperator: driver.fleetOperator,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Driver login error:', error);
    return NextResponse.json(
      {
        ok: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
