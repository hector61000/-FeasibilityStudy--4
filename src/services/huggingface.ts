import axios from 'axios';

interface FeasibilityStudyParams {
  name: string;
  budget: string;
  description: string;
  projectType: string;
}

const generateFeasibilityStudy = async (data: FeasibilityStudyParams): Promise<string> => {
  try {
    // للاختبار فقط - سنقوم بإرجاع نص ثابت
    return `
    دراسة جدوى مشروع: ${data.name}
    
    1. الملخص التنفيذي:
    - نوع المشروع: ${data.projectType}
    - الميزانية المتاحة: ${data.budget} جنيه مصري
    - وصف المشروع: ${data.description}
    
    2. دراسة السوق والمنافسين:
    - تم تحليل السوق المستهدف
    - تم دراسة المنافسين في المنطقة
    - فرص النجاح عالية بناءً على احتياجات السوق
    
    3. الدراسة الفنية والتشغيلية:
    - المتطلبات الفنية متوافقة مع الميزانية
    - خطة التشغيل واضحة وقابلة للتنفيذ
    
    4. الدراسة المالية:
    - تكاليف التأسيس: ${parseInt(data.budget) * 0.4} جنيه مصري
    - المصروفات الشهرية المتوقعة: ${parseInt(data.budget) * 0.1} جنيه مصري
    - الإيرادات المتوقعة: ${parseInt(data.budget) * 0.25} جنيه مصري شهرياً
    
    5. تحليل المخاطر:
    - تم تحديد المخاطر المحتملة
    - وضع خطط للتعامل مع المخاطر
    
    6. التوصيات والخلاصة:
    - المشروع مجدي اقتصادياً
    - نوصي بالبدء في التنفيذ مع مراعاة النقاط المذكورة
    `;
  } catch (error) {
    console.error('Error in generateFeasibilityStudy:', error);
    throw new Error('حدث خطأ أثناء توليد دراسة الجدوى. الرجاء المحاولة مرة أخرى');
  }
};

export default generateFeasibilityStudy;
