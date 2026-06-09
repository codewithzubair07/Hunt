import { Bounty } from '../../types'

export async function fetchAlgora(): Promise<Bounty[]> {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 8000)
    const res = await fetch('https://console.algora.io/api/bounties?status=open&limit=100', { signal: controller.signal })
    clearTimeout(timeoutId)
    if (!res.ok) return []
    const data = await res.json()
    return data.items?.map((item: any) => ({
      id: `algora:${item.id}`,
      title: item.title,
      description: item.description || '',
      reward_usd: item.reward_usd || item.reward || null,
      difficulty: 'intermediate',
      languages: item.languages || [],
      tags: item.tags || [],
      ecosystem: [],
      source_platform: 'algora',
      issue_url: item.url || item.issue_url || '',
      created_at: item.created_at || new Date().toISOString()
    })) || []
  } catch (e) { return [] }
}
