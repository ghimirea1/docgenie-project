'use client'
import { useState } from "react";
import { format } from "date-fns";
import EditButton from "@/components/case/EditButton";
import DeleteButton from "@/components/case/DeleteButton";
import WarrantList from "@/components/case/WarrantList";

const CasePreview = ({ caseData, jsonData, warrants }) => {
  const fieldOrder = ['Case Number', 'Officer Name', 'Officer Title', 'Agency', 'Case Type', 'Case Status', 'Case Description', 'State', 'County', 'Location']; // Define the desired order of fields
  const updatedAtDate = new Date(caseData.created_at);
  
  const [isWarrantsVisible, setWarrantsVisible] = useState(false);

  const toggleWarrantsVisibility = () => {
    setWarrantsVisible(!isWarrantsVisible);
  };

  return (
    <div className="note">
      <div className="note-header">
        <div className="note-menu" role="menubar">
          <small className="note-updated-at" role="status">
            Last updated on {format(updatedAtDate, "M/d/yy 'at' h:mm bb")}
          </small>
          <div>
            <button className="" onClick={toggleWarrantsVisibility}>
              {isWarrantsVisible ? 'Hide Warrants' : 'Show Warrants'}
            </button>
            <EditButton caseId={caseData.id}>Edit</EditButton>
            <DeleteButton id={caseData.id} />
          </div>
        </div>
          <h1 className="note-title">{jsonData.name}</h1>
      </div>
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
      {isWarrantsVisible && (
        <div className="note-editor-preview">
          <div className="label label--preview" role="status">
            Warrants
          </div>
          <WarrantList warrants={warrants} />
        </div>
      )}
    </div>
  );
};

export default CasePreview;
