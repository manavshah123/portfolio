import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Target, Zap, Star, Shield, Sparkles, Brain, Bot, X, CheckCircle, Briefcase } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

// Map Tailwind gradient classes to actual colors
const getGradientColors = (colorClass: string): { from: string; to: string } => {
  const colorMap: Record<string, string> = {
    'yellow-500': '#eab308',
    'orange-500': '#f97316',
    'blue-500': '#3b82f6',
    'cyan-500': '#06b6d4',
    'purple-500': '#a855f7',
    'pink-500': '#ec4899',
    'green-500': '#22c55e',
    'emerald-500': '#10b981',
    'red-500': '#ef4444',
    'rose-500': '#f43f5e',
    'indigo-500': '#6366f1',
    'teal-500': '#14b8a6',
    'violet-500': '#8b5cf6',
    'fuchsia-500': '#d946ef',
  }

  const matches = colorClass.match(/from-(\S+)\s+to-(\S+)/)
  if (matches) {
    const fromColor = colorMap[matches[1]] || '#f97316'
    const toColor = colorMap[matches[2]] || '#f97316'
    return { from: fromColor, to: toColor }
  }

  return { from: '#f97316', to: '#ea580c' }
}

interface AchievementData {
  icon: string
  title: string
  description: string
  color: string
  details?: string[]
  highlights?: string[]
  relatedProjects?: string
}

interface AchievementWithIcon {
  icon: React.ElementType
  title: string
  description: string
  color: string
  details?: string[]
  highlights?: string[]
  relatedProjects?: string
}

interface AchievementsProps {
  achievementsData: AchievementData[]
}

