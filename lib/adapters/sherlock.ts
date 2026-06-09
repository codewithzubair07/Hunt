import { Bounty } from '../../types'

export async function fetchSherlock(): Promise<Bounty[]> {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 8000)
    const res = await fetch('https://app.sherlock.xyz/api/contests', { signal: controller.signal })
    clearTimeout(timeoutId)
    if (!res.ok) return []
    const data = await res.json()
    const active = data.filter((c: any) => c.status === 'CREATED' || !c.status)
    return active.map((item: any) => ({
      id: `sherlock:${item.id}`,
      title: item.title || 'Sherlock Audit',
      description: item.description || '',
      reward_usd: item.reward || null,
      difficulty: 'advanced',
      languages: ['Solidity'],
      tags: ['audit', 'security'],
      ecosystem: ['EVM'],
      source_platform: 'sherlock',
      issue_url: `https://app.sherlock.xyz/audits/${item.id}`,
      deadline: item.end_time,
      created_at: new Date().toISOString()
    }))
  } catch (e) { return [] }
}
