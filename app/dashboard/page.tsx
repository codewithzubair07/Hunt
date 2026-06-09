'use client'

import { Navbar } from "../../components/ui/Navbar"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Bounty, SkillVector } from '../../types'
import { FilterBar } from '../../components/ui/FilterBar'
import { StatCard } from '../../components/ui/StatCard'
import { BountyFeed } from '../../components/bounty/BountyFeed'
import { EmptyState } from '../../components/ui/EmptyState'
import Loading from './loading'

export default function Dashboard() {
  const router = useRouter()
  const [bounties, setBounties] = useState<Bounty[]>([])
  const [profile, setProfile] = useState<SkillVector | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filters, setFilters] = useState({ platform: 'All', difficulty: 'All' })

  useEffect(() => {
    const profStr = localStorage.getItem('bm_skill_vector')
    if (!profStr) {
      router.push('/')
      return
    }
    const prof = JSON.parse(profStr)
    setProfile(prof)

    const fetchMatch = async () => {
      try {
        const cachedRaw = localStorage.getItem('bm_bounties_cache')
        const cacheTs = localStorage.getItem('bm_cache_ts')
        
        let rawBounties = []
        if (cachedRaw && cacheTs && Date.now() - parseInt(cacheTs) < 30 * 60 * 1000) {
          rawBounties = JSON.parse(cachedRaw)
        } else {
          const rawRes = await fetch('/api/bounties')
          rawBounties = await rawRes.json()
          localStorage.setItem('bm_bounties_cache', JSON.stringify(rawBounties))
          localStorage.setItem('bm_cache_ts', Date.now().toString())
        }

        const matchRes = await fetch('/api/match', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ bounties: rawBounties, profile: prof })
        })
        const matched = await matchRes.json()
        setBounties(matched)
      } catch (e) {
        setError('Failed to load bounties. Showing partial results.')
      } finally {
        setLoading(false)
      }
    }
    fetchMatch()
  }, [router])

  if (loading) return <Loading />
  if (!profile) return null

  const filteredBounties = bounties.filter(b => {
    if (filters.platform !== 'All' && b.source_platform.toLowerCase() !== filters.platform.toLowerCase()) return false
    if (filters.difficulty !== 'All' && b.difficulty.toLowerCase() !== filters.difficulty.toLowerCase()) return false
    return true
  })

  const totalRewardPool = filteredBounties.reduce((sum, b) => sum + (b.reward_usd || 0), 0)
  const topMatch = filteredBounties.length > 0 ? filteredBounties[0].match_score : 0

  return (
    <div className="pb-12">
      <Navbar />
      <FilterBar filters={filters} setFilters={setFilters} />
      
      <div className="max-w-7xl mx-auto px-6 mt-6">
        {error && <div className="bg-[#ef4444]/10 text-[#ef4444] border border-[#ef4444]/20 p-4 rounded-xl mb-6">{error}</div>}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <StatCard label="Open Opportunities" value={filteredBounties.length} />
          <StatCard label="Best Match" value={`${topMatch || 0}%`} />
          <StatCard label="Total Reward Pool" value={new Intl.NumberFormat('en-US').format(totalRewardPool)} prefix="$" />
        </div>

        {filteredBounties.length === 0 ? (
          <EmptyState />
        ) : (
          <BountyFeed bounties={filteredBounties} />
        )}
      </div>
    </div>
  )
}
