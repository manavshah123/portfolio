import { motion } from 'framer-motion'
import { useTheme } from '../hooks/useTheme'

interface Skill {
  name: string
  level: number
  color: string
}

interface SkillProgressProps {
  skills: Skill[]
}

// Map Tailwind gradient classes to actual colors
const getGradientColors = (colorClass: string): { from: string; to: string } => {
  const colorMap: Record<string, string> = {
    'orange-500': '#f97316',
    'orange-700': '#c2410c',
    'blue-500': '#3b82f6',
    'blue-600': '#2563eb',
    'blue-700': '#1d4ed8',
    'purple-500': '#a855f7',
    'purple-600': '#9333ea',
    'purple-700': '#7e22ce',
    'red-500': '#ef4444',
    'red-700': '#b91c1c',
    'green-500': '#22c55e',
    'green-700': '#15803d',
    'yellow-500': '#eab308',
    'amber-600': '#d97706',
    'violet-500': '#8b5cf6',
    'emerald-500': '#10b981',
    'teal-600': '#0d9488',
    'cyan-500': '#06b6d4',
    'pink-500': '#ec4899',
    'rose-600': '#e11d48',
    'indigo-500': '#6366f1',
    'indigo-700': '#4338ca',
    'violet-600': '#7c3aed',
    'lime-500': '#84cc16',
    'lime-700': '#4d7c0f',
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

const SkillProgress = ({ skills }: SkillProgressProps) => {
  const theme = useTheme()

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
        💪 Skill Proficiency
      </h2>

      <div className="space-y-6">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="flex justify-between items-center mb-2">
              <span className={`text-sm font-semibold ${
                theme === 'dark' ? 'text-slate-200' : 'text-slate-700'
              }`}>
                {skill.name}
              </span>
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.5 }}
                className={`text-sm font-bold ${
                  theme === 'dark' ? 'text-orange-400' : 'text-orange-600'
                }`}
              >
                {skill.level}%
              </motion.span>
            </div>

            <div className={`h-3 rounded-full overflow-hidden ${
              theme === 'dark' ? 'bg-[#161E2E]' : 'bg-gray-200'
            }`}>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: index * 0.1, ease: 'easeOut' }}
                className="h-full relative overflow-hidden shadow-lg"
                style={{
                  background: `linear-gradient(to right, ${getGradientColors(skill.color).from}, ${getGradientColors(skill.color).to})`
                }}
              >
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{
                    x: ['-100%', '200%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1,
                    ease: 'linear',
                  }}
                />
                
                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

export default SkillProgress
