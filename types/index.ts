export interface Bounty {
  id: string
  title: string
  description: string
  reward_usd: number | null
  reward_token?: string
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'unknown'
  languages: string[]
  tags: string[]
  ecosystem: string[]
  source_platform: string
  issue_url: string
  repo_url?: string
  org_name?: string
  deadline?: string
  created_at: string
  match_score?: number
  match_reason?: string
}

export interface SkillVector {
  username: string
  languages: Record<string, number>
  ecosystems: string[]
  pr_count: number
  level: 'beginner' | 'intermediate' | 'advanced'
  avg_repo_stars: number
  topics: string[]
  contribution_score: number
  preferred_reward: 'any' | 'small' | 'medium' | 'large'
  preferred_difficulty: 'beginner' | 'intermediate' | 'advanced' | 'any'
}

export interface CacheEntry<T> {
  data: T
  timestamp: number
}
