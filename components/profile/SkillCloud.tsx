export function SkillCloud({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, i) => (
        <span key={i} className="px-3 py-1 bg-[#222] border border-[#333] text-white rounded-full text-sm">
          {tag}
        </span>
      ))}
    </div>
  )
}
