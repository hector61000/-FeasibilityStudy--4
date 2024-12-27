import React from 'react';

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center gap-3">
      <div className="animate-spin rounded-full h-6 w-6 border-3 border-[#8AB16F] border-t-transparent"></div>
      <span className="text-gray-600">جارٍ إعداد دراسة الجدوى المخصصة لمشروعك...</span>
    </div>
  );
}