import { Router } from 'express'
import { createClient } from '@supabase/supabase-js'

const router = Router()

const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_KEY || ''
)

// GET /api/hikam - list dengan filter & pagination
router.get('/', async (req, res) => {
  try {
    const { bab_id, search, page = 1, limit = 10 } = req.query
    const pageNum = Math.max(1, parseInt(page))
    const limitNum = Math.min(50, Math.max(1, parseInt(limit)))
    const offset = (pageNum - 1) * limitNum

    let query = supabase
      .from('hikam')
      .select('id, nomor, bab, arab, latin, terjemahan, tags', { count: 'exact' })
      .order('nomor')
      .range(offset, offset + limitNum - 1)

    if (bab_id) query = query.eq('bab_id', bab_id)
    if (search) query = query.or(`terjemahan.ilike.%${search}%,penjelasan.ilike.%${search}%`)

    const { data, error, count } = await query
    if (error) throw error

    res.json({
      data,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: count,
        totalPages: Math.ceil(count / limitNum)
      }
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET /api/hikam/:id - detail satu hikam
router.get('/:id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('hikam')
      .select('*')
      .eq('id', req.params.id)
      .single()

    if (error) throw error
    if (!data) return res.status(404).json({ error: 'Hikam tidak ditemukan' })

    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET /api/hikam/bab/list - list semua bab
router.get('/bab/list', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('bab')
      .select('*')
      .order('urutan')

    if (error) throw error
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
