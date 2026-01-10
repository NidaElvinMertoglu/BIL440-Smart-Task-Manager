// src/mockData.ts

// Tarihleri dinamik ayarlamak için yardımcı fonksiyon
// (Böylece proje her zaman "bugün"den itibaren başlar)
const today = new Date();
const setDate = (dayDiff: number) => {
  const d = new Date(today);
  d.setDate(d.getDate() + dayDiff);
  return d.toISOString();
};

export const MOCK_TASKS = [
  {
    id: '1',
    title: 'Veritabanı Tasarımı',
    start_date: setDate(-2), // 2 gün önce başladı
    due_date: setDate(1),    // Yarın bitecek
    priority: 'high',
    progress: 80,
    dependencies: [],
    
    // AI Alanları
    is_risk: false,
    risk_message: '',
    ai_suggestion: ''
  },
  {
    id: '2',
    title: 'API Geliştirme',
    start_date: setDate(1),
    due_date: setDate(4),
    priority: 'high',
    progress: 20,
    dependencies: ['1'], // 1 bitmeden başlayamaz
    
    // AI Alanları
    is_risk: false,
    risk_message: '',
    ai_suggestion: ''
  },
  {
    id: '3',
    title: 'Frontend Entegrasyonu',
    start_date: setDate(3),
    due_date: setDate(6),
    priority: 'medium',
    progress: 0,
    dependencies: ['2'],
    
    // --- BURASI ÖNEMLİ: RİSK SİMÜLASYONU ---
    is_risk: true, 
    risk_message: "Bağımlı olduğu 'API Geliştirme' görevi bitmeden planlanmış.",
    ai_suggestion: "Başlangıç tarihini 2 gün erteleyerek 5. güne çekin."
  },
  {
    id: '4',
    title: 'Kullanıcı Testleri',
    start_date: setDate(7),
    due_date: setDate(10),
    priority: 'low',
    progress: 0,
    dependencies: ['3'],
    
    is_risk: false,
    risk_message: '',
    ai_suggestion: ''
  }
];