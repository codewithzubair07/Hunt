import { Navbar } from "../../components/ui/Navbar"
import { EmptyState } from '../../components/ui/EmptyState'

export default function GrantsPage() {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-2">Grants & Funding Programs</h1>
        <p className="text-[#a1a1aa] mb-12">Longer-term funding for builders, researchers, and ecosystem contributors.</p>
        
        <div className="space-y-12">
          <section>
            <h2 className="text-xl font-semibold mb-6 border-b border-[#222] pb-2">Active Grant Rounds</h2>
            <EmptyState message="Connect Gitcoin adapter to see active rounds" />
          </section>
        </div>
      </div>
    </div>
  )
}
