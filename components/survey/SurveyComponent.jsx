'use client'
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client" 
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import $ from "jquery";
import * as SurveyCore from "survey-core";
import { jqueryuidatepicker } from "surveyjs-widgets";
import "jquery-ui-dist/jquery-ui.css";
import "survey-core/defaultV2.min.css";
import "./index.css";
import { json } from "./casejson";
// import { modifyPDF } from "@/components/PDFViewer.js"

import dynamic from 'next/dynamic'

const DraftJsEditor = dynamic(
    () => import("@/components/editor/DraftEditor"),
    { ssr: false }
)
    
const QuillEditor = dynamic(
    () => import("@/components/editor/QuillEditor"),
    { ssr: false }
)

window["$"] = window["jQuery"] = $;
require("jquery-ui-dist/jquery-ui.js");
jqueryuidatepicker(SurveyCore);


async function SurveyPdfComponent() {
    const survey = new Model(json);

    function previewPdf() {
        const oldFrame = document.getElementById("pdf-preview-frame");
        if (oldFrame) oldFrame.parentNode.removeChild(oldFrame);
        const previewDiv = document.getElementById("pdf-preview");
        previewDiv.innerHTML = T(survey);
        const root = ReactDOM.createRoot(
            document.getElementById('pdf-preview')
        );

        const data = T(survey);

        // const element = <DraftJsEditor initialContent={data} />;
        const element = <QuillEditor initialContent={data} />;
        root.render(element);
    }
    survey.navigationBar.getActionById("sv-nav-complete").visible = false;
    
    // survey.addNavigationItem({
    //     id: "survey_save_as_file", title: "Save as PDF", action: saveSurveyToFile
    // });
    // survey.addNavigationItem({
    //     id: "survey_save_via_blob", title: "Save via Blob", action: savePdfViaBlob
    // });
    
    survey.addNavigationItem({
        id: "survey_pdf_preview", title: "Preview PDF", action: previewPdf
    });

    survey.onComplete.add((sender, options) => {
        console.log(JSON.stringify(sender.data, null, 3));
    });
    survey.onCurrentPageChanged.add((sender, options) => {
        console.log(JSON.stringify(sender.data, null, 3));
    });
    survey.onValueChanged.add((sender, options) => {
        console.log (survey.data);
        previewPdf();
    });

    return (<Survey model={survey} />);
}

export default SurveyPdfComponent;

// function Table( STATE="", COUNTY="", SUPERIOR="", CIRCUIT="", DISTRICT="", CAUSE_NUMBER="", CASE_AGENT_NAME="", OFFICER_NAME="", AGENCY_NAME="") {
function T(survey) {    
    let FIELDS = new Map([["[[STATE]]", "[[STATE]]"], ["[[COUNTY]]", "[[COUNTY]]"], ["[[SUPERIOR]]", "[[SUPERIOR]]"],
                            ["[[CIRCUIT]]", "[[CIRCUIT]]"], ["[[DISTRICT]]", "[[DISTRICT]]"], ["[[CAUSE_NUMBER]]", "[[CASE_NUMBER]]"], 
                            ["[[CASE_AGENT_NAME]]", "[[CASE_AGENT_NAME]]"], ["[[OFFICER_NAME]]", "[[OFFICER_NAME]]"], ["[[AGENCY_NAME]]", "[[AGENCY_NAME]]"]]);
    for (const [key, value] of Object.entries(survey.data)) {
        if (FIELDS.get (key))
        {
            FIELDS.set (key, value)
        }
    }

    return (
        `
<p>STATE OF ${FIELDS.get("[[STATE]]")}<span style="white-space:pre;">&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;${FIELDS.get("[[COUNTY]]")} ${FIELDS.get("[[DISTRICT]]")} COURT</p>
<p><span style="white-space:pre;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span>)</p>
<p>COUNTY OF ${FIELDS.get("[[COUNTY]]")}<span style="white-space:pre;">&nbsp; &nbsp;&nbsp;</span>)<span style="white-space:pre;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span>&nbsp; &nbsp;CAUSE NO. ${FIELDS.get("[[CAUSE_NUMBER]]")}</p>
<p><span style="white-space:pre;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span>)</p>
<p><span style="white-space:pre;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span>)</p>
<p><span style="white-space:pre;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span>)</p>
<p>--------------------------------------------------------------<span style="white-space:pre;">&nbsp; &nbsp;&nbsp;</span>x</p>
<p>IN THE MATTER OF THE SEARCH OF <span style="white-space:pre;">&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span>:<span style="white-space:pre;">&nbsp; &nbsp;&nbsp;</span></p>
<p>INFORMATION REGARDING ACCOUNTS <span style="white-space:pre;">&nbsp; &nbsp;&nbsp;</span>:</p>
<p>ASSOCATIED WITH CERTAIN SEARCH <span style="white-space:pre;">&nbsp; &nbsp;&nbsp;</span>:</p>
<p>ENGINE REQUESTS DURING PRETERMINED<span style="white-space:pre;">&nbsp; &nbsp;&nbsp;</span>:</p>
<p>DURATION OF TIME, MAINTAINED <span style="white-space:pre;">&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span>:</p>
<p>ON COMPUTER SERVERS CONTROLLED &nbsp; &nbsp; <span style="white-space:pre;">&nbsp; &nbsp;&nbsp;</span>:<span style="white-space:pre;">&nbsp; &nbsp;&nbsp;</span>&nbsp;</p>
<p>BY GOOGLE, INC.,<span style="white-space:pre;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span>:<span style="white-space:pre;">&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span></p>
<p>--------------------------------------------------------------<span style="white-space:pre;">&nbsp; &nbsp;&nbsp;</span>x<span style="white-space:pre;">&nbsp; &nbsp;&nbsp;</span></p>
<p><br></p>
<p>AFFIDAVIT IN SUPPORT OF</p>
<p>AN APPLICATION FOR A SEARCH WARRANT</p>
<p><span style="white-space:pre;">&nbsp; &nbsp;&nbsp;</span>I, ${FIELDS.get("[[CASE_AGENT_NAME]]")} of the Indiana State Police, being first duly sworn, hereby depose and state as follows:</p>
<p><br></p>
<p>INTRODUCTION AND AGENT BACKGROUND</p>
<p><span style="white-space:pre;">&nbsp; &nbsp;&nbsp;</span>1. <span style="white-space:pre;">&nbsp; &nbsp;&nbsp;</span>I make this affidavit in support of an application for a search warrant for information that is maintained on computer servers controlled by Google, Inc. (&ldquo;Google&rdquo;), an email provider headquartered at 1600 Amphitheatre Parkway, Mountain View, California 94043. &nbsp;The information to be searched is described in the following paragraphs and in Section I of Attachment A to the proposed warrant, which consists of Google search engine queried data associated with a particular duration of time, as specified in Section I of Attachment A. &nbsp;This affidavit is made in support of an application for a search warrant under 18 U.S.C. &apos; 2703(c)(1)(A) to require Google to disclose to the government copies of the information further described in Section II of Attachment A.</p>
<p><span style="white-space:pre;">&nbsp; &nbsp;&nbsp;</span>2.<span style="white-space:pre;">&nbsp; &nbsp;&nbsp;</span>Your affiant, ${FIELDS.get("[[OFFICER_NAME]]")}, a law enforcement officer with the ${FIELDS.get("[[AGENCY_NAME]]")}, being duly sworn, swears and affirms under penalties for perjury that the following&nbsp;</p>

        `
    )
}
  