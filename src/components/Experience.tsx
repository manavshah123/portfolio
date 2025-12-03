import { useTheme } from '../hooks/useTheme'

interface ExperienceProps {
  experiences: Array<{
    company: string
    position: string
    location: string
    period: string
    responsibilities: string[]
  }>
}

const Experience = ({ experiences }: ExperienceProps) => {
  const theme = useTheme()

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
    <div className={`p-6 rounded-xl shadow-2xl ${
      theme === 'dark' ? 'bg-[#232F3E] border border-orange-500/20' : 'bg-white border border-orange-200'
    }`}>
      <h2 className={`text-2xl font-bold mb-4 ${
        theme === 'dark' ? 'text-orange-400' : 'text-orange-600'
      }`}>
        💼 Professional Experience
      </h2>
      <div className="space-y-6">
        {experiences.map((exp: any, idx: number) => (
          <div key={idx} className="border-l-4 border-orange-500 pl-4">
            <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
              {exp.position} @ {exp.company}
            </h3>
            <p className={`text-sm mb-3 ${theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}`}>
              {exp.location} | {exp.period}
            </p>
            <ul className={`space-y-2 text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              {exp.responsibilities.map((item: string, index: number) => (
                <li key={index} className="pl-4 border-l-2 border-orange-500/30">
                  {parseText(item)}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Experience
