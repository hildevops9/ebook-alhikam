import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { hikamData, babList } from '../lib/hikamData'

const USE_MOCK = !import.meta.env.VITE_SUPABASE_URL

export function useHikam({ babId, search, page = 1, limit = 10 } = {}) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        if (USE_MOCK) {
          let filtered = [...hikamData]
          if (babId) filtered = filtered.filter(h => h.bab === babList.find(b => b.id === babId)?.nama)
          if (search) {
            const q = search.toLowerCase()
            filtered = filtered.filter(h =>
              h.terjemahan.toLowerCase().includes(q) ||
              h.penjelasan.toLowerCase().includes(q) ||
              h.tags?.some(t => t.includes(q))
            )
          }
          setTotal(filtered.length)
          setData(filtered.slice((page - 1) * limit, page * limit))
        } else {
          let query = supabase.from('hikam').select('*', { count: 'exact' })
          if (babId) query = query.eq('bab_id', babId)
          if (search) query = query.or(`terjemahan.ilike.%${search}%,penjelasan.ilike.%${search}%`)
          query = query.range((page - 1) * limit, page * limit - 1).order('nomor')
          const { data: rows, error: err, count } = await query
          if (err) throw err
          setData(rows)
          setTotal(count)
        }
      } catch (err) {
        setError(err.message)
        setData(hikamData) // fallback to mock
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [babId, search, page, limit])

  return { data, loading, error, total, totalPages: Math.ceil(total / limit) }
}

export function useHikamById(id) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    const fetchOne = async () => {
      setLoading(true)
      try {
        if (USE_MOCK) {
          setData(hikamData.find(h => h.id === Number(id)) || null)
        } else {
          const { data: row } = await supabase.from('hikam').select('*').eq('id', id).single()
          setData(row)
        }
      } finally {
        setLoading(false)
      }
    }
    fetchOne()
  }, [id])

  return { data, loading }
}

export function useBab() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBab = async () => {
      setLoading(true)
      try {
        if (USE_MOCK) {
          setData(babList)
        } else {
          const { data: rows } = await supabase.from('bab').select('*').order('urutan')
          setData(rows || [])
        }
      } finally {
        setLoading(false)
      }
    }
    fetchBab()
  }, [])

  return { data, loading }
}
