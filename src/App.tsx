import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sun, Moon, Mail, Phone, Linkedin, Github, Loader2, RefreshCw } from 'lucide-react'
import Stats from './components/Stats'
import Skills from './components/Skills'
import Education from './components/Education'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Achievements from './components/Achievements'
import AIProjects from './components/AIProjects'
import SkillProgress from './components/SkillProgress'
import { fetchPortfolioData, PortfolioData, isGoogleSheetsConfigured, clearCache } from './services/portfolioService'

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const iconMap: Record<string, React.ElementType> = {
    email: Mail,
    phone: Phone,
    linkedin: Linkedin,
    github: Github
  }

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null
    if (storedTheme) {
      setTheme(storedTheme)
    }
  }, [])

  // Fetch portfolio data on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const data = await fetchPortfolioData()
        setPortfolioData(data)
        setError(null)
      } catch (err) {
        setError('Failed to load portfolio data. Please try again later.')
        console.error('Error loading portfolio data:', err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  const handleRefresh = async () => {
    clearCache()
    setLoading(true)
    try {
      const data = await fetchPortfolioData()
      setPortfolioData(data)
      setError(null)
    } catch (err) {
      setError('Failed to load portfolio data. Please try again later.')
      console.error('Error loading portfolio data:', err)
    } finally {
      setLoading(false)
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-[#161E2E]' : 'bg-white'}`}>
        <div className="text-center">
          <Loader2 className="w-16 h-16 animate-spin text-orange-500 mx-auto mb-4" />
          <p className={`text-lg ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
            {isGoogleSheetsConfigured() ? 'Loading data...' : 'Loading portfolio...'}
          </p>
        </div>
      </div>
    )
  }

  // Error state
  if (error || !portfolioData) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-[#161E2E]' : 'bg-white'}`}>
        <div className="text-center max-w-md mx-auto p-8">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            Failed to Load Data
          </h1>
          <p className={`mb-6 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
            {error || 'Unable to load portfolio data.'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#161E2E]' : 'bg-white'} transition-colors duration-300`}>
      <div className="p-4 md:p-10">
        {/* Header */}
        <header className={`max-w-7xl mx-auto mb-12 p-6 rounded-xl shadow-2xl ${
          theme === 'dark' ? 'bg-[#232F3E] border border-orange-500/20' : 'bg-white border border-orange-200'
        }`}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center">
              <div className="w-24 h-24 rounded-full mr-6 overflow-hidden flex items-center justify-center border-4 border-orange-500 shadow-lg">
                <img
                  src={portfolioData.personalInfo.photo}
                  alt={portfolioData.personalInfo.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://placehold.co/100x100/FF9900/FFFFFF?text=MS'
                  }}
                />
              </div>
              <div>
                <h1 className={`text-4xl md:text-5xl font-extrabold mb-1 ${
                  theme === 'dark' ? 'text-white' : 'text-slate-800'
                }`}>
                  {portfolioData.personalInfo.name}
                </h1>
                <p className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                  {portfolioData.personalInfo.title}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              {isGoogleSheetsConfigured() && (
                <button
                  onClick={handleRefresh}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-full border transition duration-300 ${
                    theme === 'dark'
                      ? 'border-orange-500/30 bg-[#232F3E] text-white hover:bg-orange-500/10'
                      : 'border-orange-300 bg-orange-50 text-slate-800 hover:bg-orange-100'
                  }`}
                  title="Refresh data from Google Sheets"
                >
                  <RefreshCw className="w-5 h-5 mr-2" />
                  Refresh
                </button>
              )}
              <button
                onClick={toggleTheme}
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-full border transition duration-300 ${
                  theme === 'dark'
                    ? 'border-orange-500/30 bg-[#232F3E] text-white hover:bg-orange-500/10'
                    : 'border-orange-300 bg-orange-50 text-slate-800 hover:bg-orange-100'
                }`}
              >
                {theme === 'dark' ? <Sun className="w-5 h-5 mr-2" /> : <Moon className="w-5 h-5 mr-2" />}
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </button>
            </div>
          </div>

          {/* Contact Links */}
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mt-6 pt-4 border-t ${
            theme === 'dark' ? 'border-orange-500/20' : 'border-orange-200'
          }`}>
            {portfolioData.personalInfo.contacts.map((contact: any, index: number) => {
              const Icon = iconMap[contact.type]
              return (
                <a
                  key={index}
                  href={contact.href}
                  target={contact.href.startsWith('http') ? '_blank' : undefined}
                  rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={`flex items-center p-3 rounded-lg transition duration-300 ${
                    theme === 'dark'
                      ? 'bg-[#161E2E] hover:bg-orange-500/10'
                      : 'bg-orange-50 hover:bg-orange-100'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-2 text-orange-500" />
                  <span className={`truncate ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                    {contact.value}
                  </span>
                </a>
              )
            })}
          </div>
        </header>

        {/* Stats Dashboard - Full Width */}
        <div className="max-w-7xl mx-auto mb-10">
          <Stats statsData={portfolioData.stats} />
        </div>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto">
          {/* Mobile: Single Column */}
          <div className="lg:hidden space-y-8">
            <Education educationData={portfolioData.education} />
            <Experience experiences={portfolioData.experience} />
            <SkillProgress skills={portfolioData.skillProgress} />
            <Achievements achievementsData={portfolioData.achievements} />
            <AIProjects aiProjectsData={portfolioData.aiProjects} />
            <div>
              <h2 className={`text-3xl font-bold mb-6 ${
                theme === 'dark' ? 'text-orange-400' : 'text-orange-600'
              }`}>
                💼 Key Projects
              </h2>
              <div className="space-y-6">
                <Projects projects={portfolioData.projects} />
              </div>
            </div>
            <div>
              <h2 className={`text-3xl font-bold mb-6 ${
                theme === 'dark' ? 'text-orange-400' : 'text-orange-600'
              }`}>
                🎯 Technical Proficiency
              </h2>
              <Skills technicalSkillsData={portfolioData.technicalSkills} />
            </div>
          </div>

          {/* Desktop: Sidebar Layout (30-70) */}
          <div className="hidden lg:grid lg:grid-cols-10 gap-10">
            {/* Left Sidebar - 30% (3 cols) - Quick Info */}
            <div className="lg:col-span-3 space-y-8">
              <Education educationData={portfolioData.education} />
              <SkillProgress skills={portfolioData.skillProgress} />
              
              {/* Technical Proficiency - Collapsible */}
              <div>
                <h2 className={`text-2xl font-bold mb-6 ${
                  theme === 'dark' ? 'text-orange-400' : 'text-orange-600'
                }`}>
                  🎯 Technical Proficiency
                </h2>
                <Skills technicalSkillsData={portfolioData.technicalSkills} />
              </div>
            </div>

            {/* Right Main Content - 70% (7 cols) - Detailed Info */}
            <div className="lg:col-span-7 space-y-8">
              {/* Experience - Full Width in Main Area */}
              <Experience experiences={portfolioData.experience} />
              
              {/* Achievements */}
              <Achievements achievementsData={portfolioData.achievements} />
              
              {/* AI Projects */}
              <AIProjects aiProjectsData={portfolioData.aiProjects} />
              
              {/* Projects Section with Collapsible */}
              <div>
                <h2 className={`text-3xl font-bold mb-6 ${
                  theme === 'dark' ? 'text-orange-400' : 'text-orange-600'
                }`}>
                  💼 Key Projects
                </h2>
                <div className="space-y-6">
                  <Projects projects={portfolioData.projects} />
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className={`text-center mt-16 p-6 border-t max-w-7xl mx-auto ${
          theme === 'dark'
            ? 'border-orange-500/20 bg-[#232F3E]/90'
            : 'border-orange-200 bg-white/90'
        }`}>
          <p className={`text-sm font-semibold ${
            theme === 'dark' ? 'text-white' : 'text-slate-800'
          }`}>
            Manav Shah | Software Engineer Portfolio | © {new Date().getFullYear()}
          </p>
          <p className={`text-xs mt-2 ${
            theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Made with ❤️ using React, TypeScript & Framer Motion
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App
