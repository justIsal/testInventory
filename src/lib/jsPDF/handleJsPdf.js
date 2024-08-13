import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export async function handleGeneratePdf(lincenseCertificatedRef) {
  try {
    const inputData = lincenseCertificatedRef.current;
    const canvas = await html2canvas(inputData);
    const imgData = canvas.toDataURL('image/JPG');
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: 'a4',
    });
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(imgData, 'JPG', 0, 0, width, height);
    pdf.save('Dokument.pdf');
  } catch (error) {
    console.log(error);
  }
}