'use client'
import "./styles.css"
// import FormComp from "@/components/Form";
// import { Template, BLANK_PDF } from '@pdfme/ui'; <- Template types and BLANK_PDF can also be imported from @pdfme/ui.
import dynamic from 'next/dynamic'

const Survey = () => {
  const FormComp = dynamic(
    () => import("@/components/Form"),
    { ssr: false }
  )
  return (
    <>
      <div id="container" className="">
        <FormComp />
      </div>
    </>
  )
}
export default Survey