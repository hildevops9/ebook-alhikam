import { useState, useEffect } from 'react'
import { BookOpen, MessageCircle, ChevronDown, ChevronUp, Search, ExternalLink, HelpCircle } from 'lucide-react'
import { supabase } from './lib/supabase'
import { hikamData } from './lib/hikamData'

const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSe3wsMIKoI5jb15TJA9T9ZmXCeiyNB6RWAxujazo0zzSG93AA/viewform?embedded=true'

const USE_MOCK = !import.meta.env.VITE_SUPABASE_URL

function HikamItem({ hikam }) {
  const [open, setOpen] = useState(false)

  return (
    <div className={`border border-sand-200 rounded-2xl overflow-hidden transition-all ${open ? 'shadow-md' : 'shadow-sm'}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 px-5 py-4 bg-white hover:bg-sand-50 transition-colors text-left"
      >
        <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-sand-400 to-sand-600 flex items-center justify-center">
          <span className="text-white font-display font-semibold text-sm">{hikam.nomor}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="arabic-text text-lg text-ink-800 leading-relaxed truncate">
            {hikam.arab}
          </p>
        </div>
        <div className="flex-shrink-0 text-sand-400">
          {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </button>

      {open && (
        <div className="border-t border-sand-100 bg-sand-50/60 px-5 py-5 space-y-4 fade-in">
          <p className="arabic-text text-2xl text-ink-800 leading-loose">{hikam.arab}</p>

          {hikam.latin && (
            <p className="font-sans text-xs text-sand-500 italic">{hikam.latin}</p>
          )}

          <div className="flex items-center gap-2">
            <div className="flex-1 h-px bg-sand-200" />
            <span className="text-sand-400 text-xs">✦</span>
            <div className="flex-1 h-px bg-sand-200" />
          </div>

          <div>
            <p className="font-sans text-xs text-sand-400 uppercase tracking-wider mb-1.5">Terjemahan</p>
            <p className="font-body italic text-ink-700 leading-relaxed">"{hikam.terjemahan}"</p>
          </div>

          {hikam.penjelasan && (
            <div>
              <p className="font-sans text-xs text-sand-400 uppercase tracking-wider mb-1.5">Penjelasan</p>
              <p className="font-body text-ink-600 text-sm leading-relaxed">{hikam.penjelasan}</p>
            </div>
          )}

          {hikam.tags?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {hikam.tags.map(tag => (
                <span key={tag} className="text-xs font-sans px-2.5 py-0.5 rounded-full bg-white border border-sand-200 text-sand-600">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function TabMateri() {
  const [hikamList, setHikamList] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        if (USE_MOCK) {
          setHikamList(hikamData)
        } else {
          const { data } = await supabase.from('hikam').select('*').order('nomor')
          setHikamList(data?.length ? data : hikamData)
        }
      } catch {
        setHikamList(hikamData)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const filtered = search
    ? hikamList.filter(h =>
        h.terjemahan?.toLowerCase().includes(search.toLowerCase()) ||
        h.penjelasan?.toLowerCase().includes(search.toLowerCase())
      )
    : hikamList

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sand-400" />
        <input
          type="text"
          placeholder="Cari hikmah..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-sand-200 rounded-xl font-sans text-sm text-ink-700 placeholder-sand-300 focus:outline-none focus:border-sand-400 focus:ring-2 focus:ring-sand-100 transition-all"
        />
      </div>

      <p className="font-sans text-xs text-sand-400">
        {loading ? 'Memuat...' : `${filtered.length} hikmah`}
      </p>

      {loading ? (
        <div className="space-y-3">
          {[1,2,3].map(i => (
            <div key={i} className="h-16 bg-white rounded-2xl border border-sand-200 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(hikam => <HikamItem key={hikam.id} hikam={hikam} />)}
        </div>
      )}
    </div>
  )
}

function TabTanyaUstadz() {
  const [formLoaded, setFormLoaded] = useState(false)

  return (
    <div className="space-y-4">
      <div className="bg-sand-100 border border-sand-200 rounded-2xl p-4 flex gap-3">
        <HelpCircle size={18} className="text-sand-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-sans text-sm font-semibold text-ink-700 mb-0.5">Cara Bertanya</p>
          <p className="font-sans text-xs text-ink-500 leading-relaxed">
            Isi formulir di bawah dengan pertanyaan seputar Kitab Al-Hikam. Ustadz akan menjawab secepatnya.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-sand-200 overflow-hidden shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 border-b border-sand-100 bg-sand-50">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400" />
            <span className="font-sans text-xs text-ink-500 font-medium">Formulir Pertanyaan</span>
          </div>
          
           <a href={GOOGLE_FORM_URL.replace('?embedded=true', '')}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 font-sans text-xs text-sand-500 hover:text-sand-700"
          >
            Buka di tab baru <ExternalLink size={11} />
          </a>
        </div>

        {!formLoaded && (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <div className="w-8 h-8 rounded-full border-4 border-sand-200 border-t-sand-500 animate-spin" />
            <p className="font-sans text-sm text-sand-400">Memuat formulir...</p>
          </div>
        )}

        <iframe
          src={GOOGLE_FORM_URL}
          title="Tanya Ustadz"
          onLoad={() => setFormLoaded(true)}
          className={`w-full transition-opacity duration-300 ${formLoaded ? 'opacity-100' : 'opacity-0 h-0'}`}
          style={{ height: formLoaded ? '700px' : '0' }}
          frameBorder="0"
        />
      </div>
    </div>
  )
}

export default function App() {
  const [activeTab, setActiveTab] = useState('materi')

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 bg-sand-50/95 backdrop-blur-md border-b border-sand-200">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sand-400 to-sand-600 flex items-center justify-center shadow-md flex-shrink-0">
            <span className="text-white font-arabic text-lg leading-none">ح</span>
          </div>
          <div>
            <h1 className="font-display text-xl font-bold text-ink-800 leading-none">Al-Hikam</h1>
            <p className="font-sans text-xs text-sand-500 leading-none mt-0.5">Kitab Kebijaksanaan</p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 pb-3 flex gap-2">
          <button
            onClick={() => setActiveTab('materi')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-sans text-sm font-semibold transition-all ${
              activeTab === 'materi'
                ? 'bg-sand-500 text-white shadow-sm'
                : 'bg-white text-ink-500 border border-sand-200 hover:border-sand-300'
            }`}
          >
            <BookOpen size={16} />
            Materi
          </button>
          <button
            onClick={() => setActiveTab('tanya')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-sans text-sm font-semibold transition-all ${
              activeTab === 'tanya'
                ? 'bg-sand-500 text-white shadow-sm'
                : 'bg-white text-ink-500 border border-sand-200 hover:border-sand-300'
            }`}
          >
            <MessageCircle size={16} />
            Tanya Ustadz
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        {activeTab === 'materi' ? <TabMateri /> : <TabTanyaUstadz />}
      </main>

      <footer className="max-w-2xl mx-auto px-4 py-8 text-center border-t border-sand-100 mt-4">
        <p className="font-arabic text-lg text-sand-400">وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ</p>
        <p className="font-sans text-xs text-sand-300 mt-1">Al-Hikam · Ibnu Athaillah As-Sakandari</p>
      </footer>
    </div>
  )
}