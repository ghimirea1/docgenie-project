'use client'
import SurveyComponent from "./SurveyComponent";
import "./styles.css";

const Survey = () => {
  return (
    <>
      <div id="float-parent" className="">
      <div id="surveyElement" className="">
        <SurveyComponent />
      </div>
      <div id="pdf-preview" className=""></div>
    </div>
    </>
  )
}
export default Survey