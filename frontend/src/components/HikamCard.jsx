import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

export default function HikamCard({ hikam, compact = false }) {
  return (
    <Link
      to={`/kitab/${hikam.id}`}
      className="group block bg-white rounded-2xl border border-sand-200 overflow-hidden card-hover"
    >
      {/* Nomor badge */}
      <div className="flex items-start gap-4 p-5 sm:p-6">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-sand-400 to-sand-600 flex items-center justify-center shadow-sm">
          <span className="text-white font-display font-semibold text-sm">{hikam.nomor}</span>
        </div>

        <div className="flex-1 min-w-0">
          {/* Bab label */}
          <div className="text-xs font-sans text-sand-500 font-medium uppercase tracking-wider mb-2">
            {hikam.bab}
          </div>

          {/* Teks Arab */}
          <p className="arabic-text text-xl sm:text-2xl text-ink-800 font-arabic mb-3 leading-relaxed">
            {hikam.arab}
          </p>

          {/* Divider ornament */}
          <div className="flex items-center gap-2 my-3">
            <div className="flex-1 h-px bg-gradient-to-r from-sand-200 to-sand-100" />
            <span className="text-sand-400 text-xs">✦</span>
            <div className="flex-1 h-px bg-gradient-to-l from-sand-200 to-sand-100" />
          </div>

          {/* Terjemahan */}
          <p className="font-body text-ink-600 text-sm sm:text-base italic leading-relaxed line-clamp-2">
            "{hikam.terjemahan}"
          </p>

          {!compact && hikam.penjelasan && (
            <p className="mt-2 font-sans text-ink-500 text-xs sm:text-sm leading-relaxed line-clamp-2">
              {hikam.penjelasan}
            </p>
          )}
        </div>

        <ChevronRight
          size={18}
          className="flex-shrink-0 text-sand-300 group-hover:text-sand-500 group-hover:translate-x-0.5 transition-all mt-1"
        />
      </div>

      {/* Tags */}
      {hikam.tags && hikam.tags.length > 0 && (
        <div className="px-5 sm:px-6 pb-4 flex flex-wrap gap-1.5">
          {hikam.tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="text-xs font-sans px-2.5 py-0.5 rounded-full bg-sand-50 text-sand-600 border border-sand-200"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  )
}
