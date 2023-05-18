'use client'
// import SurveyComponent from "@/components/survey/SurveyComponent";
import "./styles.css";
import dynamic from 'next/dynamic'

const SurveyComponent = dynamic(() => import('@/components/survey/SurveyComponent'), { ssr: false });

const Survey = () => {
  return (
      <div id="float-parent" className="grid-container">
        <div id="surveyElement" className="grid-child purple">
          <SurveyComponent />
        </div>
        <div id="pdf-preview" className="grid-child green"></div>
    </div>
  )
}
export default Survey