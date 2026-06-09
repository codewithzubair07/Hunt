import { Skeleton } from '../../components/ui/Skeleton'

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map(i => <Skeleton key={i} />)}
      </div>
    </div>
  )
}
