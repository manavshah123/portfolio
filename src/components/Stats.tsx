import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Code2, GitBranch, Award, Rocket } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

interface StatCardProps {
  icon: React.ElementType
  value: number
  label: string
  suffix?: string
  delay: number
}

const StatCard = ({ icon: Icon, value, label, suffix = '', delay }: StatCardProps) => {
  const theme = useTheme()
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const end = value
    const duration = 2000
    const increment = end / (duration / 16)

    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [value])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05, y: -5 }}
      className={`relative p-6 rounded-xl overflow-hidden group ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700'
          : 'bg-gradient-to-br from-white to-slate-50 border border-slate-200'
      }`}
    >
      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        animate={{
          background: [
            'linear-gradient(45deg, rgba(59, 130, 246, 0.2), rgba(168, 85, 247, 0.2))',
            'linear-gradient(45deg, rgba(168, 85, 247, 0.2), rgba(236, 72, 153, 0.2))',
            'linear-gradient(45deg, rgba(236, 72, 153, 0.2), rgba(59, 130, 246, 0.2))',
          ],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      <div className="relative z-10">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          <Icon className={`w-8 h-8 mb-3 ${
            theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
          }`} />
        </motion.div>
        
        <motion.div
          className={`text-4xl font-bold mb-1 ${
            theme === 'dark' ? 'text-slate-50' : 'text-slate-800'
          }`}
        >
          {count}{suffix}
        </motion.div>
        
        <div className={`text-sm font-medium ${
          theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
        }`}>
          {label}
        </div>
      </div>

      {/* Glow effect */}
      <motion.div
        className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-0 group-hover:opacity-30 -z-10 transition-opacity duration-300"
      />
    </motion.div>
  )
}

interface StatsProps {
  statsData: Array<{
    icon: string
    value: number
    label: string
    suffix: string
  }>
}

const Stats = ({ statsData }: StatsProps) => {
  const theme = useTheme()

  const iconMap: Record<string, React.ElementType> = {
    Code2,
    GitBranch,
    Award,
    Rocket
  }
  
  const stats = statsData.map((stat: any) => ({
    ...stat,
    icon: iconMap[stat.icon as keyof typeof iconMap] || Code2 // Fallback to Code2
  }))

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`p-6 rounded-xl shadow-2xl relative overflow-hidden ${
        theme === 'dark' ? 'bg-slate-800' : 'bg-white'
      }`}
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
          style={{
            backgroundImage: 'radial-gradient(circle, #3B82F6 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="relative z-10">
        <h2 className={`text-2xl font-bold mb-6 pb-2 border-b ${
          theme === 'dark'
            ? 'text-blue-400 border-slate-700'
            : 'text-blue-700 border-slate-200'
        }`}>
          📊 Performance Metrics
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </motion.section>
  )
}

export default Stats

