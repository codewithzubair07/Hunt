import { Bounty } from '../../types'

export async function fetchCode4rena(): Promise<Bounty[]> {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 8000)
    const res = await fetch('https://raw.githubusercontent.com/code-423n4/code423n4.com/main/_data/contests/contests.csv', { signal: controller.signal })
    clearTimeout(timeoutId)
    if (!res.ok) return []
    const csv = await res.text()
    
    // Minimal CSV parse
    const lines = csv.split('\n')
    const bounties: Bounty[] = []
    const today = new Date().toISOString().split('T')[0]

    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue
      const cols = lines[i].split(',')
      const start = cols[1]
      const end = cols[2]
      if (new Date(start) <= new Date(today) && new Date(today) <= new Date(end)) {
        bounties.push({
          id: `code4rena:${cols[0]}`,
          title: cols[3] || 'Code4rena Contest',
          description: 'Smart contract audit contest',
          reward_usd: null, // would need more parsing
          difficulty: 'advanced',
          languages: ['Solidity'],
          tags: ['audit', 'security'],
          ecosystem: ['EVM'],
          source_platform: 'code4rena',
          issue_url: `https://code4rena.com/contests`,
          deadline: end,
          created_at: new Date().toISOString()
        })
      }
    }
    return bounties
  } catch (e) { return [] }
}
