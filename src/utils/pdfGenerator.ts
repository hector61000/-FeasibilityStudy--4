import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export const generatePDF = async (content: string) => {
  const pdf = new jsPDF('p', 'mm', 'a4', true);
  
  // تهيئة الخط العربي
  pdf.addFont('assets/fonts/NotoNaskhArabic-Regular.ttf', 'NotoNaskh', 'normal');
  pdf.setFont('NotoNaskh');
  pdf.setR2L(true);

  const lines = content.split('\n');
  let y = 20;

  pdf.setFontSize(24);
  pdf.text('دراسة الجدوى', pdf.internal.pageSize.width / 2, y, { align: 'center' });
  y += 20;

  pdf.setFontSize(12);
  lines.forEach(line => {
    if (y > 270) {
      pdf.addPage();
      y = 20;
    }
    pdf.text(line, 200, y, { align: 'right' });
    y += 7;
  });

  pdf.save('دراسة-الجدوى.pdf');
};