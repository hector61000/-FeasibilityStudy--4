interface ApiResponse {
  generated_text: string;
}

export async function generateFeasibilityStudy(projectData: {
  projectName: string;
  budget: string;
  description: string;
}): Promise<string> {
  try {
    const response = await fetch('https://api-inference.huggingface.co/models/EleutherAI/gpt-j-6B', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer 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',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: `قم بإنشاء دراسة جدوى للمشروع التالي:
        اسم المشروع: ${projectData.projectName}
        الميزانية: ${projectData.budget}
        الوصف: ${projectData.description}`
      }),
    });

    if (!response.ok) {
      throw new Error('عذراً، لم نتمكن من توليد دراسة الجدوى. تأكد من صحة البيانات وأعد المحاولة.');
    }

    const data = await response.json();
    
    if (!Array.isArray(data) || !data[0]?.generated_text) {
      throw new Error('عذراً، حدث خطأ في معالجة البيانات. الرجاء المحاولة مرة أخرى.');
    }

    return data[0].generated_text;
  } catch (error) {
    console.error('خطأ في توليد دراسة الجدوى:', error);
    throw error instanceof Error ? error : new Error('عذراً، حدث خطأ غير متوقع. الرجاء المحاولة مرة أخرى.');
  }
}