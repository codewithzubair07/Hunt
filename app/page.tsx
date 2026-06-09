'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LandingPage() {
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!username.trim()) return
    
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`/api/profile?username=${username}`)
      if (!res.ok) throw new Error('User not found')
      const profile = await res.json()
      localStorage.setItem('bm_skill_vector', JSON.stringify(profile))
      router.push('/dashboard')
    } catch (e: any) {
      setError(e.message || 'Failed to find user')
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
          Every bounty on the internet.<br/>Ranked for you.
        </h1>
        <p className="text-lg text-[#a1a1aa] mb-12">
          Enter your GitHub username to see opportunities matched to your skills.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center w-full max-w-md mx-auto relative">
          <input
            type="text"
            placeholder="GitHub username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="px-4 py-3 rounded-lg bg-[#111] border border-[#333] focus:outline-none focus:border-[#7c3aed] w-full"
            disabled={loading}
          />
          <button 
            type="submit" 
            disabled={loading}
            className="px-6 py-3 rounded-lg bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-medium transition-colors whitespace-nowrap"
          >
            {loading ? 'Analyzing...' : 'Find My Bounties →'}
          </button>
          {error && <div className="absolute -bottom-8 left-0 w-full text-center text-[#ef4444] text-sm">{error}</div>}
        </form>

        <div className="mt-20 pt-10 border-t border-[#222]">
          <p className="text-sm text-[#71717a] mb-6">INDEXING FROM</p>
          <div className="flex flex-wrap justify-center gap-6 text-[#a1a1aa] font-medium text-sm">
            <span>GitHub</span>
            <span>Gitcoin</span>
            <span>Algora</span>
            <span>Immunefi</span>
            <span>Code4rena</span>
          </div>
        </div>
      </div>
    </main>
  )
}
