'use client'

import { Navbar } from "../../components/ui/Navbar"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { SkillVector } from '../../types'
import { SkillCloud } from '../../components/profile/SkillCloud'
import { LanguageBars } from '../../components/profile/LanguageBars'
import { ContributionStats } from '../../components/profile/ContributionStats'

export default function ProfilePage() {
  const router = useRouter()
  const [profile, setProfile] = useState<SkillVector | null>(null)

  useEffect(() => {
    const profStr = localStorage.getItem('bm_skill_vector')
    if (!profStr) router.push('/')
    else setProfile(JSON.parse(profStr))
  }, [router])

  if (!profile) return null

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8">Developer Profile</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-6">
            <div className="bg-[#111] border border-[#333] p-6 rounded-xl text-center">
              <div className="w-24 h-24 bg-[#222] rounded-full mx-auto mb-4 overflow-hidden">
                <img src={`https://github.com/${profile.username}.png`} alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <h2 className="text-xl font-bold">@{profile.username}</h2>
            </div>
            
            <ContributionStats profile={profile} />
          </div>
          
          <div className="md:col-span-2 space-y-8">
            <div className="bg-[#111] border border-[#333] p-6 rounded-xl">
              <h3 className="font-semibold mb-4 text-[#a1a1aa]">Detected Ecosystems</h3>
              <SkillCloud tags={profile.ecosystems} />
              {profile.ecosystems.length === 0 && <span className="text-sm text-[#71717a]">No specific ecosystems detected</span>}
            </div>

            <div className="bg-[#111] border border-[#333] p-6 rounded-xl">
              <h3 className="font-semibold mb-4 text-[#a1a1aa]">Top Languages</h3>
              <LanguageBars langs={profile.languages} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
