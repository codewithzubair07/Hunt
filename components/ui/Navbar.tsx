import Link from 'next/link'

export function Navbar() {
  return (
    <header className="border-b border-[#222] bg-[#0a0a0a] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl tracking-tight">Bounty<span className="text-[#7c3aed]">Match</span></Link>
        <nav className="flex gap-6 text-sm font-medium text-[#a1a1aa]">
          <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
          <Link href="/grants" className="hover:text-white transition-colors">Grants</Link>
          <Link href="/profile" className="hover:text-white transition-colors">Profile</Link>
        </nav>
        <div className="text-sm flex items-center gap-4">
          <Link href="/" className="text-[#71717a] hover:text-white">Change User</Link>
        </div>
      </div>
    </header>
  )
}
