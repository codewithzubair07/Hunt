import { Bounty, SkillVector } from '../types'
import { enhanceMatchesWithGroq } from './groq'

export function scoreBounty(bounty: Bounty, profile: SkillVector): number {
  let score = 0

  // Language match (40 pts)
  const langOverlap = bounty.languages.filter(l => profile.languages[l] > 0.05)
  score += Math.min(40, langOverlap.length * 15 + (langOverlap[0] ? profile.languages[langOverlap[0]] * 25 : 0))

  // Ecosystem match (30 pts)
  const ecoOverlap = bounty.ecosystem.filter(e => profile.ecosystems.includes(e))
  score += Math.min(30, ecoOverlap.length * 15)

  // Topic/tag keyword overlap (15 pts)
  const topicOverlap = bounty.tags.filter(t => profile.topics.some(pt => pt.toLowerCase().includes(t.toLowerCase())))
  score += Math.min(15, topicOverlap.length * 5)

  // Difficulty fit (10 pts)
  if (
    bounty.difficulty === profile.level ||
    bounty.difficulty === 'unknown' ||
    profile.preferred_difficulty === 'any'
  ) {
    score += 10
  } else if (
    (profile.level === 'advanced' && bounty.difficulty === 'intermediate') ||
    (profile.level === 'intermediate' && bounty.difficulty === 'beginner')
  ) {
    score += 5 // partial credit for slightly easier bounties
  }

  // Reward range fit (5 pts)
  const r = bounty.reward_usd
  const pref = profile.preferred_reward
  if (pref === 'any' || r === null) score += 5
  else if (pref === 'small' && r <= 200) score += 5
  else if (pref === 'medium' && r > 200 && r <= 2000) score += 5
  else if (pref === 'large' && r > 2000) score += 5

  return Math.min(100, Math.round(score))
}

export function generateFallbackReason(bounty: Bounty, profile: SkillVector, score: number): string {
  const parts = []
  if (bounty.languages.length && profile.languages[bounty.languages[0]] > 0.1) {
    parts.push(`Strong ${bounty.languages[0]} match`)
  }
  if (bounty.ecosystem.some(e => profile.ecosystems.includes(e))) {
    parts.push(`${bounty.ecosystem[0]} ecosystem fits`)
  }
  if (bounty.reward_usd) {
    parts.push(`$${bounty.reward_usd} reward`)
  }
  if (parts.length === 0) return "Partial skill match"
  return parts.join(' • ')
}

export async function matchBounties(bounties: Bounty[], profile: SkillVector): Promise<Bounty[]> {
  let matched: Bounty[] = bounties.map(b => {
    const score = scoreBounty(b, profile)
    return {
      ...b,
      match_score: score,
      match_reason: generateFallbackReason(b, profile, score)
    }
  })

  if (process.env.GROQ_API_KEY) {
    matched = await enhanceMatchesWithGroq(matched, profile)
  }

  return matched.sort((a, b) => (b.match_score || 0) - (a.match_score || 0))
}
