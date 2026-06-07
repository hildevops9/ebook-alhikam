import { useState, useEffect, useRef } from 'react'
import { BookOpen, MessageCircle, ChevronDown, Search, ExternalLink, HelpCircle, Star } from 'lucide-react'
import { supabase } from './lib/supabase'
import { hikamData } from './lib/hikamData'

const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSe3wsMIKoI5jb15TJA9T9ZmXCeiyNB6RWAxujazo0zzSG93AA/viewform?embedded=true'
const USE_MOCK = !import.meta.env.VITE_SUPABASE_URL

function HikamItem({ hikam, index }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="hikam-card"
      style={{ animationDelay: `${Math.min(index * 40, 400)}ms` }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="hikam-trigger"
        aria-expanded={open}
      >
        <div className="hikam-number">
          <span>{hikam.nomor}</span>
        </div>

        <p className="arabic-text hikam-preview">
          {hikam.arab}
        </p>

        <div className={`hikam-chevron ${open ? 'open' : ''}`}>
          <ChevronDown size={16} />
        </div>
      </button>

      {open && (
        <div className="hikam-body fade-in">
          {/* Arab besar */}
          <div className="arab-block">
            <p className="arabic-text arab-full">{hikam.arab}</p>
          </div>

          <div className="divider-ornament">
            <span className="ornament-line" />
            <span className="ornament-dot">✦</span>
            <span className="ornament-line" />
          </div>

          {/* Terjemahan */}
          <div className="content-section">
            <p className="section-label">Terjemahan</p>
            <p className="terjemahan-text">"{hikam.terjemahan}"</p>
          </div>

          {/* Penjelasan */}
          {hikam.penjelasan && (
            <div className="content-section">
              <p className="section-label">Penjelasan</p>
              <p className="penjelasan-text">{hikam.penjelasan}</p>
            </div>
          )}

          {/* Tags */}
          {hikam.tags?.length > 0 && (
            <div className="tags-row">
              {hikam.tags.map(tag => (
                <span key={tag} className="tag">#{tag}</span>
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
        h.penjelasan?.toLowerCase().includes(search.toLowerCase()) ||
        h.arab?.includes(search)
      )
    : hikamList

  return (
    <div className="tab-content">
      {/* Search */}
      <div className="search-wrap">
        <Search size={15} className="search-icon" />
        <input
          type="text"
          placeholder="Cari hikmah..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      <p className="count-label">
        {loading ? 'Memuat...' : `${filtered.length} hikmah`}
      </p>

      {loading ? (
        <div className="skeleton-list">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="skeleton-item" style={{ animationDelay: `${i * 80}ms` }} />
          ))}
        </div>
      ) : (
        <div className="hikam-list">
          {filtered.map((hikam, i) => (
            <HikamItem key={hikam.id} hikam={hikam} index={i} />
          ))}
        </div>
      )}
    </div>
  )
}

function TabTanyaUstad() {
  const [formLoaded, setFormLoaded] = useState(false)

  return (
    <div className="tab-content">
      <div className="info-banner">
        <HelpCircle size={16} className="info-icon" />
        <div>
          <p className="info-title">Cara Bertanya</p>
          <p className="info-desc">
            Isi formulir di bawah dengan pertanyaan seputar Kitab Al-Hikam. Ustadz akan menjawab secepatnya.
          </p>
        </div>
      </div>

      <div className="form-card">
        <div className="form-topbar">
          <div className="form-status">
            <span className="status-dot" />
            <span>Formulir Pertanyaan</span>
          </div>
          <a
            href={GOOGLE_FORM_URL.replace('?embedded=true', '')}
            target="_blank"
            rel="noopener noreferrer"
            className="form-external"
          >
            Buka di tab baru <ExternalLink size={11} />
          </a>
        </div>

        {!formLoaded && (
          <div className="form-loading">
            <div className="spinner" />
            <p>Memuat formulir...</p>
          </div>
        )}

        <iframe
          src={GOOGLE_FORM_URL}
          title="Tanya Ustadz"
          onLoad={() => setFormLoaded(true)}
          className={`form-iframe ${formLoaded ? 'loaded' : ''}`}
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
    <div className="app-root">
      {/* Decorative background */}
      <div className="bg-pattern" aria-hidden="true" />

      {/* Header */}
      <header className="app-header">
        <div className="header-inner">
          <div className="brand">
            <div className="brand-icon">
              <img
  src="https://res.cloudinary.com/dikusbh82/image/upload/v1780838252/icon-512_z9jsil.png"
  alt="Al-Hikam"
  className="brand-icon"
  style={{ objectFit: 'cover' }}
/>
            </div>
            <div className="brand-text">
              <h1>Al-Hikam</h1>
              <p>Inspirasi Hikmah Ibnu'Athaillah As-Sakandari</p>
            </div>
          </div>

          {/* Tabs */}
          <nav className="tab-nav">
            <button
              onClick={() => setActiveTab('materi')}
              className={`tab-btn ${activeTab === 'materi' ? 'active' : ''}`}
            >
              <BookOpen size={15} />
              Materi
            </button>
            <button
              onClick={() => setActiveTab('tanya')}
              className={`tab-btn ${activeTab === 'tanya' ? 'active' : ''}`}
            >
              <MessageCircle size={15} />
              Tanya Ustadz
            </button>
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="app-main">
        {activeTab === 'materi' ? <TabMateri /> : <TabTanyaUstad />}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p className="arabic-text footer-arabic">وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ</p>
        <p className="footer-sub">Ibnu Athaillah As-Sakandari · Al-Hikam</p>
      </footer>
    </div>
  )
}