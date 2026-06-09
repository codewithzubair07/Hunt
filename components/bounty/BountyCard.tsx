import { Bounty } from '../../types'
import { Badge } from '../ui/Badge'
import { MatchBar } from '../ui/MatchBar'
import { formatReward, timeAgo } from '../../lib/utils'

export function BountyCard({ bounty, style }: { bounty: Bounty, style?: any }) {
  const diffColor = bounty.difficulty === 'beginner' ? 'success' : bounty.difficulty === 'advanced' ? 'danger' : 'warning'
  
  return (
    <div style={style} className="p-2">
      <div className="bg-[#111] border border-[#333] hover:border-[#7c3aed] transition-colors rounded-xl p-5 h-full flex flex-col">
        <div className="flex justify-between items-start mb-3">
          <div className="flex gap-2">
            <Badge>{bounty.source_platform}</Badge>
            {bounty.difficulty !== 'unknown' && <Badge variant={diffColor}>{bounty.difficulty}</Badge>}
          </div>
          {bounty.deadline && <span className="text-xs text-[#71717a]">Due {timeAgo(bounty.deadline)}</span>}
        </div>
        
        <h3 className="text-[15px] font-semibold text-white mb-2 line-clamp-2 leading-tight">
          {bounty.title}
        </h3>
        
        <p className="text-[13px] text-[#a1a1aa] line-clamp-3 mb-4 flex-grow">
          {bounty.description}
        </p>

        {bounty.languages.length > 0 && (
          <>
            <div className="h-px bg-[#222] my-3 w-full" />
            <div className="flex gap-2 mb-3">
              {bounty.languages.slice(0, 3).map(l => (
                <span key={l} className="text-xs text-[#a1a1aa] bg-[#222] px-2 py-0.5 rounded">{l}</span>
              ))}
            </div>
          </>
        )}

        <div className="h-px bg-[#222] my-3 w-full" />

        <div className="flex justify-between items-center mt-auto">
          <div>
            <MatchBar score={bounty.match_score || 0} />
            <div className="text-[11px] text-[#71717a] mt-1">{bounty.match_reason}</div>
          </div>
          <div className="text-right flex flex-col items-end">
            <span className="text-sm font-bold text-white mb-1">{formatReward(bounty.reward_usd)}</span>
            <a 
              href={bounty.issue_url} 
              target="_blank" 
              rel="noreferrer"
              className="text-xs bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-3 py-1.5 rounded transition-colors"
            >
              View Issue ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
