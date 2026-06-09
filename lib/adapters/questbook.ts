import { Bounty } from '../../types'

export async function fetchQuestbook(): Promise<Bounty[]> {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 8000)
    const res = await fetch('https://api.questbook.app/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: '{ grantPrograms(where: { status: "Active" }) { id name description url } }' }),
      signal: controller.signal
    })
    clearTimeout(timeoutId)
    if (!res.ok) return []
    const data = await res.json()
    return (data.data?.grantPrograms || []).map((item: any) => ({
      id: `questbook:${item.id}`,
      title: item.name,
      description: item.description || '',
      reward_usd: null,
      difficulty: 'unknown',
      languages: [],
      tags: ['grant'],
      ecosystem: [],
      source_platform: 'questbook',
      issue_url: item.url || 'https://questbook.app',
      created_at: new Date().toISOString()
    }))
  } catch (e) { return [] }
}
