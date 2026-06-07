-- =============================================
-- SCHEMA DATABASE AL-HIKAM (Supabase / PostgreSQL)
-- Jalankan di: Supabase Dashboard → SQL Editor → New Query
-- =============================================

-- =============================================
-- DROP (jika mau reset ulang dari awal)
-- =============================================
-- DROP TABLE IF EXISTS tanya_ustad;
-- DROP TABLE IF EXISTS hikam;


-- =============================================
-- TABEL HIKAM
-- Kolom disesuaikan persis dengan hikamData.js
-- =============================================
CREATE TABLE IF NOT EXISTS hikam (
  id        INTEGER PRIMARY KEY,        -- pakai id dari data (1–250), bukan auto-increment
  nomor     INTEGER NOT NULL UNIQUE,
  arab      TEXT    NOT NULL,
  terjemahan TEXT   NOT NULL,
  penjelasan TEXT,
  tags      TEXT[]  DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index untuk performa pencarian
CREATE INDEX IF NOT EXISTS idx_hikam_nomor  ON hikam (nomor);
CREATE INDEX IF NOT EXISTS idx_hikam_tags   ON hikam USING GIN (tags);

-- Full-text search (bahasa Indonesia)
CREATE INDEX IF NOT EXISTS idx_hikam_fts ON hikam
  USING GIN (to_tsvector('indonesian', coalesce(terjemahan, '') || ' ' || coalesce(penjelasan, '')));


-- =============================================
-- TABEL TANYA USTAD
-- Disimpan untuk riwayat & arsip pertanyaan
-- (walau tampilan pakai Google Form)
-- =============================================
CREATE TABLE IF NOT EXISTS tanya_ustad (
  id          SERIAL PRIMARY KEY,
  nama        TEXT    NOT NULL,
  pertanyaan  TEXT    NOT NULL,
  jawaban     TEXT,                           -- diisi oleh ustadz
  status      TEXT    DEFAULT 'pending'
                      CHECK (status IN ('pending', 'dijawab', 'ditolak')),
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  answered_at TIMESTAMPTZ
);

-- Index untuk filter status
CREATE INDEX IF NOT EXISTS idx_tanya_ustad_status ON tanya_ustad (status);


-- =============================================
-- ROW LEVEL SECURITY
-- Public hanya bisa READ hikam
-- Tanya ustad: public bisa INSERT, tidak bisa baca/edit
-- =============================================
ALTER TABLE hikam       ENABLE ROW LEVEL SECURITY;
ALTER TABLE tanya_ustad ENABLE ROW LEVEL SECURITY;

-- Hikam: siapa saja boleh baca
CREATE POLICY "hikam_public_read"
  ON hikam FOR SELECT
  USING (true);

-- Tanya Ustad: siapa saja boleh kirim pertanyaan
CREATE POLICY "tanya_ustad_public_insert"
  ON tanya_ustad FOR INSERT
  WITH CHECK (true);

-- Tanya Ustad: hanya service_role (admin) yang bisa baca & update
-- (untuk keperluan ustadz menjawab via Supabase dashboard)
CREATE POLICY "tanya_ustad_admin_all"
  ON tanya_ustad FOR ALL
  USING (auth.role() = 'service_role');


-- =============================================
-- HELPER FUNCTION: Pencarian teks bebas
-- =============================================
CREATE OR REPLACE FUNCTION search_hikam(query TEXT)
RETURNS SETOF hikam
LANGUAGE SQL STABLE AS $$
  SELECT *
  FROM   hikam
  WHERE  terjemahan ILIKE '%' || query || '%'
     OR  penjelasan ILIKE '%' || query || '%'
     OR  query = ANY(tags)
  ORDER  BY nomor;
$$;