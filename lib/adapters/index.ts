import { Bounty } from '../../types'
import { fetchGithubIssues } from './github-issues'
import { fetchGitcoinGrants } from './gitcoin'
import { fetchAlgora } from './algora'
import { fetchIssueHunt } from './issuehunt'
import { fetchImmunefi } from './immunefi'
import { fetchDorahacks } from './dorahacks'
import { fetchCode4rena } from './code4rena'
import { fetchSherlock } from './sherlock'
import { fetchSuperteam } from './superteam'
import { fetchQuestbook } from './questbook'
import { fetchLayer3 } from './layer3'
import { fetchLFX } from './lfx'

export async function fetchAllBounties(): Promise<Bounty[]> {
  const results = await Promise.allSettled([
    fetchGithubIssues(),
    fetchGitcoinGrants(),
    fetchAlgora(),
    fetchIssueHunt(),
    fetchImmunefi(),
    fetchDorahacks(),
    fetchCode4rena(),
    fetchSherlock(),
    fetchSuperteam(),
    fetchQuestbook(),
    fetchLayer3(),
    fetchLFX()
  ])

  const bounties: Bounty[] = []
  
  results.forEach(res => {
    if (res.status === 'fulfilled' && res.value) {
      bounties.push(...res.value)
    }
  })

  // Deduplicate by URL
  const unique = Array.from(new Map(bounties.map(b => [b.issue_url, b])).values())
  return unique
}
