import { NextResponse } from 'next/server'
import { issueFormToken } from '@/lib/anti-spam/form-token'

export const dynamic = 'force-dynamic'

export async function GET() {
  return NextResponse.json(
    { token: issueFormToken() },
    {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
        Pragma: 'no-cache',
      },
    }
  )
}
