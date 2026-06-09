import { NextRequest, NextResponse } from 'next/server'
import { analyzeProfile } from '../../../lib/github'

export async function GET(request: NextRequest) {
  const username = request.nextUrl.searchParams.get('username')
  if (!username) {
    return NextResponse.json({ error: 'Username is required' }, { status: 400 })
  }

  try {
    const profile = await analyzeProfile(username)
    return NextResponse.json(profile)
  } catch (error: any) {
    console.error('Profile analysis failed:', error)
    return NextResponse.json({ error: error.message || 'Profile analysis failed' }, { status: 500 })
  }
}
