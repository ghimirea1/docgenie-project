import TextWithMarkdown from "./TextWithMarkdown";
import "@/app/globals.css";
// type CasePreviewProps = {
//   body: string;
// };

// const CasePreview = ({ body }: CasePreviewProps) => {
//   return (
//     <div className="note-preview">
//       <TextWithMarkdown text={body} />
//     </div>
//   );
// };

const CasePreview = ({ jsonData }) => {
  const fieldOrder = ['Case Number', 'Officer Name', 'Case Type', 'Case Status', 'Case Description', 'State', 'County', 'Location']; // Define the desired order of fields

  return (
    <div className="json-preview">
      {/* <h2>JSON Preview</h2> */}
      <div className="json-table">
        {fieldOrder.map((field) => {
          if (jsonData.hasOwnProperty(field) && jsonData[field] !== undefined) {
            let value = jsonData[field];
            if (Array.isArray(value)) {
              value = value.map((item, index) => (
                <span className="array-item" key={index}>
                  {item}
                </span>
              ));
            }
            return (
              <div className="json-row" key={field}>
                <div className="json-field">{field}</div>
                <div className="json-value">{value}</div>
              </div>
            );
          }
          return null; // Skip iteration for non-existing fields
        })}
      </div>
    </div>
  );
};

export default CasePreview;
