import prisma from "@/lib/prisma"
import CaseEditor from "@/components/case/CaseEditor";

import dynamic from 'next/dynamic'
const SurveyComponent = dynamic(() => import('@/components/survey/CaseCreationSurveyComponent'), { ssr: false });

const fetchSingleCase = async (id) => {
  const res = await prisma.case.findFirst({
    where: { id: parseInt (id) },
  });

  return res;
};

const CaseEditPage = async ({ params: { id } }) => {
    const { caseId = id, title, body, createdAt, data } = await fetchSingleCase(id);

    return (
      // <CaseEditor caseId={caseId} initialBody={body} initialTitle={title} createdAt={createdAt} />
      <SurveyComponent
      id={id}
      data={data}
      />
    );
  };
  
  export default CaseEditPage;
  