const Achievements = ({ achievementsData }: AchievementsProps) => {
  const theme = useTheme()
  const [selectedAchievement, setSelectedAchievement] = useState<AchievementWithIcon | null>(null)
  
  const iconMap: Record<string, React.ElementType> = {
    Trophy,
    Target,
    Zap,
    Star,
    Shield,
    Sparkles,
    Brain,
    Bot
  }
  
  const achievements: AchievementWithIcon[] = achievementsData.map((achievement) => ({
    ...achievement,
    icon: iconMap[achievement.icon] || Star
  }))

  const handleCardClick = (achievement: AchievementWithIcon) => {
    setSelectedAchievement(achievement)
  }

  const closeModal = () => {
    setSelectedAchievement(null)
  }

  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={`p-6 rounded-xl shadow-2xl ${
          theme === 'dark' ? 'bg-[#232F3E] border border-orange-500/20' : 'bg-white border border-orange-200'
        }`}
      >
        <h2 className={`text-2xl font-bold mb-6 pb-2 border-b ${
          theme === 'dark'
            ? 'text-orange-400 border-orange-500/20'
            : 'text-orange-600 border-orange-200'
        }`}>
          🏆 Key Achievements
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map((achievement, index: number) => {
            const gradientColors = getGradientColors(achievement.color)
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                onClick={() => handleCardClick(achievement)}
                className={`relative p-4 rounded-lg overflow-hidden group cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-gradient-to-br from-[#161E2E] to-[#232F3E] border border-orange-500/20'
                    : 'bg-gradient-to-br from-orange-50 to-white border border-orange-200'
                }`}
                style={{ perspective: '1000px' }}
              >
                {/* Animated background */}
                <motion.div
                  className="absolute inset-0 opacity-10"
                  style={{
                    background: `linear-gradient(to bottom right, ${gradientColors.from}, ${gradientColors.to})`
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                />

                <div className="relative z-10">
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      repeatType: 'reverse',
                    }}
                    className="mb-3"
                  >
                    <div 
                      className="w-12 h-12 rounded-full p-2.5 shadow-lg"
                      style={{
                        background: `linear-gradient(to bottom right, ${gradientColors.from}, ${gradientColors.to})`
                      }}
                    >
                      <achievement.icon className="w-full h-full text-white" />
                    </div>
                  </motion.div>

                  <h3 className={`text-lg font-bold mb-1 ${
                    theme === 'dark' ? 'text-white' : 'text-slate-800'
                  }`}>
                    {achievement.title}
                  </h3>
                  
                  <p className={`text-sm ${
                    theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    {achievement.description}
                  </p>

                  {/* Click indicator */}
                  <div className={`mt-3 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity ${
                    theme === 'dark' ? 'text-orange-400' : 'text-orange-600'
                  }`}>
                    Click for details →
                  </div>
                </div>

                {/* Glow effect on hover */}
                <motion.div
                  className="absolute -inset-0.5 rounded-lg blur opacity-0 group-hover:opacity-50 -z-10 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(to right, ${gradientColors.from}, ${gradientColors.to})`
                  }}
                />
              </motion.div>
            )
          })}
        </div>
      </motion.section>

      {/* Modal Popup */}
      <AnimatePresence>
        {selectedAchievement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden ${
                theme === 'dark' ? 'bg-[#1a2332]' : 'bg-white'
              }`}
            >
              {/* Header with gradient */}
              {(() => {
                const gradientColors = getGradientColors(selectedAchievement.color)
                return (
                  <>
                    <div 
                      className="relative p-6 pb-12"
                      style={{
                        background: `linear-gradient(135deg, ${gradientColors.from}, ${gradientColors.to})`
                      }}
                    >
                      {/* Close button */}
                      <button
                        onClick={closeModal}
                        className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                      >
                        <X className="w-5 h-5 text-white" />
                      </button>

                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-white/20 p-3 shadow-lg">
                          <selectedAchievement.icon className="w-full h-full text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white">
                            {selectedAchievement.title}
                          </h3>
                          <p className="text-white/80 text-sm mt-1">
                            {selectedAchievement.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 -mt-6">
                      <div className={`rounded-xl p-4 ${
                        theme === 'dark' ? 'bg-[#232F3E]' : 'bg-gray-50'
                      }`}>
                        {/* Details Section */}
                        {selectedAchievement.details && selectedAchievement.details.length > 0 && (
                          <div className="mb-4">
                            <h4 className={`text-sm font-semibold mb-3 flex items-center gap-2 ${
                              theme === 'dark' ? 'text-orange-400' : 'text-orange-600'
                            }`}>
                              <CheckCircle className="w-4 h-4" />
                              Key Contributions
                            </h4>
                            <ul className="space-y-2">
                              {selectedAchievement.details.map((detail, idx) => (
                                <li 
                                  key={idx}
                                  className={`text-sm pl-4 border-l-2 ${
                                    theme === 'dark' 
                                      ? 'text-slate-300 border-orange-500/50' 
                                      : 'text-slate-600 border-orange-300'
                                  }`}
                                >
                                  {detail}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Highlights Section */}
                        {selectedAchievement.highlights && selectedAchievement.highlights.length > 0 && (
                          <div className="mb-4">
                            <h4 className={`text-sm font-semibold mb-3 flex items-center gap-2 ${
                              theme === 'dark' ? 'text-orange-400' : 'text-orange-600'
                            }`}>
                              <Sparkles className="w-4 h-4" />
                              Highlights
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {selectedAchievement.highlights.map((highlight, idx) => (
                                <span 
                                  key={idx}
                                  className={`text-xs px-3 py-1.5 rounded-full ${
                                    theme === 'dark' 
                                      ? 'bg-orange-500/20 text-orange-300' 
                                      : 'bg-orange-100 text-orange-700'
                                  }`}
                                >
                                  {highlight}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Related Projects Section */}
                        {selectedAchievement.relatedProjects && (
                          <div>
                            <h4 className={`text-sm font-semibold mb-2 flex items-center gap-2 ${
                              theme === 'dark' ? 'text-orange-400' : 'text-orange-600'
                            }`}>
                              <Briefcase className="w-4 h-4" />
                              Related Projects
                            </h4>
                            <p className={`text-sm ${
                              theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                            }`}>
                              {selectedAchievement.relatedProjects}
                            </p>
                          </div>
                        )}

                        {/* Fallback if no details */}
                        {(!selectedAchievement.details || selectedAchievement.details.length === 0) && 
                         (!selectedAchievement.highlights || selectedAchievement.highlights.length === 0) && 
                         !selectedAchievement.relatedProjects && (
                          <p className={`text-sm text-center py-4 ${
                            theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                          }`}>
                            More details coming soon...
                          </p>
                        )}
                      </div>
                    </div>
                  </>
                )
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Achievements
