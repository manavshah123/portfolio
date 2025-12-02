/**
 * Portfolio Data Service
 * 
 * Fetches portfolio data from Google Sheets API or falls back to local JSON
 * Caches data for 2 hours to reduce API calls
 */

import localData from '../data/portfolio.json'

const SHEETS_API_URL = import.meta.env.VITE_SHEETS_API_URL
const CACHE_KEY = 'portfolio_data_cache'
const CACHE_TIMESTAMP_KEY = 'portfolio_data_cache_timestamp'
const CACHE_DURATION = 2 * 60 * 60 * 1000 // 2 hours in milliseconds

export interface PortfolioData {
  personalInfo: {
    name: string
    title: string
    photo: string
    contacts: Array<{
      type: string
      value: string
      href: string
    }>
  }
  stats: Array<{
    icon: string
    value: number
    label: string
    suffix: string
  }>
  skillProgress: Array<{
    name: string
    level: number
    color: string
  }>
  education: Array<{
    degree: string
    institution: string
    location: string
    period: string
  }>
  experience: Array<{
    company: string
    position: string
    location: string
    period: string
    responsibilities: string[]
  }>
  achievements: Array<{
    icon: string
    title: string
    description: string
    color: string
  }>
  aiProjects: Array<{
    icon: string
    title: string
    gradient: string
    techs: string[]
    highlights: string[]
  }>
  projects: Array<{
    title: string
    techs: string[]
    period: string
    highlights: string[]
  }>
  technicalSkills: Array<{
    title: string
    icon: string
    skills: Array<{
      name: string
      level: number
      color: string
    }>
  }>
}

/**
 * Get cached data if available and not expired
 */
function getCachedData(): PortfolioData | null {
  try {
    const cachedData = localStorage.getItem(CACHE_KEY)
    const cachedTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY)

    if (cachedData && cachedTimestamp) {
      const timestamp = parseInt(cachedTimestamp, 10)
      const now = Date.now()
      const age = now - timestamp

      if (age < CACHE_DURATION) {
        const remainingMinutes = Math.floor((CACHE_DURATION - age) / 1000 / 60)
        console.log(`💾 Using cached data (expires in ${remainingMinutes} minutes)`)
        return JSON.parse(cachedData)
      } else {
        console.log('⏰ Cache expired, fetching fresh data...')
      }
    }
  } catch (error) {
    console.warn('Failed to read cache:', error)
  }

  return null
}

/**
 * Cache data in localStorage
 */
function setCachedData(data: PortfolioData): void {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data))
    localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString())
    console.log('💾 Data cached for 2 hours')
  } catch (error) {
    console.warn('Failed to cache data:', error)
  }
}

/**
 * Clear cached data (useful for forcing refresh)
 */
export function clearCache(): void {
  localStorage.removeItem(CACHE_KEY)
  localStorage.removeItem(CACHE_TIMESTAMP_KEY)
  console.log('🗑️ Cache cleared')
}

/**
 * Fetch portfolio data from Google Sheets or local JSON
 * Uses 2-hour cache to reduce API calls
 */
export async function fetchPortfolioData(): Promise<PortfolioData> {
  // Check cache first
  const cachedData = getCachedData()
  if (cachedData) {
    return cachedData
  }

  // If Google Sheets API URL is configured, use it
  if (SHEETS_API_URL) {
    try {
      console.log('🌐 Fetching fresh data from Google Sheets...')
      const response = await fetch(SHEETS_API_URL, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log('✅ Data loaded from Google Sheets')
      
      // Cache the data
      setCachedData(data)
      
      return data as PortfolioData
      
    } catch (error) {
      console.error('❌ Error fetching from Google Sheets:', error)
      console.log('⚠️ Falling back to local JSON data')
      return localData as PortfolioData
    }
  }

  // Fallback to local JSON
  console.log('📁 Using local JSON data (no Google Sheets URL configured)')
  return localData as PortfolioData
}

/**
 * Check if Google Sheets integration is configured
 */
export function isGoogleSheetsConfigured(): boolean {
  return !!SHEETS_API_URL
}

