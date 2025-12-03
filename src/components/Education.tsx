import { useTheme } from '../hooks/useTheme'

interface EducationProps {
  educationData: Array<{
    degree: string
    institution: string
    location: string
    period: string
  }>
}

const Education = ({ educationData }: EducationProps) => {
  const theme = useTheme()
  
  return (
    <div className={`p-6 rounded-xl shadow-2xl ${
      theme === 'dark' ? 'bg-[#232F3E] border border-orange-500/20' : 'bg-white border border-orange-200'
    }`}>
      <h2 className={`text-2xl font-bold mb-4 ${
        theme === 'dark' ? 'text-orange-400' : 'text-orange-600'
      }`}>
        🎓 Education
      </h2>
      <div className="space-y-4">
        {educationData.map((edu: any, index: number) => (
          <div key={index} className="border-l-4 border-orange-500 pl-4">
            <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
              {edu.degree}
            </h3>
            <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              {edu.institution}
            </p>
            <p className={`text-xs ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}`}>
              {edu.location} | {edu.period}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Education
