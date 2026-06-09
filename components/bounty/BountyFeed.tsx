"use client"

import { Bounty } from '../../types'
import { BountyCard } from './BountyCard'

export function BountyFeed({ bounties }: { bounties: Bounty[] }) {
  // Safe import for Next.js app router
  let List: any = null;
  try {
    List = require('react-window').FixedSizeList;
  } catch(e) {}

  if (!List) {
    return (
      <div className="w-full max-w-3xl mx-auto space-y-4">
        {bounties.map(b => <BountyCard key={b.id} bounty={b} />)}
      </div>
    )
  }

  const Row = ({ index, style }: { index: number, style: any }) => (
    <BountyCard bounty={bounties[index]} style={style} />
  )

  return (
    <div className="w-full max-w-3xl mx-auto h-[800px]">
      <List
        height={800}
        itemCount={bounties.length}
        itemSize={280}
        width="100%"
      >
        {Row}
      </List>
    </div>
  )
}
