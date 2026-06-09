export function EmptyState({ message = "No bounties found — try adjusting your filters" }: { message?: string }) {
  return (
    <div className="text-center py-20">
      <div className="text-[#71717a] text-lg">{message}</div>
    </div>
  )
}
