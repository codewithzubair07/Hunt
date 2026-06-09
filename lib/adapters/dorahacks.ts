import { Bounty } from '../../types'

export async function fetchDorahacks(): Promise<Bounty[]> {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 8000)
    const res = await fetch('https://dorahacks.io/api/hackathon/list?status=open', { signal: controller.signal })
    clearTimeout(timeoutId)
    if (!res.ok) return []
    const data = await res.json()
    return data.data?.list?.map((item: any) => ({
      id: `dorahacks:${item.id}`,
      title: item.name || 'Hackathon',
      description: item.brief || '',
      reward_usd: item.rewardTotal || null,
      difficulty: 'intermediate',
      languages: [],
      tags: ['hackathon'],
      ecosystem: [],
      source_platform: 'dorahacks',
      issue_url: `https://dorahacks.io/hackathon/${item.id}`,
      deadline: item.endTime,
      created_at: new Date().toISOString()
    })) || []
  } catch (e) { return [] }
}
