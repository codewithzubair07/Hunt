export function Skeleton() {
  return (
    <div className="bg-[#111] border border-[#333] rounded-xl p-5 animate-pulse">
      <div className="flex gap-2 mb-3">
        <div className="h-5 w-16 bg-[#222] rounded-full"></div>
        <div className="h-5 w-20 bg-[#222] rounded-full"></div>
      </div>
      <div className="h-5 w-3/4 bg-[#222] rounded mb-2"></div>
      <div className="h-4 w-full bg-[#222] rounded mb-4"></div>
      <div className="h-px w-full bg-[#222] my-4"></div>
      <div className="flex justify-between">
        <div className="h-4 w-24 bg-[#222] rounded"></div>
        <div className="h-8 w-20 bg-[#222] rounded"></div>
      </div>
    </div>
  )
}
