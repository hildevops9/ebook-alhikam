import { useState } from 'react'
import { Search, BookOpen, SlidersHorizontal, X } from 'lucide-react'
import HikamCard from '../components/HikamCard'
import { HikamSkeleton } from '../components/Skeleton'
import { useHikam, useBab } from '../hooks/useHikam'

export default function Kitab() {
  const [search, setSearch] = useState('')
  const [activeBab, setActiveBab] = useState(null)
  const [showFilter, setShowFilter] = useState(false)
  const [page, setPage] = useState(1)

  const { data: hikamList, loading, totalPages } = useHikam({
    babId: activeBab,
    search: search || undefined,
    page,
    limit: 8,
  })
  const { data: babList } = useBab()

  const handleSearch = (val) => {
    setSearch(val)
    setPage(1)
  }

  const handleBab = (id) => {
    setActiveBab(id === activeBab ? null : id)
    setPage(1)
  }

  return (
    <div className="page-enter max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-full bg-sand-500/20 flex items-center justify-center">
            <BookOpen size={16} className="text-sand-600" />
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink-800">Kitab Al-Hikam</h1>
        </div>
        <p className="font-sans text-ink-400 text-sm">
          264 Hikmah karya Ibnu Athaillah As-Sakandari
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex gap-3 mb-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sand-400" />
          <input
            type="text"
            placeholder="Cari hikmah, kata kunci..."
            value={search}
            onChange={e => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-sand-200 rounded-xl font-sans text-sm text-ink-700 placeholder-sand-300 focus:outline-none focus:border-sand-400 focus:ring-2 focus:ring-sand-200 transition-all"
          />
          {search && (
            <button onClick={() => handleSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-sand-400 hover:text-sand-600">
              <X size={14} />
            </button>
          )}
        </div>
        <button
          onClick={() => setShowFilter(!showFilter)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border font-sans text-sm font-medium transition-all ${
            activeBab ? 'bg-sand-500 text-white border-sand-500' : 'bg-white text-ink-600 border-sand-200 hover:border-sand-400'
          }`}
        >
          <SlidersHorizontal size={15} />
          <span className="hidden sm:inline">Bab</span>
          {activeBab && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
        </button>
      </div>

      {/* Bab Filter */}
      {showFilter && (
        <div className="mb-5 p-4 bg-white rounded-2xl border border-sand-200 animate-fade-in">
          <p className="font-sans text-xs text-sand-400 uppercase tracking-wider mb-3">Filter berdasarkan Bab</p>
          <div className="flex flex-wrap gap-2">
            {babList.map(bab => (
              <button
                key={bab.id}
                onClick={() => handleBab(bab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-sans font-medium transition-all ${
                  activeBab === bab.id
                    ? 'bg-sand-500 text-white'
                    : 'bg-sand-50 text-ink-600 hover:bg-sand-100 border border-sand-200'
                }`}
              >
                {bab.nama}
              </button>
            ))}
          </div>
          {activeBab && (
            <button
              onClick={() => setActiveBab(null)}
              className="mt-2 text-xs font-sans text-sand-400 hover:text-sand-600 flex items-center gap-1"
            >
              <X size={12} /> Hapus filter
            </button>
          )}
        </div>
      )}

      {/* Results info */}
      {search && (
        <p className="font-sans text-sm text-ink-400 mb-4">
          Hasil pencarian untuk "<span className="text-ink-700 font-medium">{search}</span>"
          {!loading && ` · ${hikamList.length} hikmah ditemukan`}
        </p>
      )}

      {/* Hikam List */}
      <div className="space-y-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <HikamSkeleton key={i} />)
        ) : hikamList.length === 0 ? (
          <div className="text-center py-16">
            <p className="font-arabic text-4xl text-sand-300 mb-3">لا نتائج</p>
            <p className="font-sans text-ink-400">Tidak ada hikmah yang ditemukan</p>
          </div>
        ) : (
          hikamList.map(hikam => <HikamCard key={hikam.id} hikam={hikam} />)
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
            className="px-4 py-2 rounded-lg font-sans text-sm border border-sand-200 disabled:opacity-40 hover:bg-sand-50 transition-colors"
          >
            ← Sebelumnya
          </button>
          <span className="font-sans text-sm text-ink-400 px-4">
            {page} / {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(p => p + 1)}
            className="px-4 py-2 rounded-lg font-sans text-sm border border-sand-200 disabled:opacity-40 hover:bg-sand-50 transition-colors"
          >
            Berikutnya →
          </button>
        </div>
      )}
    </div>
  )
}
