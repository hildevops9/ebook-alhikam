import { useState } from 'react'
import { MessageCircle, ExternalLink, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react'

// 🔧 GANTI URL INI dengan link Google Form lo
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/GANTI_DENGAN_ID_FORM_LO/viewform?embedded=true'

const FAQ = [
  {
    q: 'Berapa lama jawaban akan dikirim?',
    a: 'Ustadz kami akan berusaha menjawab dalam 1–3 hari kerja via email atau media yang Anda cantumkan.'
  },
  {
    q: 'Pertanyaan apa saja yang bisa ditanyakan?',
    a: 'Pertanyaan seputar isi Kitab Al-Hikam, makna hikmah, penerapan dalam kehidupan sehari-hari, dan topik tasawuf lainnya.'
  },
  {
    q: 'Apakah pertanyaan saya dijawab secara publik?',
    a: 'Tidak. Jawaban dikirim langsung ke Anda secara pribadi, kecuali Anda mengizinkan untuk dipublikasikan.'
  },
]

function FaqItem({ item }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-sand-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3.5 text-left bg-white hover:bg-sand-50 transition-colors"
      >
        <span className="font-sans text-sm font-medium text-ink-700">{item.q}</span>
        {open
          ? <ChevronUp size={16} className="text-sand-400 flex-shrink-0" />
          : <ChevronDown size={16} className="text-sand-400 flex-shrink-0" />
        }
      </button>
      {open && (
        <div className="px-4 pb-4 bg-sand-50 border-t border-sand-100">
          <p className="font-body text-sm text-ink-500 leading-relaxed pt-3">{item.a}</p>
        </div>
      )}
    </div>
  )
}

export default function TanyaUstadz() {
  const [formLoaded, setFormLoaded] = useState(false)

  return (
    <div className="page-enter max-w-3xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-full bg-sand-500/20 flex items-center justify-center">
            <MessageCircle size={16} className="text-sand-600" />
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink-800">Tanya Ustadz</h1>
        </div>
        <p className="font-sans text-ink-400 text-sm">
          Punya pertanyaan tentang Kitab Al-Hikam? Kirimkan langsung kepada ustadz kami.
        </p>
      </div>

      {/* Info card */}
      <div className="bg-gradient-to-r from-sand-100 to-sand-50 border border-sand-200 rounded-2xl p-5 mb-6 flex gap-4">
        <div className="w-10 h-10 rounded-full bg-sand-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
          <HelpCircle size={18} className="text-sand-600" />
        </div>
        <div>
          <p className="font-sans text-sm font-semibold text-ink-700 mb-1">Cara Bertanya</p>
          <p className="font-body text-xs text-ink-500 leading-relaxed">
            Isi formulir di bawah ini dengan pertanyaan Anda seputar Kitab Al-Hikam. Sertakan nomor hikmah bila pertanyaan berkaitan dengan hikmah tertentu. Ustadz akan menjawab pertanyaan Anda secepatnya.
          </p>
        </div>
      </div>

      {/* Google Form Embed */}
      <div className="bg-white rounded-2xl border border-sand-200 overflow-hidden shadow-sm mb-6">
        {/* Form header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-sand-100 bg-sand-50">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400" />
            <span className="font-sans text-xs text-ink-500 font-medium">Formulir Pertanyaan</span>
          </div>
          <a
            href={GOOGLE_FORM_URL.replace('?embedded=true', '')}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 font-sans text-xs text-sand-500 hover:text-sand-700 transition-colors"
          >
            Buka di tab baru <ExternalLink size={11} />
          </a>
        </div>

        {/* Loading state */}
        {!formLoaded && (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <div className="w-10 h-10 rounded-full border-4 border-sand-200 border-t-sand-500 animate-spin" />
            <p className="font-sans text-sm text-sand-400">Memuat formulir...</p>
          </div>
        )}

        {/* iFrame */}
        <iframe
          src={GOOGLE_FORM_URL}
          title="Formulir Tanya Ustadz"
          onLoad={() => setFormLoaded(true)}
          className={`w-full transition-opacity duration-300 ${formLoaded ? 'opacity-100' : 'opacity-0 h-0'}`}
          style={{ height: formLoaded ? '720px' : '0' }}
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
        >
          Memuat...
        </iframe>
      </div>

      {/* FAQ */}
      <div>
        <h2 className="font-display text-xl font-semibold text-ink-800 mb-4">Pertanyaan Umum</h2>
        <div className="space-y-2">
          {FAQ.map((item, i) => (
            <FaqItem key={i} item={item} />
          ))}
        </div>
      </div>
    </div>
  )
}
