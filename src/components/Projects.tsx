import { motion, AnimatePresence } from 'framer-motion'
import { FolderGit2, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { useTheme } from '../hooks/useTheme'

interface ProjectsProps {
  projects: Array<{
    title: string
    techs: string[]
    period: string
    highlights: string[]
  }>
}

const Projects = ({ projects }: ProjectsProps) => {
  const theme = useTheme()
  const [expandedProject, setExpandedProject] = useState<number | null>(0)

  const techMap: Record<string, { icon: string; color: string; bg: string }> = {
    'Java': { icon: '☕', color: 'text-orange-500', bg: 'bg-orange-500/10' },
    'Kotlin': { icon: '🇰', color: 'text-purple-500', bg: 'bg-purple-500/10' },
    'Swift': { icon: '🐦', color: 'text-pink-500', bg: 'bg-pink-500/10' },
    'Bright Script': { icon: '📺', color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
    'HTML/CSS/JS': { icon: '🌐', color: 'text-blue-500', bg: 'bg-blue-500/10' },
    'Spring Boot': { icon: '🍃', color: 'text-green-600', bg: 'bg-green-600/10' },
    'Angular 11': { icon: '🅰️', color: 'text-red-600', bg: 'bg-red-600/10' },
    'Hibernate/JPA': { icon: '🐘', color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
    'MySQL': { icon: '🐬', color: 'text-sky-500', bg: 'bg-sky-500/10' },
    'Docker': { icon: '🐳', color: 'text-blue-400', bg: 'bg-blue-400/10' },
    'Jenkins': { icon: '⚙️', color: 'text-gray-500', bg: 'bg-gray-500/10' },
    'Apache Solr': { icon: '🔥', color: 'text-red-700', bg: 'bg-red-700/10' },
    'Selenium': { icon: '🧪', color: 'text-green-400', bg: 'bg-green-400/10' },
    'Snyk': { icon: '🔒', color: 'text-purple-500', bg: 'bg-purple-500/10' },
    'OMID Library': { icon: '👁️', color: 'text-violet-500', bg: 'bg-violet-500/10' },
    'Android/iOS': { icon: '📱', color: 'text-teal-500', bg: 'bg-teal-500/10' },
    'CTV': { icon: '🎬', color: 'text-orange-400', bg: 'bg-orange-400/10' },
  }

  const parseText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g)
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i}>{part.slice(2, -2)}</strong>
      }
      return part
    })
  }

  return (
    <>
      {projects.map((project: any, projectIndex: number) => (
        <motion.section
          key={projectIndex}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: projectIndex * 0.2 }}
          className={`rounded-xl shadow-2xl overflow-hidden ${
            theme === 'dark' ? 'bg-[#232F3E] border border-orange-500/20' : 'bg-white border border-orange-200'
          }`}
        >
          {/* Clickable Header */}
          <div
            onClick={() => setExpandedProject(expandedProject === projectIndex ? null : projectIndex)}
            className={`p-6 cursor-pointer transition-colors duration-200 ${
              expandedProject === projectIndex 
                ? theme === 'dark' ? 'bg-orange-500/5' : 'bg-orange-50' 
                : 'hover:bg-orange-500/5'
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <FolderGit2 className={`w-6 h-6 ${
                    theme === 'dark' ? 'text-orange-400' : 'text-orange-600'
                  }`} />
                  <h3 className={`text-xl font-bold ${
                    theme === 'dark' ? 'text-orange-400' : 'text-orange-600'
                  }`}>
                    {project.title}
                  </h3>
                </div>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-orange-400/80' : 'text-orange-600/80'
                }`}>
                  {project.period}
                </p>
              </div>

              <motion.div
                animate={{ rotate: expandedProject === projectIndex ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className={theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}
              >
                <ChevronDown className="w-6 h-6" />
              </motion.div>
            </div>

            {/* Tech Preview */}
            <div className="flex flex-wrap gap-2 mt-4">
              {project.techs.slice(0, 4).map((tech: string, techIndex: number) => {
                const techData = techMap[tech]
                return (
                  <span
                    key={techIndex}
                    className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                      techData ? `${techData.bg} ${techData.color}` : 'bg-gray-500/10 text-gray-400'
                    }`}
                  >
                    {techData?.icon && <span className="mr-1">{techData.icon}</span>}
                    {tech}
                  </span>
                )
              })}
              {project.techs.length > 4 && (
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  theme === 'dark' ? 'bg-orange-500/20 text-orange-300' : 'bg-orange-100 text-orange-700'
                }`}>
                  +{project.techs.length - 4} more
                </span>
              )}
            </div>
          </div>

          {/* Collapsible Content */}
          <AnimatePresence>
            {expandedProject === projectIndex && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className={`px-6 pb-6 border-t ${
                  theme === 'dark' ? 'border-orange-500/20' : 'border-orange-200'
                }`}>
                  {/* All Tech Tags */}
                  <div className="flex flex-wrap gap-2 mb-6 mt-6">
                    {project.techs.map((tech: string, techIndex: number) => {
                      const techData = techMap[tech]
                      return (
                        <span
                          key={techIndex}
                          className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full ${
                            techData ? `${techData.bg} ${techData.color}` : 'bg-gray-500/10 text-gray-400'
                          }`}
                        >
                          {techData?.icon && <span className="mr-2">{techData.icon}</span>}
                          {tech}
                        </span>
                      )
                    })}
                  </div>

                  {/* Details */}
                  <ul className={`space-y-3 text-base ${
                    theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    {project.highlights.map((highlight: string, index: number) => (
                      <li key={index} className="pl-4 border-l-2 border-orange-500">
                        {parseText(highlight)}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>
      ))}
    </>
  )
}

export default Projects
