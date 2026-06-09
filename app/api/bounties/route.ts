import { NextResponse } from 'next/server'
import { fetchAllBounties } from '../../../lib/adapters'
import { getMemoryCache, setMemoryCache } from '../../../lib/cache'

export async function GET() {
  try {
    const cached = getMemoryCache('all_bounties', 30 * 60 * 1000)
    if (cached) {
      return NextResponse.json(cached)
    }

    const bounties = await fetchAllBounties()
    setMemoryCache('all_bounties', bounties)
    
    return NextResponse.json(bounties)
  } catch (error) {
    console.error('Failed to fetch bounties:', error)
    return NextResponse.json({ error: 'Failed to fetch bounties' }, { status: 500 })
  }
}
