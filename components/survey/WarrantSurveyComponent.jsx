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
// import "./index.css";
import { json } from "./casejson2";
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

const SurveyComponent = ({ id, data, templates, setState }) => {
    // const templates = await fetchTemplates();    
    const router = useRouter();
    const survey = new Model(json);
    
    // Avoid rehydration conflict
    // https://nextjs.org/docs/messages/react-hydration-error
    const [hasMounted, setHasMounted] = useState(false);
    useEffect(() => {
      setHasMounted(true)
      setState(data);
    }, []);

    if (!hasMounted) {
      return null;
  }

    if (data) {
        survey.data = data;
    }

    survey.navigationBar.getActionById("sv-nav-complete").visible = true;
 
    survey.addNavigationItem({
        id: "survey_pdf_preview", title: "Preview PDF", action: () => {}
    });

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
      console.log(JSON.stringify(sender.data, null, 3));
      setState(sender.data);
    });

    return (
    <Survey model={survey} />
    );
}

function _App ({ id, data, templates }) {
  const [isComponentVisible, setComponentVisible] = useState(true);
  const [state, setState] = useState ("");
  const [value, setValue] = useState ("");

  const toggleComponentVisibility = () => {
    setComponentVisible(!isComponentVisible);
  };

  useEffect(() => {
    setValue(Template (state, "Google", templates));
  }, [state]);

  return (
    <div className="note-editor">
      <div className="survey-component">
        <SurveyComp
        id={id}
        data={data}
        templates={templates}
        setState={setState}
        />
      </div>
      {isComponentVisible && (
        <div className="component">
          <QuillComp
          initialContent={"data"}
          value={value}
          setValue={setValue}
          />
        </div>
      )}
      <button className="toggle-button" onClick={toggleComponentVisibility}>
        {isComponentVisible ? 'Hide Preview' : 'Show Preview'}
      </button>
    </div>
  );
}

const SurveyComp = React.memo (SurveyComponent);

function Quill ({initialContent, value, setValue})
{
  return (
    <QuillEditor
    initialContent={initialContent}
    value={value}
    setValue={setValue}
    />
  );
}
const QuillComp = React.memo (Quill);

export default _App;

function fetchTemplate(name, templates) {
    if (!templates) {
        return null;
    }

    for (let i = 0; i < templates.length; i++) {
        if (templates[i].name == name) {
            return templates[i];
        }
    }

    return null;
}

function Template (surveyData, name, templates) {
    const template = fetchTemplate (name, templates);
    
    if (!template) {
        return null;
    }

    let fields = template.fields;
    let str = template.html;

    for (const [key, value] of Object.entries(surveyData)) {
        if ("{" + key + "}" in fields) {
            fields["{" + key + "}"] = value;
        }
    }

    str = str.replace(/{[\w\s]+}/ig, function(all) {
        return fields[all] || all;
    });

    return str;
}
  