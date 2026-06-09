export function FilterBar({ filters, setFilters }: { filters: any, setFilters: any }) {
  const platforms = ['All', 'GitHub', 'Gitcoin', 'Algora', 'Immunefi', 'Code4rena']
  
  return (
    <div className="bg-[#1a1a1a] border-b border-[#333] p-4 sticky top-0 z-10">
      <div className="flex flex-wrap gap-4 items-center max-w-7xl mx-auto">
        <div className="flex gap-2">
          {platforms.map(p => (
            <button 
              key={p} 
              onClick={() => setFilters({ ...filters, platform: p })}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${filters.platform === p ? 'bg-[#7c3aed] text-white' : 'bg-[#222] text-[#a1a1aa] hover:bg-[#333]'}`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
