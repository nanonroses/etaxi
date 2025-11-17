/**
 * Driver Profile API
 *
 * GET /api/driver/me
 *
 * Returns current driver's profile
 * Requires Authorization header with Bearer token
 */

import { NextRequest, NextResponse } from 'next/server';
import { requireDriverAuth } from '@/lib/driver-auth';

export async function GET(req: NextRequest) {
  try {
    // Verify authentication
    const driver = await requireDriverAuth(req);

    // Return driver profile
    return NextResponse.json(
      {
        ok: true,
        driver: {
          id: driver.id,
          fullName: driver.fullName,
          phone: driver.phone,
          email: driver.email,
          professionalLicense: driver.professionalLicense,
          licenseValidUntil: driver.licenseValidUntil,
          isEnabled: driver.isEnabled,
          createdAt: driver.createdAt,
          fleetOperator: driver.fleetOperator,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Driver profile error:', error);

    // Handle authentication errors
    if (error.message?.includes('Unauthorized')) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Unauthorized - Invalid or missing token',
        },
        { status: 401 }
      );
    }

    // Handle other errors
    return NextResponse.json(
      {
        ok: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
