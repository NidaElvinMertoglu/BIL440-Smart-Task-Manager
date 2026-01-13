# BIL440-Smart-Task-Manager

BİL440 YZ Destekli Yazılım Geliştirme 2025-26 Güz, Final Projesi AI-Augmented Software Lifecycle Project

## Proje Tanımı

**Smart Task Manager**, kullanıcıların görevlerini akıllı bir şekilde yönetmelerine, yapay zeka destekli analizlerle riskleri önceden tespit etmelerine ve projelerini görsel olarak planlamalarına olanak tanıyan modern bir web uygulamasıdır. Bu proje, FastAPI (Python) ile geliştirilmiş bir REST API ve React (TypeScript) ile oluşturulmuş dinamik bir kullanıcı arayüzünden oluşmaktadır.

## Özellikler

- **Kullanıcı Yönetimi:** Güvenli kayıt (register) ve giriş (login) işlemleri (JWT tabanlı).
- **Görev Yönetimi (CRUD):** Yeni görevler oluşturma, mevcut görevleri görüntüleme, güncelleme ve silme.
- **AI Destekli Risk Analizi:** Görevlerin bitiş tarihine ve ilerlemesine göre gecikme riskini otomatik olarak analiz eder ve kullanıcıyı uyarır.
- **Akıllı Öneriler:** Riskli görevler için "önceliği artır" veya "kapsamı daralt" gibi aksiyon odaklı öneriler sunar.
- **Etkileşimli Gantt Şeması:** Proje zaman çizelgesini ve görev bağımlılıklarını görselleştiren dinamik Gantt şeması.
- **İstatistiksel Pano:** Toplam görev sayısı, tamamlanma yüzdesi ve riskli görevler gibi önemli metrikleri gösteren bir başlangıç panosu.
- **Dinamik Görev Görünümleri:** Görevleri hem liste hem de kart (grid) formatında görüntüleme seçeneği.
- **Modern Arayüz:** Tailwind CSS ile oluşturulmuş şık, kullanışlı ve responsive (mobil uyumlu) tasarım.

## Kullanılan Teknolojiler

### Backend
- **Python 3.10+**
- **FastAPI:** Yüksek performanslı bir Python web framework'ü.
- **SQLAlchemy:** SQL toolkit ve Object-Relational Mapper (ORM).
- **Pydantic:** Veri doğrulama ve ayarlar yönetimi.
- **Passlib & python-jose:** Şifre hashleme ve JWT (JSON Web Token) yönetimi.
- **Uvicorn:** ASGI sunucusu.
- **Veritabanı:** SQLite

### Frontend
- **React 18**
- **TypeScript**
- **Vite:** Hızlı ve modern bir frontend build aracı.
- **React Router:** Sayfa yönlendirmeleri için.
- **TanStack Query (React Query):** Sunucu durumu yönetimi ve veri çekme işlemleri.
- **Axios:** HTTP istemcisi.
- **Tailwind CSS:** Utility-first CSS framework'ü.
- **gantt-task-react:** Gantt şeması bileşeni.
- **Lucide React:** İkon seti.

## Kurulum ve Çalıştırma

Projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları izleyin.

### Gereksinimler
- **Node.js** (v18 veya üstü)
- **Python** (v3.10 veya üstü) ve `pip`

### 1. Backend Kurulumu

```bash
# Proje kök dizinindeyken backend klasörüne gidin
cd backend

# Gerekli Python paketlerini kurun
pip install -r requirements.txt

# FastAPI sunucusunu başlatın
# Sunucu http://127.0.0.1:8000 adresinde çalışacaktır
uvicorn main:app --reload
```

### 2. Frontend Kurulumu

```bash
# Proje kök dizinindeyken frontend klasörüne gidin
cd frontend

# Gerekli Node.js modüllerini kurun
npm install

# Geliştirme sunucusunu başlatın
# Uygulama genellikle http://localhost:5173 adresinde açılır
npm run dev
```

Uygulamaya erişmek için tarayıcınızda frontend sunucusunun adresini açın.

## API Endpointleri

API, `http://127.0.0.1:8000` adresi altında çalışır.

### Auth Rotaları (`/auth`)

- `POST /auth/register`: Yeni kullanıcı kaydı oluşturur.
- `POST /auth/token`: Kullanıcı girişi yaparak JWT token alır.
- `GET /auth/me`: Mevcut giriş yapmış kullanıcının bilgilerini döndürür (Token gerektirir).

### Task Rotaları (`/tasks`)

Tüm task rotaları JWT token ile korumalıdır.

- `GET /tasks/`: Giriş yapmış kullanıcıya ait tüm görevleri listeler.
- `POST /tasks/`: Yeni bir görev oluşturur. Görev oluşturulurken risk analizi otomatik olarak yapılır.
- `GET /tasks/{task_id}`: Belirli bir görevin detaylarını getirir.
- `PUT /tasks/{task_id}`: Belirli bir görevi günceller. Güncelleme sırasında risk analizi yeniden yapılır.
- `DELETE /tasks/{task_id}`: Belirli bir görevi siler.

## Proje Yapısı

```
.
├── backend/            # FastAPI Backend kodları
│   ├── routes/         # API endpoint'leri (auth, tasks)
│   ├── database.py     # Veritabanı bağlantısı ve ayarları
│   ├── main.py         # Ana FastAPI uygulaması
│   ├── models.py       # SQLAlchemy veritabanı modelleri
│   ├── schemas.py      # Pydantic veri şemaları
│   ├── priority_engine.py # AI risk analiz motoru
│   └── requirements.txt # Python bağımlılıkları
│
└── frontend/           # React Frontend kodları
    ├── src/
    │   ├── api/        # Backend ile iletişim kuran Axios fonksiyonları
    │   ├── components/ # Tekrar kullanılabilir React bileşenleri (Gantt, TaskList vb.)
    │   ├── context/    # React context'leri (örn: AuthContext)
    │   ├── pages/      # Ana sayfalar (Dashboard, Login, Profile vb.)
    │   ├── types/      # TypeScript tip tanımları
    │   ├── App.tsx     # Ana uygulama bileşeni ve yönlendirme
    │   └── main.tsx    # React uygulamasının başlangıç noktası
    └── package.json    # Node.js bağımlılıkları ve script'ler
```