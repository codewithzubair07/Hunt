import { Bounty } from '../../types'

export async function fetchGitcoinGrants(): Promise<Bounty[]> {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 8000)
    
    const query = `
      query {
        rounds(filter: { isActive: { equalTo: true } }) {
          id
          name
          donationsEndTime
          projects {
            id
            title
            description
            website
          }
        }
      }
    `
    
    const res = await fetch('https://grants-stack-indexer-v2.gitcoin.co/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
      signal: controller.signal
    })
    
    clearTimeout(timeoutId)
    if (!res.ok) return []
    
    const data = await res.json()
    const rounds = data.data?.rounds || []
    
    const bounties: Bounty[] = []
    
    rounds.forEach((round: any) => {
      round.projects?.forEach((proj: any) => {
        bounties.push({
          id: `gitcoin:${proj.id}`,
          title: proj.title || 'Gitcoin Grant',
          description: proj.description || '',
          reward_usd: null,
          difficulty: 'unknown',
          languages: [],
          tags: ['grant', 'public-goods'],
          ecosystem: ['Web3'],
          source_platform: 'gitcoin',
          issue_url: proj.website || 'https://grants.gitcoin.co',
          deadline: round.donationsEndTime,
          created_at: new Date().toISOString()
        })
      })
    })
    
    return bounties
  } catch (e) {
    return []
  }
}
