export function LanguageBars({ langs }: { langs: Record<string, number> }) {
  const topLangs = Object.entries(langs)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  return (
    <div className="space-y-3">
      {topLangs.map(([lang, pct]) => (
        <div key={lang}>
          <div className="flex justify-between text-xs text-[#a1a1aa] mb-1">
            <span>{lang}</span>
            <span>{Math.round(pct * 100)}%</span>
          </div>
          <div className="h-2 w-full bg-[#222] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#7c3aed] transition-all duration-1000 ease-out" 
              style={{ width: `${pct * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
