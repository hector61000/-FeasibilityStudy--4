interface FormData {
  projectName: string;
  budget: string;
  description: string;
}

export const validateForm = (data: FormData) => {
  const errors: Partial<FormData> = {};

  if (!data.projectName.trim()) {
    errors.projectName = 'يرجى إدخال اسم المشروع';
  }

  if (!data.budget) {
    errors.budget = 'يرجى إدخال الميزانية المتاحة';
  } else if (Number(data.budget) <= 0) {
    errors.budget = 'يجب أن تكون الميزانية أكبر من صفر';
  }

  if (!data.description.trim()) {
    errors.description = 'يرجى إدخال وصف المشروع';
  } else if (data.description.trim().length < 20) {
    errors.description = 'يجب أن يكون وصف المشروع أكثر من 20 حرفاً';
  }

  return errors;
};