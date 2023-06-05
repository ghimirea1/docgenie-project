import dynamic from 'next/dynamic'

const SurveyComponent = dynamic(() => import('@/components/survey/CaseCreationSurveyComponent'), { ssr: false });

const CaseCreatePage = () => {
  return (
    <SurveyComponent 
    id={null}
    data={null} />
  )
}

export default CaseCreatePage;