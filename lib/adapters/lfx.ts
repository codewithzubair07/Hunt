import { Bounty } from '../../types'

export async function fetchLFX(): Promise<Bounty[]> {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 8000)
    const res = await fetch('https://api.mentorship.lfx.linuxfoundation.org/v1/programs?status=active', { signal: controller.signal })
    clearTimeout(timeoutId)
    if (!res.ok) return []
    const data = await res.json()
    return (data.data || []).map((item: any) => ({
      id: `lfx:${item.id}`,
      title: item.name,
      description: item.description || '',
      reward_usd: 3000, // standard LFX stipend
      difficulty: 'beginner',
      languages: item.skills || [],
      tags: ['mentorship', 'linux'],
      ecosystem: ['Linux', 'Open Source'],
      source_platform: 'lfx',
      issue_url: item.url || `https://mentorship.lfx.linuxfoundation.org/project/${item.id}`,
      created_at: new Date().toISOString()
    }))
  } catch (e) { return [] }
}
