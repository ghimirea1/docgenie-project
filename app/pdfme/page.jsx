'use client'
import "./styles.css"
import FormComp from "./Form";
// import { Template, BLANK_PDF } from '@pdfme/ui'; <- Template types and BLANK_PDF can also be imported from @pdfme/ui.
const Survey = () => {
  return (
    <>
      <div id="container" className="">
        <FormComp />
      </div>
    </>
  )
}
export default Survey