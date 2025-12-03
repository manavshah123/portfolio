import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, Server, Database, Zap, ShieldCheck, Brain, ChevronDown, Wrench } from 'lucide-react'
import { useState } from 'react'
import portfolioData from '../data/portfolio.json'
import { useTheme } from '../hooks/useTheme'

// Map Tailwind gradient classes to actual colors
const getGradientColors = (colorClass: string): { from: string; to: string } => {
  const colorMap: Record<string, string> = {
    'orange-500': '#f97316',
    'orange-700': '#c2410c',
    'blue-400': '#60a5fa',
    'blue-500': '#3b82f6',
    'blue-600': '#2563eb',
    'blue-700': '#1d4ed8',
    'blue-800': '#1e40af',
    'purple-500': '#a855f7',
    'purple-600': '#9333ea',
    'purple-700': '#7e22ce',
    'red-400': '#f87171',
    'red-500': '#ef4444',
    'red-600': '#dc2626',
    'red-700': '#b91c1c',
    'red-900': '#7f1d1d',
    'pink-500': '#ec4899',
    'green-400': '#4ade80',
    'green-500': '#22c55e',
    'green-600': '#16a34a',
    'green-700': '#15803d',
    'green-800': '#166534',
    'lime-500': '#84cc16',
    'lime-700': '#4d7c0f',
    'yellow-500': '#eab308',
    'yellow-700': '#a16207',
    'gray-500': '#6b7280',
    'gray-700': '#374151',
    'indigo-500': '#6366f1',
    'indigo-700': '#4338ca',
    'cyan-500': '#06b6d4',
    'cyan-600': '#0891b2',
    'teal-500': '#14b8a6',
    'teal-700': '#0f766e',
    'sky-500': '#0ea5e9',
    'sky-700': '#0369a1',
    'orange-400': '#fb923c',
    'orange-600': '#ea580c',
    'fuchsia-500': '#d946ef',
    'fuchsia-700': '#a21caf',
  }

  const matches = colorClass.match(/from-(\S+)\s+to-(\S+)/)
  if (matches) {
    const fromColor = colorMap[matches[1]] || '#f97316'
    const toColor = colorMap[matches[2]] || '#c2410c'
    return { from: fromColor, to: toColor }
  }

  return { from: '#f97316', to: '#c2410c' }
}

const Skills = () => {
  const theme = useTheme()
  const [expandedGroup, setExpandedGroup] = useState<number | null>(null)
  
  const iconMap: Record<string, React.ElementType> = {
    Terminal,
    Server,
    Database,
    Zap,
    ShieldCheck,
    Brain,
    Tool: Wrench
  }
  
  const skillsData = portfolioData.technicalSkills.map((group: any) => ({
    ...group,
    icon: iconMap[group.icon]
  }))

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`rounded-xl shadow-2xl overflow-hidden ${
        theme === 'dark' ? 'bg-[#232F3E] border border-orange-500/20' : 'bg-white border border-orange-200'
      }`}
    >
      <div className="space-y-4">
        {skillsData.map((skillGroup: any, groupIndex: number) => (
          <div key={groupIndex}>
            {/* Collapsible Header */}
            <div
              onClick={() => setExpandedGroup(expandedGroup === groupIndex ? null : groupIndex)}
              className={`p-6 cursor-pointer transition-colors duration-200 ${
                expandedGroup === groupIndex 
                  ? theme === 'dark' ? 'bg-orange-500/5' : 'bg-orange-50' 
                  : 'hover:bg-orange-500/5'
              } ${groupIndex > 0 ? 'border-t ' + (theme === 'dark' ? 'border-orange-500/20' : 'border-orange-200') : ''}`}
            >
              <div className="flex justify-between items-center gap-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <skillGroup.icon className={`w-6 h-6 flex-shrink-0 ${
                    theme === 'dark' ? 'text-orange-400' : 'text-orange-600'
                  }`} />
                  <h3 className={`text-lg font-semibold truncate ${
                    theme === 'dark' ? 'text-white' : 'text-slate-800'
                  }`}>
                    {skillGroup.category}
                  </h3>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className={`text-xs font-medium px-3 py-1.5 rounded-lg whitespace-nowrap ${
                    theme === 'dark' ? 'bg-orange-500/20 text-orange-300' : 'bg-orange-100 text-orange-700'
                  }`}>
                    {skillGroup.skills.length} skills
                  </span>
                  
                  <motion.div
                    animate={{ rotate: expandedGroup === groupIndex ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex-shrink-0 ${theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Collapsible Content */}
            <AnimatePresence>
              {expandedGroup === groupIndex && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 space-y-4">
                    {skillGroup.skills.map((skill: any, skillIndex: number) => (
                      <motion.div
                        key={skillIndex}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: skillIndex * 0.05 }}
                      >
                        <div className="flex justify-between items-center mb-1.5">
                          <span className={`text-sm font-medium ${
                            theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                          }`}>
                            {skill.name}
                          </span>
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                            theme === 'dark' 
                              ? 'bg-orange-500/20 text-orange-400' 
                              : 'bg-orange-100 text-orange-700'
                          }`}>
                            {skill.level}%
                          </span>
                        </div>

                        <div className={`h-2 rounded-full overflow-hidden ${
                          theme === 'dark' ? 'bg-[#161E2E]' : 'bg-gray-200'
                        }`}>
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: skillIndex * 0.05, ease: 'easeOut' }}
                            className="h-full relative overflow-hidden shadow-lg"
                            style={{
                              background: `linear-gradient(to right, ${getGradientColors(skill.color).from}, ${getGradientColors(skill.color).to})`
                            }}
                          >
                            {/* Shimmer effect */}
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                              animate={{ x: ['-100%', '200%'] }}
                              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, ease: 'linear' }}
                            />
                          </motion.div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.section>
  )
}

export default Skills
