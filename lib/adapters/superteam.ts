import { Bounty } from '../../types'

export async function fetchSuperteam(): Promise<Bounty[]> {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 8000)
    const res = await fetch('https://superteam.fun/api/listings?type=bounty&status=open', { signal: controller.signal })
    clearTimeout(timeoutId)
    if (!res.ok) return []
    const data = await res.json()
    return (data || []).map((item: any) => ({
      id: `superteam:${item.id}`,
      title: item.title,
      description: item.description || '',
      reward_usd: item.rewardAmount || null,
      difficulty: 'intermediate',
      languages: ['Rust', 'TypeScript'],
      tags: item.skills || [],
      ecosystem: ['Solana'],
      source_platform: 'superteam',
      issue_url: item.url || 'https://superteam.fun/bounties',
      deadline: item.deadline,
      created_at: item.createdAt || new Date().toISOString()
    }))
  } catch (e) { return [] }
}
