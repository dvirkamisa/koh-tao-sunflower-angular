export interface Activity {
  value: string;
  label: string;
  icon: string;
}

export const activities: Activity[] = [
  { value: 'diving', label: 'צלילות', icon: '🤿' },
  { value: 'yoga', label: 'יוגה ופילאטיס', icon: '🧘‍♀️' },
  { value: 'parties', label: 'מסיבות והופעות', icon: '🎵' },
  { value: 'ice_bath', label: 'אמבטיות קרח', icon: '❄️' },
  { value: 'sauna', label: 'סאונה יבשה', icon: '🔥' },
  { value: 'motorcycle', label: 'טיולי אופנועים', icon: '🏍️' },
  { value: 'shabbat', label: 'ארוחות שבת', icon: '🕯️' }
]; 