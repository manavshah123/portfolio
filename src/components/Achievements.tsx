import { motion } from 'framer-motion'
import { Trophy, Target, Zap, Star, Shield, Sparkles, Brain, Bot } from 'lucide-react'
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
    'indigo-500': '#6366f1',
  }

  const matches = colorClass.match(/from-(\S+)\s+to-(\S+)/)
  if (matches) {
    const fromColor = colorMap[matches[1]] || '#f97316'
    const toColor = colorMap[matches[2]] || '#f97316'
    return { from: fromColor, to: toColor }
  }

  return { from: '#f97316', to: '#ea580c' }
}

interface AchievementsProps {
  achievementsData: Array<{
    icon: string
    title: string
    description: string
    color: string
  }>
}

const Achievements = ({ achievementsData }: AchievementsProps) => {
  const theme = useTheme()
  
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
  
  const achievements = achievementsData.map((achievement: any) => ({
    ...achievement,
    icon: iconMap[achievement.icon] || Star // Fallback to Star if icon not found
  }))

  return (
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
        {achievements.map((achievement: any, index: number) => {
          const gradientColors = getGradientColors(achievement.color)
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              className={`relative p-4 rounded-lg overflow-hidden group ${
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
  )
}

export default Achievements
