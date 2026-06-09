import { NextRequest, NextResponse } from 'next/server'
import { matchBounties } from '../../../lib/matcher'

export async function POST(request: NextRequest) {
  try {
    const { bounties, profile } = await request.json()
    if (!bounties || !profile) {
      return NextResponse.json({ error: 'Bounties and profile required' }, { status: 400 })
    }

    const matched = await matchBounties(bounties, profile)
    return NextResponse.json(matched)
  } catch (error) {
    console.error('Matching failed:', error)
    return NextResponse.json({ error: 'Matching failed' }, { status: 500 })
  }
}
