import React, { useState } from 'react';
import generateFeasibilityStudy from '../services/huggingface';

const FeasibilityStudyForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    projectType: 'صناعي',
    budget: '',
    description: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult('');
    
    try {
      const response = await generateFeasibilityStudy(formData);
      setResult(response);
      setLoading(false);
    } catch (error: any) {
      console.error('Error:', error);
      setError(error.message || 'حدث خطأ أثناء توليد دراسة الجدوى. الرجاء المحاولة مرة أخرى.');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="text-center mb-4">
        <h1 className="text-3xl font-cairo font-bold mb-1">
          <span className="text-[#95c97f]">Green</span>
          <span className="text-[#e9c397]">Light</span>
        </h1>
        <h2 className="text-lg font-semibold mb-1">نظام توليد دراسة الجدوى</h2>
        <p className="text-sm text-[#95c97f]">ابدأ الآن واحصل على دراسة جدوى مفصلة لمشروعك!</p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 text-right">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-4">
        <div className="space-y-3">
          <div>
            <label className="block text-right text-sm text-gray-600 mb-1">اسم المشروع</label>
            <input
              type="text"
              placeholder="مثال: مطعم شاورما"
              className="w-full p-2 border border-gray-200 rounded text-right bg-white"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-right text-sm text-gray-600 mb-1">نوع المشروع</label>
            <select
              className="w-full p-2 border border-gray-200 rounded text-right appearance-none bg-white"
              value={formData.projectType}
              onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
              required
            >
              <option value="صناعي">صناعي</option>
              <option value="تجاري">تجاري</option>
              <option value="خدمي">خدمي</option>
              <option value="زراعي">زراعي</option>
            </select>
          </div>

          <div>
            <label className="block text-right text-sm text-gray-600 mb-1">الميزانية (بالجنيه المصري)</label>
            <input
              type="text"
              placeholder="مثال: 100000"
              className="w-full p-2 border border-gray-200 rounded text-right bg-white"
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-right text-sm text-gray-600 mb-1">وصف المشروع</label>
            <textarea
              placeholder="اكتب وصفاً مفصلاً لمشروعك..."
              className="w-full p-2 border border-gray-200 rounded text-right bg-white h-24 resize-none"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={() => setFormData({ name: '', projectType: 'صناعي', budget: '', description: '' })}
            className="flex-1 py-2 px-4 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-sm"
          >
            مسح النموذج
          </button>
          <button
            type="submit"
            className="flex-1 py-2 px-4 bg-gradient-to-r from-[#95c97f] to-[#e9c397] text-white rounded hover:opacity-90 text-sm"
            disabled={loading}
          >
            {loading ? 'جاري المعالجة...' : 'ابدأ الآن واحصل على دراسة جدوى مفصلة لمشروعك!'}
          </button>
        </div>
      </form>

      {result && (
        <div className="bg-white rounded-lg shadow-sm p-4 mt-4">
          <h3 className="text-lg font-semibold mb-3 text-right">نتيجة دراسة الجدوى</h3>
          <div className="whitespace-pre-wrap text-right text-sm" dir="rtl">
            {result}
          </div>
        </div>
      )}
    </div>
  );
};

export default FeasibilityStudyForm;
