export interface Specialty {
  value: string;
  label: string;
}

export const specialties: Specialty[] = [
  { value: 'yoga', label: 'יוגה ופילאטיס' },
  { value: 'diving', label: 'צלילה' },
  { value: 'music', label: 'מוזיקה והופעות' },
  { value: 'cooking', label: 'בישול ואוכל' },
  { value: 'photography', label: 'צילום' },
  { value: 'massage', label: 'עיסוי ורפואה משלימה' },
  { value: 'fitness', label: 'כושר גופני' },
  { value: 'art', label: 'אמנות ויצירה' },
  { value: 'language', label: 'הוראת שפות' },
  { value: 'tour_guide', label: 'מדריכי טיולים' },
  { value: 'other', label: 'אחר' },
]; 