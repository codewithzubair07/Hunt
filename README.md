# BountyMatch

A production-grade, AI-powered open source bounty aggregator with intelligent GitHub-based skill matching.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. (Optional) Configure environment variables:
   ```bash
   cp .env.example .env.local
   # Add your GROQ_API_KEY for AI matching and GITHUB_TOKEN for higher rate limits
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000)

## Features
- Fetches from 12+ data sources simultaneously
- AI-powered matching using Llama 3.1
- Zero-config auth (GitHub username only)
- In-memory caching with graceful fallbacks
