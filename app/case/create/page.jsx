'use client'
import "../../globals.css"
import dynamic from 'next/dynamic'

const SurveyComponent = dynamic(() => import('@/components/survey/CaseCreationSurveyComponent'), { ssr: false });

export default async function Survey () { 
  return (
    <SurveyComponent 
    data={null} />
  )
}