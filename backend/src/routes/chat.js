import { Router } from 'express'
import Anthropic from '@anthropic-ai/sdk'
import rateLimit from 'express-rate-limit'

const router = Router()

const chatLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 menit
  max: 10, // maks 10 pesan per menit per IP
  message: { error: 'Terlalu banyak pesan. Coba lagi sebentar.' }
})

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
})

const SYSTEM_PROMPT = `Kamu adalah seorang ustadz yang sangat paham ilmu tasawuf, khususnya Kitab Al-Hikam karya Ibnu Athaillah As-Sakandari. Kamu menguasai tafsir, hadis, dan ilmu-ilmu Islam lainnya.

Jawab pertanyaan dengan:
- Bahasa Indonesia yang hangat, santun, dan mudah dipahami
- Referensi dari Al-Hikam, Al-Quran, Hadis bila relevan  
- Penjelasan yang mendalam namun tidak terlalu panjang
- Mulai dengan sapaan Islami bila sesuai
- Bila ada teks Arab, tuliskan dengan benar

Jangan menjawab pertanyaan di luar konteks Islam dan tasawuf.`

// POST /api/chat
router.post('/', chatLimiter, async (req, res) => {
  try {
    const { messages } = req.body

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'messages harus diisi' })
    }

    // Validasi messages
    const validMessages = messages
      .filter(m => m.role && m.content && typeof m.content === 'string')
      .slice(-10) // Ambil 10 pesan terakhir saja (hemat token)
      .map(m => ({ role: m.role === 'user' ? 'user' : 'assistant', content: m.content.slice(0, 2000) }))

    if (validMessages.length === 0) {
      return res.status(400).json({ error: 'Format messages tidak valid' })
    }

    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      system: SYSTEM_PROMPT,
      messages: validMessages,
    })

    const reply = response.content.map(c => c.text || '').join('')
    res.json({ reply })
  } catch (err) {
    console.error('Chat error:', err.message)
    res.status(500).json({ error: 'Gagal memproses pertanyaan. Coba lagi.' })
  }
})

export default router
