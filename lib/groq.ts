import { Bounty, SkillVector } from '../types'

export async function enhanceMatchesWithGroq(bounties: Bounty[], profile: SkillVector): Promise<Bounty[]> {
  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey) return bounties

  const enhanced = [...bounties]
  const batchSize = 15
  
  for (let i = 0; i < bounties.length; i += batchSize) {
    const batch = bounties.slice(i, i + batchSize)
    const payload = batch.map(b => ({
      id: b.id,
      title: b.title,
      description: b.description.substring(0, 100),
      languages: b.languages,
      ecosystem: b.ecosystem,
      difficulty: b.difficulty
    }))

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': "Bearer " + apiKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages: [
            {
              role: 'system',
              content: `You are a precise bounty matching engine. Given a developer's skill profile and a list of open source bounties, return ONLY a raw JSON array (no markdown, no explanation) in this exact format: [{"id": "...", "score": 85, "reason": "Strong Rust match, Solana ecosystem fits"}]. Score 0-100. Reason must be one sentence under 12 words.`
            },
            {
              role: 'user',
              content: `Profile: ${JSON.stringify({ languages: profile.languages, ecosystems: profile.ecosystems, level: profile.level })}\nBounties: ${JSON.stringify(payload)}`
            }
          ],
          temperature: 0.1
        })
      })

      if (!response.ok) continue

      const data = await response.json()
      const content = data.choices[0].message.content.trim()
      
      let parsed = []
      try {
        const jsonStr = content.replace(/^```json/, '').replace(/```$/, '')
        parsed = JSON.parse(jsonStr)
      } catch (e) {
        continue
      }

      for (const groqScore of parsed) {
        const index = enhanced.findIndex(b => b.id === groqScore.id)
        if (index !== -1) {
          const jsScore = enhanced[index].match_score || 0
          enhanced[index].match_score = Math.round((groqScore.score * 0.6) + (jsScore * 0.4))
          enhanced[index].match_reason = groqScore.reason
        }
      }
    } catch (e) {
      console.error('Groq enhancement failed for batch', e)
    }
  }

  return enhanced
}
