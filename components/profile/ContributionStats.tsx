export function ContributionStats({ profile }: { profile: any }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-[#111] border border-[#333] p-4 rounded-xl text-center">
        <div className="text-2xl font-bold text-white mb-1">{profile.pr_count}</div>
        <div className="text-xs text-[#a1a1aa]">Merged PRs</div>
      </div>
      <div className="bg-[#111] border border-[#333] p-4 rounded-xl text-center">
        <div className="text-2xl font-bold text-white mb-1">{profile.level}</div>
        <div className="text-xs text-[#a1a1aa]">Level</div>
      </div>
    </div>
  )
}
