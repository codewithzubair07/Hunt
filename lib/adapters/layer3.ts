import { Bounty } from '../../types'

export async function fetchLayer3(): Promise<Bounty[]> {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 8000)
    const res = await fetch('https://api.layer3.xyz/v1/quests?status=active', { signal: controller.signal })
    clearTimeout(timeoutId)
    if (!res.ok) return []
    const data = await res.json()
    return (data || []).map((item: any) => ({
      id: `layer3:${item.id}`,
      title: item.title,
      description: item.description || '',
      reward_usd: null,
      difficulty: 'beginner',
      languages: [],
      tags: ['quest', 'web3'],
      ecosystem: ['Web3'],
      source_platform: 'layer3',
      issue_url: item.url || `https://layer3.xyz/quests/${item.id}`,
      created_at: new Date().toISOString()
    }))
  } catch (e) { return [] }
}
