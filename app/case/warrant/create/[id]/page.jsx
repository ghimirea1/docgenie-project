import "@/app/globals.css"
import prisma from "@/lib/prisma"
import dynamic from 'next/dynamic'
const SurveyComponent = dynamic(() => import('@/components/survey/WarrantSurveyComponent'), { ssr: false });

const fetchSingleCase = async (id) => {
  const res = await prisma.case.findFirst({
    where: { id: parseInt (id) },
  });

  return res;
};

const CaseEditPage = async ({ params: { id } }) => {
  const { caseId = id, title, body, createdAt, data } = await fetchSingleCase(id);

  return (
    <div id="float-parent" className="grid-container">
      <div id="survey-element" className="grid-child">
        <SurveyComponent
        id={id}
        data={data}
        />
      </div>
      <div id="pdf-preview" className="grid-child">
      </div>
    </div>
  );
};

export default CaseEditPage;
  

// const SurveyComponent = dynamic(() => import('@/components/survey/WarrantSurveyComponent'), { ssr: false });

// export default async function Survey () { 
//   return (
//       <div id="float-parent" className="grid-container">
//           <div id="surveyElement" className="grid-child">
//             <SurveyComponent 
//             id={null}
//             data={null} />
//           </div>
//             <div id="pdf-preview" className="grid-child">
//         </div>
//       </div>
//   )
// }