import prisma from "@/lib/prisma";
// import supabase from "@/lib/supabaseClient"

async function createCase() {
  try {
    const newCase = await prisma.case.create({
      data: {
          id: 1,
          userId: null,
          caseAgentName: "Tom",
          county: null,
          causeNumber: null,
          Superior: null,
          Circuit: null,
          districtCourt: null,
          officerName: null,
          agencyName: null,
          beginDate: null,
          title: null,
          unit: null,
          district: null,
          academyName: null,
          academyDate: null,
          pertinentTraining: null,
          searchPeriodFrom: null,
          searchPeriodTo: null
      },
    });  
    
    console.log (newCase);
    return newCase;
  } catch (error)
  {
    console.log (error);
  }

  return null;
}

async function updateCase() {
  try {
    const updatedCase = await prisma.case.update({
      data: {
          // id: 3,
          userId: null,
          caseAgentName: "Tom",
          county: null,
          causeNumber: null,
          Superior: null,
          Circuit: null,
          districtCourt: null,
          officerName: null,
          agencyName: null,
          beginDate: null,
          title: null,
          unit: null,
          district: null,
          academyName: null,
          academyDate: null,
          pertinentTraining: null,
          searchPeriodFrom: null,
          searchPeriodTo: null
      },
      where: {
        id: 1,
      },
    });  
    console.log (updatedCase);
    return updatedCase;
  } catch (error)
  {
    console.log (error);
  }

  return null;
}

async function getCases() {
  try {
    const gotCase = await prisma.case.findMany({});  
    console.log (gotCase);
    return gotCase;

  } catch (error)
  {
    console.log (error);
  }

  return null;
}

export default async function Page () {
  // const cases = await createCase();
  // const cases = await updateCase();
  const cases = await getCases();

  return (
      <div style = { { zIndex: 1 } }>
        <table class="table table-striped">
          <thead>
              <tr>
              <th>ID</th>
              <th>UserID</th>
              <th>Case Agent Name</th>
              <th>County</th>
              <th>Cause Number</th>
              <th>Superior</th>
              <th>Circuit</th>
              <th>District Court</th>
              <th>Officer Name</th>
              <th>Agency Name</th>
              <th>Begin Date</th>
              <th>Officer Name</th>
              <th>Unit</th>
              <th>District</th>
              <th>Academy Name</th>
              <th>Pertinent Training</th>
              <th>Search Period From</th>
              <th>Search Period To</th>
              </tr>
          </thead>
          <tbody>
          {cases.map((cases) => (
            <tr key={cases.id}>
              <td>{cases.id}</td>
              <td>{cases.userId}</td>
              <td>{cases.caseAgentName}</td>
              <td>{cases.county}</td>
              <td>{cases.causeNumber}</td>
              <td>{cases.Superior}</td>
              <td>{cases.Circuit}</td>
              <td>{cases.districtCourt}</td>
              <td>{cases.officerName}</td>
              <td>{cases.agencyName}</td>
              <td>{cases.beginDate}</td>
              <td>{cases.title}</td>
              <td>{cases.unit}</td>
              <td>{cases.district}</td>
              <td>{cases.academyName}</td>
              <td>{cases.academyDate}</td>
              <td>{cases.pertinentTraining}</td>
              <td>{cases.searchPeriodFrom}</td>
              <td>{cases.searchPeriodTo}</td>
              </tr>
          ))}
            </tbody>
            </table>
      </div>
  );
}