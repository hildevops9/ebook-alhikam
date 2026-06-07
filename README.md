# 📖 Al-Hikam — Aplikasi Ebook Kitab Al-Hikam

Aplikasi web untuk membaca dan mempelajari Kitab Al-Hikam karya Ibnu Athaillah As-Sakandari, dilengkapi fitur Tanya Ustadz berbasis AI.

## 🗂️ Struktur Project

```
alhikam-app/
├── frontend/          # React + Vite + Tailwind (deploy ke Vercel)
│   ├── src/
│   │   ├── components/   # Navbar, HikamCard, Skeleton
│   │   ├── pages/        # Home, Kitab, HikamDetail, TanyaUstadz
│   │   ├── hooks/        # useHikam (fetch data)
│   │   └── lib/          # supabase client, mock data
│   └── vercel.json
├── backend/           # Node.js + Express (deploy ke Vercel)
│   ├── src/
│   │   ├── routes/       # hikam.js, chat.js
│   │   └── index.js
│   └── vercel.json
└── supabase-schema.sql   # SQL untuk setup database
```

## 🛠️ Tech Stack

| Layer | Teknologi |
|-------|-----------|
| Frontend | React 18, React Router, Tailwind CSS, Vite |
| Backend | Node.js, Express.js |
| Database | **Supabase** (PostgreSQL) |
| AI (Tanya Ustadz) | Claude API (Anthropic) |
| Deploy | Vercel |

### Kenapa Supabase?
- ✅ **Gratis** (500MB, 50K baris) — cukup untuk 264 hikmah
- ✅ **PostgreSQL** — powerful, mendukung full-text search
- ✅ **REST API otomatis** — bisa langsung dari frontend
- ✅ **Row Level Security** — aman tanpa backend bila diperlukan
- ✅ **Mudah di-seed** via SQL Editor

---

## 🚀 Cara Setup

### 1. Clone & Install

```bash
git clone <repo-url>
cd alhikam-app

# Install frontend
cd frontend && npm install

# Install backend
cd ../backend && npm install
```

### 2. Setup Supabase

1. Buat akun di [supabase.com](https://supabase.com)
2. Buat project baru
3. Pergi ke **SQL Editor**
4. Copy-paste isi `supabase-schema.sql` dan jalankan
5. Catat **Project URL** dan **anon key** dari Settings > API

### 3. Setup Environment Variables

**Frontend** (`frontend/.env`):
```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

**Backend** (`backend/.env`):
```env
ANTHROPIC_API_KEY=sk-ant-...
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_KEY=eyJ... (service_role key, bukan anon!)
FRONTEND_URL=http://localhost:5173
```

> ⚠️ Tanpa env vars, app tetap berjalan menggunakan **mock data** (10 hikmah contoh)

### 4. Jalankan Lokal

```bash
# Terminal 1 — Backend
cd backend && npm run dev

# Terminal 2 — Frontend
cd frontend && npm run dev
```

Buka http://localhost:5173

---

## 🌐 Deploy ke Vercel

### Deploy Frontend

```bash
cd frontend
npx vercel --prod
```

Set environment variables di Vercel Dashboard:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### Deploy Backend

```bash
cd backend
npx vercel --prod
```

Set environment variables:
- `ANTHROPIC_API_KEY`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_KEY`
- `FRONTEND_URL` (URL frontend yang sudah dideploy)

---

## 📱 Fitur Aplikasi

### 📚 Kitab Al-Hikam
- Daftar semua 264 hikmah dengan teks Arab, latin, dan terjemahan
- Filter per bab
- Pencarian full-text
- Pagination
- Navigasi prev/next antar hikmah
- Share hikmah

### 💬 Tanya Ustadz
- Chat AI dengan konteks Al-Hikam
- Dijawab oleh Claude (Anthropic) dengan sistem prompt ustadz
- Rate limiting untuk mencegah abuse
- Suggested questions

---

## 📊 Mengisi Data Lengkap 264 Hikmah

Setelah setup Supabase, tambahkan semua hikmah via:

1. **SQL Editor Supabase** — tambahkan INSERT statements
2. **Supabase Table Editor** — input manual
3. **Import CSV** — buat CSV lalu upload di Table Editor

Format data setiap hikmah:
```sql
INSERT INTO hikam (nomor, bab_id, bab, arab, latin, terjemahan, penjelasan, tags)
VALUES (3, 1, 'Nama Bab', 'نص عربي', 'latin text', 'terjemahan', 'penjelasan', ARRAY['tag1', 'tag2']);
```

---

## 🎨 Desain

- Tema: **Islamic · Klasik · Elegan**
- Warna: Sand/emas + Ink/gelap
- Font: Cormorant Garamond (display) + Lora (body) + Scheherazade New (Arab)
- Responsive: Mobile-first
