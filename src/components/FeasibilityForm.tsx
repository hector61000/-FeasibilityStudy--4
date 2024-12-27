import React, { useState } from 'react';
import { Send } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';
import ResultSection from './ResultSection';
import { validateForm } from '../utils/validation';
import { generateFeasibilityStudy } from '../utils/api';

interface FormData {
  projectName: string;
  budget: string;
  description: string;
}

export default function FeasibilityForm() {
  const [formData, setFormData] = useState<FormData>({
    projectName: '',
    budget: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setErrors({});
    
    try {
      const generatedText = await generateFeasibilityStudy(formData);
      setResult(generatedText);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ غير متوقع');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-right text-lg font-medium text-gray-700 mb-2">
            اسم المشروع
          </label>
          <input
            type="text"
            placeholder="مثال: مطعم للمأكولات الصحية"
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-right
              ${errors.projectName ? 'border-red-500' : 'border-gray-300'}`}
            value={formData.projectName}
            onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
          />
          {errors.projectName && (
            <p className="mt-1 text-red-500 text-sm">{errors.projectName}</p>
          )}
        </div>

        <div>
          <label className="block text-right text-lg font-medium text-gray-700 mb-2">
            الميزانية المتاحة
          </label>
          <input
            type="number"
            placeholder="مثال: 100000"
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-right
              ${errors.budget ? 'border-red-500' : 'border-gray-300'}`}
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
          />
          {errors.budget && (
            <p className="mt-1 text-red-500 text-sm">{errors.budget}</p>
          )}
        </div>

        <div>
          <label className="block text-right text-lg font-medium text-gray-700 mb-2">
            وصف المشروع
          </label>
          <textarea
            rows={4}
            placeholder="مثال: مطعم متخصص في تقديم الوجبات الصحية والعضوية في منطقة تجارية نشطة"
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-right
              ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          {errors.description && (
            <p className="mt-1 text-red-500 text-sm">{errors.description}</p>
          )}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-right">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
              <Send className="h-5 w-5" />
              <span>ابدأ الآن واستلم دراسة جدوى احترافية لمشروعك في دقائق!</span>
            </>
          )}
        </button>
      </form>

      {result && <ResultSection result={result} />}
    </div>
  );
}