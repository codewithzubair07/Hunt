import { SkillVector } from '../types'

const headers: Record<string, string> = {}
if (process.env.GITHUB_TOKEN) {
  headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`
}

async function fetchWithTimeout(url: string, options: RequestInit = {}): Promise<Response> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 8000)
  try {
    const response = await fetch(url, { ...options, signal: controller.signal })
    clearTimeout(timeoutId)
    return response
  } catch (error) {
    clearTimeout(timeoutId)
    throw error
  }
}

export async function analyzeProfile(username: string): Promise<SkillVector> {
  const [userRes, reposRes, prsRes] = await Promise.all([
    fetchWithTimeout(`https://api.github.com/users/${username}`, { headers }),
    fetchWithTimeout(`https://api.github.com/users/${username}/repos?per_page=100`, { headers }),
    fetchWithTimeout(`https://api.github.com/search/issues?q=author:${username}+type:pr+is:merged+per_page=100`, { headers })
  ])

  if (!userRes.ok) throw new Error(`GitHub user ${username} not found`)
  
  const repos = await reposRes.ok ? await reposRes.json() : []
  const prs = await prsRes.ok ? await prsRes.json() : { total_count: 0 }

  const languages: Record<string, number> = {}
  let totalLanguageSize = 0
  const ecosystems: Set<string> = new Set()
  const topics: Set<string> = new Set()
  let totalStars = 0

  for (const repo of repos) {
    if (repo.stargazers_count) totalStars += repo.stargazers_count
    if (repo.language) {
      languages[repo.language] = (languages[repo.language] || 0) + repo.size
      totalLanguageSize += repo.size
    }
    repo.topics?.forEach((t: string) => {
      topics.add(t)
      const tl = t.toLowerCase()
      if (['soroban', 'stellar'].includes(tl)) ecosystems.add('Soroban')
      if (['solidity', 'evm', 'hardhat', 'foundry', 'truffle'].includes(tl)) ecosystems.add('EVM')
      if (['anchor', 'solana'].includes(tl)) ecosystems.add('Solana')
      if (['cosmos', 'cosmwasm'].includes(tl)) ecosystems.add('Cosmos')
      if (['substrate', 'polkadot', 'ink'].includes(tl)) ecosystems.add('Polkadot')
      if (['react', 'next.js', 'nextjs', 'vue', 'svelte'].includes(tl)) ecosystems.add('Frontend')
      if (['nestjs', 'express', 'fastify'].includes(tl)) ecosystems.add('Node Backend')
      if (['actix', 'axum', 'tokio'].includes(tl)) ecosystems.add('Rust Backend')
      if (['django', 'fastapi', 'flask'].includes(tl)) ecosystems.add('Python Backend')
    })
  }

  const normalizedLanguages: Record<string, number> = {}
  for (const [lang, size] of Object.entries(languages)) {
    normalizedLanguages[lang] = totalLanguageSize > 0 ? size / totalLanguageSize : 0
  }

  const pr_count = prs.total_count || 0
  let level: 'beginner' | 'intermediate' | 'advanced' = 'beginner'
  if (pr_count >= 50) level = 'advanced'
  else if (pr_count >= 10) level = 'intermediate'

  return {
    username,
    languages: normalizedLanguages,
    ecosystems: Array.from(ecosystems),
    pr_count,
    level,
    avg_repo_stars: repos.length ? totalStars / repos.length : 0,
    topics: Array.from(topics),
    contribution_score: Math.min(100, (pr_count * 2) + (totalStars > 100 ? 20 : totalStars * 0.2)),
    preferred_reward: 'any',
    preferred_difficulty: 'any'
  }
}
