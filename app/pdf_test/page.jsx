'use client'
import { useState, useEffect } from "react";
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';;

const LoadPDF = () => {
    const [pdfInfo, setPdfInfo] = useState([]);
  
    useEffect(() => {
      modifyPdf();
    }, []);
    
    async function modifyPdf() {
        const url = 'https://pdf-lib.js.org/assets/with_update_sections.pdf'
        const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())
      
        const pdfDoc = await PDFDocument.load(existingPdfBytes)
        const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
      
        const pages = pdfDoc.getPages()
        const firstPage = pages[0]
        const { width, height } = firstPage.getSize()
        firstPage.drawText('This text was added with JavaScript!', {
          x: 5,
          y: height / 2 + 300,
          size: 50,
          font: helveticaFont,
          color: rgb(0.95, 0.1, 0.1),
          rotate: degrees(-45),
        })

        const form = pdfDoc.getForm()
        const fields = form.getFields()
        fields.forEach(field => {
            const type = field.constructor.name
            const name = field.getName()
            console.log("Type: ", type, "Name: ",name)
            })
  
        const pdfBytes = await pdfDoc.save();
        const bytes  = new Uint8Array( pdfBytes ); 
        const blob   = new Blob( [ bytes ], { type: "application/pdf" } );
        const docUrl = URL.createObjectURL( blob );
        setPdfInfo( docUrl );
    }
    
    return (
        <>
        <div style={{
            backgroundColor: 'blue',
            width: "100%",
            height: "50em",
            zIndex: 1
        }}>
            <iframe style={{
                width: "100%",
                height: "100%"
                }} title="test-frame" src={pdfInfo} type="application/pdf" />
        </div>
        </>
    );
  };
  
  export default LoadPDF;