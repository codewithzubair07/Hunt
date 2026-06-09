export function StatCard({ label, value, prefix = '' }: { label: string, value: string | number, prefix?: string }) {
  return (
    <div className="bg-[#111] border border-[#333] rounded-xl p-4 flex flex-col justify-center">
      <span className="text-[#a1a1aa] text-sm mb-1">{label}</span>
      <span className="text-2xl font-bold text-white">{prefix}{value}</span>
    </div>
  )
}
