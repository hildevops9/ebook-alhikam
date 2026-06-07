import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, BookOpen, Share2, MessageCircle } from 'lucide-react'
import { useHikamById } from '../hooks/useHikam'
import { hikamData } from '../lib/hikamData'
import { PageLoader } from '../components/Skeleton'

export default function HikamDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: hikam, loading } = useHikamById(id)

  const currentIndex = hikamData.findIndex(h => h.id === Number(id))
  const prevHikam = hikamData[currentIndex - 1]
  const nextHikam = hikamData[currentIndex + 1]

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Al-Hikam #${hikam.nomor}`,
        text: hikam.terjemahan,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  if (loading) return <PageLoader />
  if (!hikam) return (
    <div className="text-center py-20">
      <p className="font-display text-2xl text-ink-500">Hikmah tidak ditemukan</p>
      <Link to="/kitab" className="mt-4 inline-block font-sans text-sand-500 hover:underline">← Kembali ke Kitab</Link>
    </div>
  )

  return (
    <div className="page-enter max-w-3xl mx-auto px-4 sm:px-6 py-8">
      {/* Back */}
      <Link
        to="/kitab"
        className="inline-flex items-center gap-2 text-sand-500 hover:text-sand-700 font-sans text-sm mb-8 transition-colors"
      >
        <ArrowLeft size={16} /> Kembali ke Kitab
      </Link>

      {/* Main Card */}
      <article className="bg-white rounded-3xl border border-sand-200 overflow-hidden shadow-sm mb-6">
        {/* Header */}
        <div className="bg-gradient-to-br from-ink-800 to-ink-900 px-6 sm:px-8 pt-8 pb-10">
          <div className="flex items-center justify-between mb-6">
            <span className="inline-flex items-center gap-1.5 bg-sand-500/20 border border-sand-400/30 rounded-full px-3 py-1 font-sans text-xs text-sand-300">
              <BookOpen size={12} /> Hikmah ke-{hikam.nomor}
            </span>
            <button
              onClick={handleShare}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-sand-300 transition-colors"
            >
              <Share2 size={15} />
            </button>
          </div>

          {/* Arab text */}
          <p className="arabic-text text-2xl sm:text-3xl lg:text-4xl text-sand-100 font-arabic leading-loose mb-5">
            {hikam.arab}
          </p>

          {/* Latin */}
          <p className="font-sans text-xs text-sand-400 tracking-wide italic">
            {hikam.latin}
          </p>
        </div>

        {/* Body */}
        <div className="px-6 sm:px-8 py-8">
          {/* Bab */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-5 rounded-full bg-sand-400" />
            <span className="font-sans text-xs text-sand-500 uppercase tracking-wider font-medium">{hikam.bab}</span>
          </div>

          {/* Terjemahan */}
          <div className="mb-6 p-5 bg-sand-50 rounded-2xl border border-sand-100">
            <p className="font-display text-xs text-sand-400 uppercase tracking-wider mb-2">Terjemahan</p>
            <p className="font-body text-ink-700 text-base sm:text-lg italic leading-relaxed">
              "{hikam.terjemahan}"
            </p>
          </div>

          {/* Penjelasan */}
          <div className="mb-6">
            <div className="ornament mb-4">
              <span className="font-display text-sm text-sand-400">Penjelasan</span>
            </div>
            <p className="font-body text-ink-600 leading-relaxed text-sm sm:text-base">
              {hikam.penjelasan}
            </p>
          </div>

          {/* Tags */}
          {hikam.tags && (
            <div className="flex flex-wrap gap-2">
              {hikam.tags.map(tag => (
                <span
                  key={tag}
                  className="text-xs font-sans px-3 py-1 rounded-full bg-sand-50 text-sand-600 border border-sand-200"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>

      {/* Ask Ustadz CTA */}
      <div className="bg-gradient-to-r from-sand-100 to-sand-50 rounded-2xl border border-sand-200 p-5 mb-6 flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-sand-500/20 flex items-center justify-center flex-shrink-0">
          <MessageCircle size={18} className="text-sand-600" />
        </div>
        <div className="flex-1">
          <p className="font-sans text-sm font-semibold text-ink-700 mb-0.5">Punya pertanyaan tentang hikmah ini?</p>
          <p className="font-sans text-xs text-ink-400">Tanyakan langsung kepada ustadz kami</p>
        </div>
        <Link
          to={`/tanya-ustadz?hikam=${hikam.nomor}`}
          className="flex-shrink-0 bg-sand-500 hover:bg-sand-600 text-white px-4 py-2 rounded-xl font-sans text-xs font-semibold transition-colors"
        >
          Tanya
        </Link>
      </div>

      {/* Navigation */}
      <div className="grid grid-cols-2 gap-4">
        {prevHikam ? (
          <Link
            to={`/kitab/${prevHikam.id}`}
            className="group flex items-center gap-3 p-4 bg-white rounded-xl border border-sand-200 hover:border-sand-300 transition-all"
          >
            <ArrowLeft size={18} className="text-sand-400 group-hover:text-sand-600 flex-shrink-0" />
            <div className="min-w-0">
              <p className="font-sans text-xs text-sand-400 mb-0.5">Sebelumnya</p>
              <p className="font-display text-sm text-ink-700 truncate">Hikmah #{prevHikam.nomor}</p>
            </div>
          </Link>
        ) : <div />}

        {nextHikam ? (
          <Link
            to={`/kitab/${nextHikam.id}`}
            className="group flex items-center justify-end gap-3 p-4 bg-white rounded-xl border border-sand-200 hover:border-sand-300 transition-all"
          >
            <div className="text-right min-w-0">
              <p className="font-sans text-xs text-sand-400 mb-0.5">Berikutnya</p>
              <p className="font-display text-sm text-ink-700 truncate">Hikmah #{nextHikam.nomor}</p>
            </div>
            <ArrowRight size={18} className="text-sand-400 group-hover:text-sand-600 flex-shrink-0" />
          </Link>
        ) : <div />}
      </div>
    </div>
  )
}
