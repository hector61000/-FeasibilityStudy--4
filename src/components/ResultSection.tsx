import React from 'react';
import { Download } from 'lucide-react';
import { generatePDF } from '../utils/pdfGenerator';

interface ResultSectionProps {
  result: string;
}

export default function ResultSection({ result }: ResultSectionProps) {
  const handleDownloadPDF = () => {
    generatePDF(result);
  };

  const sections = [
    { title: 'الملخص التنفيذي', content: result.split('\n').slice(0, 3).join('\n') },
    { title: 'دراسة السوق', content: result.split('\n').slice(3, 6).join('\n') },
    { title: 'الدراسة المالية', content: result.split('\n').slice(6).join('\n') }
  ];

  return (
    <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <button
          onClick={handleDownloadPDF}
          className="flex items-center gap-2 bg-[#8AB16F] text-white px-6 py-2.5 rounded-lg hover:bg-[#7a9e62] transition-colors duration-200 shadow-sm hover:shadow-md"
        >
          <Download className="h-5 w-5" />
          <span>تحميل PDF</span>
        </button>
        <h3 className="text-2xl font-bold text-gray-800">نتائج دراسة الجدوى</h3>
      </div>

      <div className="space-y-8">
        {sections.map((section, index) => (
          <div key={index} className="border-r-4 border-[#8AB16F] pr-4 bg-gray-50 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">{section.title}</h4>
            <div className="text-gray-600 whitespace-pre-wrap leading-relaxed">{section.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}