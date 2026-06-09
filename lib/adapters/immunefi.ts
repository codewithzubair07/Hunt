import { Bounty } from '../../types'

export async function fetchImmunefi(): Promise<Bounty[]> {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 8000)
    const res = await fetch('https://immunefi.com/api/bounty/list/', { signal: controller.signal })
    clearTimeout(timeoutId)
    if (!res.ok) return []
    const data = await res.json()
    return data.map((item: any) => ({
      id: `immunefi:${item.id}`,
      title: item.project || 'Bug Bounty',
      description: item.description || 'Immunefi Bug Bounty',
      reward_usd: item.max_reward || null,
      difficulty: 'advanced',
      languages: ['Solidity', 'Rust', 'Go'],
      tags: ['security', 'smart-contract'],
      ecosystem: ['Web3'],
      source_platform: 'immunefi',
      issue_url: item.url || `https://immunefi.com/bounty/${item.id}`,
      created_at: new Date().toISOString()
    })) || []
  } catch (e) { return [] }
}
