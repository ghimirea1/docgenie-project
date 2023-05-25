'use client'
import React, { useState, useEffect, startTransition, useRef } from "react";
import ReactDOM from "react-dom/client" 
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import $ from "jquery";
import * as SurveyCore from "survey-core";
import { jqueryuidatepicker } from "surveyjs-widgets";
import "jquery-ui-dist/jquery-ui.css";
import "survey-core/defaultV2.min.css";
import "./index.css";
import { json } from "./casejson2";
import CasePreview from "@/components/case/CasePreview";
import dynamic from 'next/dynamic'
import { useRouter } from "next/navigation";

window["$"] = window["jQuery"] = $;
require("jquery-ui-dist/jquery-ui.js");
jqueryuidatepicker(SurveyCore);

const DraftJsEditor = dynamic(
    () => import("@/components/editor/DraftEditor"),
    { ssr: false }
)
    
const QuillEditor = dynamic(
    () => import("@/components/editor/QuillEditor"),
    { ssr: false }
)

const fetchTemplates = async () => {
    try {
      const res = await fetch('/api/template', {
        method: 'GET',
        },
      );
      const data = await res.json();
      return data.data
    }
    catch (error) {
      console.log(error)
    }
  }

async function updateCase (id, data, router) {
  try {
      const res = await fetch('/api/case', {
        method: 'POST',
        body: JSON.stringify({
          id: id,
          data
        }),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      startTransition(() => {
        router.replace("/");
        router.refresh();
      });
    
    } catch (error)
    {
      console.log (error);
    }
}
  
async function saveCase (data, router) {
    try {
        const res = await fetch('/api/case', {
          method: 'PUT',
          body: JSON.stringify({
            data
          }),
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        });
  
        startTransition(() => {
          router.replace("/");
          router.refresh();
        });
        
      } catch (error)
      {
        console.log (error);
      }
}

async function SurveyComponent ({ id, data }) {
    const router = useRouter();
    const survey = new Model(json);

    if (data) {
        survey.data = data;
    }

    // const [title, setTitle] = useState(survey.data.name);
    // const [body, setBody] = useState(survey.data.description);

    // let isPreviewed = false;
    // function previewPdf () {
    //     const oldFrame = document.getElementById("pdf-preview-frame");
    //     if (oldFrame) oldFrame.parentNode.removeChild(oldFrame);
    //     const previewDiv = document.getElementById("pdf-preview");
    //     previewDiv.innerHTML = Template (survey, "Google");

    //     const data = Template (survey, "Google", templates);

    //     // const element = <DraftJsEditor initialContent={data} />;
    //     const element = <QuillEditor initialContent={data} />;
        
    //     const root = ReactDOM.createRoot(
    //         document.getElementById('pdf-preview')
    //     );
    //     root.render(element);
    //     isPreviewed = true;
    // }
    
    survey.navigationBar.getActionById("sv-nav-complete").visible = true;

    survey.addNavigationItem({
      id: "survey-generate-warrant", title: "Generate Warrant", action:()=>{}
    });
    // survey.addNavigationItem({
    //   id: "survey-complete", title: "Done", action: completeSurvey
    // });

    survey.onComplete.add((sender, options) => {
        console.log(JSON.stringify(sender.data, null, 3));
        
        if (data) {
          updateCase (id, sender.data, router);
        }
        else {
          saveCase (sender.data, router);
        }
    });
    survey.onCurrentPageChanged.add((sender, options) => {
        console.log(JSON.stringify(sender.data, null, 3));
    });
    survey.onValueChanged.add((sender, options) => {
        console.log (survey.data);
        // setTitle(survey.data.name);
        // setBody(survey.data.description);
    });

    return (
    <div className="note-editor">
      <div id="survey-element">
        <Survey model={survey} />
      </div>
      <div className="note-editor-preview">
        // TODO: Live preview
        <div className="label label--preview" role="status">
          Preview
        </div>
        <h1 className="note-title">{survey.data.name}</h1>
        <CasePreview body={survey.data.description} />
      </div>
    </div>
    );
}

export default SurveyComponent;