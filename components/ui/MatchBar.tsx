"use client"

import { useEffect, useState } from 'react'

export function MatchBar({ score }: { score: number }) {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setWidth(score), 50)
    return () => clearTimeout(timer)
  }, [score])

  const color = score >= 70 ? 'bg-[#22c55e]' : score >= 40 ? 'bg-[#f59e0b]' : 'bg-[#ef4444]'

  return (
    <div className="flex items-center gap-2">
      <div className="h-2 w-24 bg-[#222] rounded-full overflow-hidden">
        <div 
          className={`h-full ${color} transition-all duration-600 ease-out`} 
          style={{ width: `${width}%` }}
        />
      </div>
      <span className="text-xs text-[#a1a1aa] font-medium">{score}%</span>
    </div>
  )
}
