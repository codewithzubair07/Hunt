import { Bounty } from '../../types'

export async function fetchIssueHunt(): Promise<Bounty[]> {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 8000)
    const res = await fetch('https://issuehunt.io/api/v1/issues?state=open&limit=100', { signal: controller.signal })
    clearTimeout(timeoutId)
    if (!res.ok) return []
    const data = await res.json()
    return data.map((item: any) => ({
      id: `issuehunt:${item.id}`,
      title: item.title,
      description: item.body || '',
      reward_usd: item.reward_amount ? item.reward_amount / 100 : null,
      difficulty: 'unknown',
      languages: [],
      tags: [],
      ecosystem: [],
      source_platform: 'issuehunt',
      issue_url: item.html_url || '',
      created_at: item.created_at || new Date().toISOString()
    })) || []
  } catch (e) { return [] }
}
