import { Bounty } from '../../types'

export async function fetchGithubIssues(): Promise<Bounty[]> {
  const queries = [
    'label:bounty+state:open',
    'label:"good+first+issue"+state:open',
    'label:"help+wanted"+state:open',
    'label:hacktoberfest+state:open',
    'label:"up+for+grabs"+state:open',
    'label:"$bounty"+state:open'
  ]

  const headers: Record<string, string> = {
    'Accept': 'application/vnd.github.v3+json'
  }
  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`
  }

  const fetchQuery = async (query: string) => {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 8000)
      const res = await fetch(`https://api.github.com/search/issues?q=${query}&per_page=100`, { 
        headers, 
        signal: controller.signal 
      })
      clearTimeout(timeoutId)
      if (!res.ok) return []
      const data = await res.json()
      return data.items || []
    } catch (e) {
      return []
    }
  }

  const results = await Promise.all(queries.map(fetchQuery))
  const allIssues = results.flat()

  const uniqueIssues = Array.from(new Map(allIssues.map((item: any) => [item.html_url, item])).values())

  return (uniqueIssues as any[]).map(issue => {
    const title = issue.title || ''
    const body = issue.body || ''
    
    // Parse reward from title like "$500" or body
    let reward = null
    const match = title.match(/\$(\d+)/)
    if (match) reward = parseInt(match[1], 10)

    const labels = issue.labels?.map((l: any) => l.name.toLowerCase()) || []
    
    let difficulty: 'beginner' | 'intermediate' | 'advanced' | 'unknown' = 'unknown'
    if (labels.some((l: string) => l.includes('good first issue') || l.includes('beginner'))) difficulty = 'beginner'
    else if (labels.some((l: string) => l.includes('advanced') || l.includes('hard'))) difficulty = 'advanced'
    else difficulty = 'intermediate'

    return {
      id: `github:${issue.id}`,
      title: issue.title,
      description: issue.body?.substring(0, 300) || '',
      reward_usd: reward,
      difficulty,
      languages: [], // In a real app we might fetch repo languages
      tags: labels,
      ecosystem: [],
      source_platform: 'github',
      issue_url: issue.html_url,
      repo_url: issue.repository_url?.replace('api.github.com/repos', 'github.com'),
      created_at: issue.created_at
    }
  })
}
