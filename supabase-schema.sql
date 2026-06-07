-- =============================================
-- SCHEMA DATABASE AL-HIKAM (Supabase / PostgreSQL)
-- Jalankan ini di Supabase SQL Editor
-- =============================================

-- Tabel BAB (Bab/Pembagian Kitab)
CREATE TABLE IF NOT EXISTS bab (
  id SERIAL PRIMARY KEY,
  urutan INTEGER NOT NULL UNIQUE,
  nama TEXT NOT NULL,
  deskripsi TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabel HIKAM (Isi Kitab Al-Hikam)
CREATE TABLE IF NOT EXISTS hikam (
  id SERIAL PRIMARY KEY,
  nomor INTEGER NOT NULL UNIQUE,
  bab_id INTEGER REFERENCES bab(id) ON DELETE SET NULL,
  bab TEXT, -- nama bab (denormalisasi untuk kemudahan)
  arab TEXT NOT NULL,
  latin TEXT,
  terjemahan TEXT NOT NULL,
  penjelasan TEXT,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index untuk pencarian
CREATE INDEX IF NOT EXISTS idx_hikam_nomor ON hikam(nomor);
CREATE INDEX IF NOT EXISTS idx_hikam_bab_id ON hikam(bab_id);
CREATE INDEX IF NOT EXISTS idx_hikam_tags ON hikam USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_hikam_terjemahan ON hikam USING GIN(to_tsvector('indonesian', terjemahan));

-- Row Level Security (RLS) - read only untuk public
ALTER TABLE hikam ENABLE ROW LEVEL SECURITY;
ALTER TABLE bab ENABLE ROW LEVEL SECURITY;

CREATE POLICY "hikam_read_public" ON hikam FOR SELECT USING (true);
CREATE POLICY "bab_read_public" ON bab FOR SELECT USING (true);

-- =============================================
-- SEED DATA - Bab
-- =============================================
INSERT INTO bab (urutan, nama) VALUES
  (1, 'Tanda-tanda Bergantung kepada Amal'),
  (2, 'Mengenal Hakikat Diri'),
  (3, 'Cahaya dan Kegelapan Hati'),
  (4, 'Istirahat Jiwa'),
  (5, 'Cahaya Ma''rifat'),
  (6, 'Pintu Taubat'),
  (7, 'Hakikat Zuhud'),
  (8, 'Maqam Ridha'),
  (9, 'Perjalanan Menuju Allah'),
  (10, 'Adab kepada Allah')
ON CONFLICT DO NOTHING;

-- =============================================
-- SEED DATA - Hikam (10 pertama sebagai contoh)
-- Tambahkan 254 hikmah lainnya secara lengkap
-- =============================================
INSERT INTO hikam (nomor, bab_id, bab, arab, latin, terjemahan, penjelasan, tags) VALUES
(1, 1, 'Tanda-tanda Bergantung kepada Amal',
 'مِنْ عَلَامَةِ الاِعْتِمَادِ عَلَى الْعَمَلِ، نُقْصَانُ الرَّجَاءِ عِنْدَ وُجُودِ الزَّلَلِ',
 'Min alāmatil i''timādi alal amal, nuqṣānur rajā''i inda wujūdiz zallal',
 'Di antara tanda-tanda bergantung kepada amal adalah berkurangnya harapan kepada Allah ketika terjadi kesalahan.',
 'Hikmah pertama ini menjelaskan bahwa orang yang bergantung kepada amal ibadahnya, ketika ia melakukan kesalahan atau dosa, harapannya kepada Allah akan berkurang. Padahal seharusnya harapan kepada Allah tidak bergantung pada amal, melainkan pada kemurahan dan rahmat-Nya semata.',
 ARRAY['tawakkal', 'amal', 'raja', 'harapan']),

(2, 2, 'Mengenal Hakikat Diri',
 'إِرَادَتُكَ التَّجْرِيدَ مَعَ إِقَامَةِ اللهِ إِيَّاكَ فِي الأَسْبَابِ مِنَ الشَّهْوَةِ الْخَفِيَّةِ',
 'Irādatukat tajrīda ma''a iqāmatillāhi iyyāka fil asbābi minash shahwatil khafiyyah',
 'Keinginanmu untuk hidup dalam keterasingan, padahal Allah menempatkanmu dalam alam sebab-akibat, adalah termasuk syahwat yang tersembunyi.',
 'Hikmah ini mengajarkan bahwa menginginkan kondisi spiritual tertentu tanpa mengikuti ketentuan Allah adalah bentuk nafsu yang halus.',
 ARRAY['zuhud', 'syahwat', 'takdir', 'asbab'])
ON CONFLICT DO NOTHING;

-- =============================================
-- Full-text search function
-- =============================================
CREATE OR REPLACE FUNCTION search_hikam(query TEXT)
RETURNS SETOF hikam AS $$
  SELECT * FROM hikam
  WHERE
    terjemahan ILIKE '%' || query || '%'
    OR penjelasan ILIKE '%' || query || '%'
    OR query = ANY(tags)
  ORDER BY nomor;
$$ LANGUAGE SQL STABLE;
