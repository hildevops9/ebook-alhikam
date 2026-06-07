// =============================================================
// SEED SCRIPT - Al-Hikam App
// Cara pakai:
//   1. Pastikan sudah install dotenv:  npm install dotenv
//   2. Buat file .env di root project (satu folder dengan file ini)
//      SUPABASE_URL=https://xxxx.supabase.co
//      SUPABASE_SERVICE_KEY=eyJhbGci...  <-- pakai SERVICE ROLE key, bukan anon
//   3. Jalankan: node seed.js
// =============================================================

import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
import { hikamData } from './src/lib/hikamData.js'

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌  Variabel .env belum diset!')
  console.error('   Pastikan ada SUPABASE_URL dan SUPABASE_SERVICE_KEY di file .env')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

async function seed() {
  console.log('🌱  Mulai seeding Al-Hikam ke Supabase...')
  console.log(`📦  Total data: ${hikamData.length} hikmah\n`)

  // Upsert per batch biar tidak timeout kalau datanya besar
  const BATCH_SIZE = 50
  let successCount = 0
  let errorCount = 0

  for (let i = 0; i < hikamData.length; i += BATCH_SIZE) {
    const batch = hikamData.slice(i, i + BATCH_SIZE)
    const batchNum = Math.floor(i / BATCH_SIZE) + 1
    const totalBatch = Math.ceil(hikamData.length / BATCH_SIZE)

    const { error } = await supabase
      .from('hikam')
      .upsert(batch, { onConflict: 'id' })

    if (error) {
      console.error(`❌  Batch ${batchNum}/${totalBatch} gagal:`, error.message)
      errorCount += batch.length
    } else {
      successCount += batch.length
      console.log(`✅  Batch ${batchNum}/${totalBatch} berhasil (${batch.length} baris)`)
    }
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log(`✅  Berhasil : ${successCount} hikmah`)
  if (errorCount > 0) {
    console.log(`❌  Gagal    : ${errorCount} hikmah`)
  }
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('🎉  Seeding selesai!')
}

seed()