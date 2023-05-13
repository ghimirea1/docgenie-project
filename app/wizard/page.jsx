'use client'
import SurveyComponent from "./SurveyComponent";
import "./styles.css";

const Survey = () => {
  return (
      <div id="float-parent" class="grid-container">
        <div id="surveyElement" class="grid-child purple">
          <SurveyComponent />
        </div>
        <div id="pdf-preview" class="grid-child green"></div>
    </div>
  )
}
export default Survey