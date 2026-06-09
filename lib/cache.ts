import { Bounty, SkillVector, CacheEntry } from '../types'

const memoryCache = new Map<string, CacheEntry<any>>()

export const getMemoryCache = <T>(key: string, ttlMs: number): T | null => {
  const entry = memoryCache.get(key)
  if (!entry) return null
  if (Date.now() - entry.timestamp > ttlMs) {
    memoryCache.delete(key)
    return null
  }
  return entry.data as T
}

export const setMemoryCache = <T>(key: string, data: T): void => {
  memoryCache.set(key, { data, timestamp: Date.now() })
}

export const clearMemoryCache = (key: string): void => {
  memoryCache.delete(key)
}
