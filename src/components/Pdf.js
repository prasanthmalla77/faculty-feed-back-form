import React from 'react';
import { PDFDocument, rgb } from 'pdf-lib';
import { saveAs } from 'file-saver';
import samplePDF from './samples.pdf';
import { Button } from "@mui/material";

function Pdf(props) {
  const combinedData = props.combinedData;
  const formData = props.formData;
  const data = combinedData;
  console.log(formData);

  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split('T')[0];

  const calculateTotalMarks = () => {
    const totalMarks = data.reduce(
      (sum, evaluation) =>
        sum + (evaluation.marks ? parseInt(evaluation.marks) : 0),
      0
    );
    const percentage = (totalMarks / 75) * 100;
    return percentage.toFixed(2);
  };

  const modifyAndDownloadPDF = async () => {
    try {
      const response = await fetch(samplePDF);
      const pdfBytes = await response.arrayBuffer();

      const pdfDoc = await PDFDocument.load(pdfBytes);
      const pages = pdfDoc.getPages();

      for (const page of pages) {
        const { height } = page.getSize();
        const fontSize = 12;

        const x = 185;
        const y = 427;

        page.drawText(`${calculateTotalMarks()}`, {
          x,
          y: height - y,
          size: fontSize,
          color: rgb(0, 0, 0),
        });
      }
      for (const page of pages) {
        const { height } = page.getSize();
        const fontSize = 12;

        const x = 154;
        const y = 205;

        page.drawText(`${formData.faculty}`, {
          x,
          y: height - y,
          size: fontSize,
          color: rgb(0, 0, 0),
        });
      }
      for (const page of pages) {
        const { height } = page.getSize();
        const fontSize = 12;

        const x = 154;
        const y = 247;

        page.drawText(`${formData.faculty}`, {
          x,
          y: height - y,
          size: fontSize,
          color: rgb(0, 0, 0),
        });
      }
      for (const page of pages) {
        const { height } = page.getSize();
        const fontSize = 12;

        const x = 465;
        const y = 178;

        page.drawText(`${formattedDate}`, {
          x,
          y: height - y,
          size: fontSize,
          color: rgb(0, 0, 0),
        });
      }

      const modifiedPdfBytes = await pdfDoc.save();
      const blob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });

      saveAs(blob, 'modified_pdf.pdf');
    } catch (error) {
      console.error('Error modifying or downloading PDF:', error);
    }
  };

  return (
    <div style={{ alignItems: 'center' }}>
      <Button variant="contained" color='primary' onClick={modifyAndDownloadPDF}>Final Report </Button>

    </div>
  );
}

export default Pdf;
 