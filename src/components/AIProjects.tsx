import { motion } from 'framer-motion'
import { Brain, Bot, Sparkles, Zap } from 'lucide-react'
import portfolioData from '../data/portfolio.json'
import { useTheme } from '../hooks/useTheme'

const AIProjects = () => {
  const theme = useTheme()
  
  const aiProjectsData = portfolioData.aiProjects

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
      <motion.h2 
        className={`text-2xl font-bold mb-2 pb-2 border-b flex items-center ${
          theme === 'dark'
            ? 'text-orange-400 border-orange-500/20'
            : 'text-orange-600 border-orange-200'
        }`}
      >
        <Sparkles className="w-6 h-6 mr-2" />
        🤖 {aiProjectsData.title}
      </motion.h2>

      <p className={`text-sm mb-6 italic ${
        theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
      }`}>
        Currently exploring and building cutting-edge AI agent systems
      </p>

      <div className="space-y-6">
        {aiProjectsData.sections.map((section: any, sectionIndex: number) => (
          <motion.div
            key={sectionIndex}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: sectionIndex * 0.2 }}
            className={`p-5 rounded-lg ${
              theme === 'dark'
                ? 'bg-[#161E2E] border border-orange-500/20'
                : 'bg-orange-50 border border-orange-200'
            }`}
          >
            <div className="flex items-start gap-4 mb-4">
              <div className={`p-3 rounded-lg bg-gradient-to-br ${
                sectionIndex === 0 ? 'from-violet-500 to-purple-600' : 'from-cyan-500 to-blue-600'
              } shadow-lg`}>
                {sectionIndex === 0 ? (
                  <Brain className="w-6 h-6 text-white" />
                ) : (
                  <Bot className="w-6 h-6 text-white" />
                )}
              </div>
              
              <div className="flex-1">
                <h3 className={`text-xl font-bold mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-slate-800'
                }`}>
                  {section.heading}
                </h3>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {section.techs.map((tech: string, techIndex: number) => (
                    <span
                      key={techIndex}
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        theme === 'dark'
                          ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                          : 'bg-orange-100 text-orange-700 border border-orange-200'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <ul className={`space-y-2 text-sm ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}>
              {section.details.map((detail: string, index: number) => (
                <li key={index} className="pl-4 border-l-2 border-orange-500/30">
                  {detail}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* AI Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className={`mt-6 p-4 rounded-lg border-2 border-dashed text-center ${
          theme === 'dark'
            ? 'border-orange-500/30 bg-orange-500/5'
            : 'border-orange-300 bg-orange-50'
        }`}
      >
        <div className="flex items-center justify-center gap-2">
          <Zap className={`w-5 h-5 ${
            theme === 'dark' ? 'text-orange-400' : 'text-orange-600'
          }`} />
          <span className={`text-sm font-medium ${
            theme === 'dark' ? 'text-orange-300' : 'text-orange-700'
          }`}>
            Actively building AI-powered solutions
          </span>
        </div>
      </motion.div>
    </motion.section>
  )
}

export default AIProjects
