import { useState, useEffect, useRef } from 'react'
import { BookOpen, MessageCircle, ChevronDown, Search, ExternalLink, HelpCircle, Star } from 'lucide-react'
import { supabase } from './lib/supabase'
import { hikamData } from './lib/hikamData'

const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSe3wsMIKoI5jb15TJA9T9ZmXCeiyNB6RWAxujazo0zzSG93AA/viewform?embedded=true'
const USE_MOCK = !import.meta.env.VITE_SUPABASE_URL
const TITLE_MAP = {
  1: 'Bersandar Pada Allah Jangan Pada Amal',
  2: 'Tajrid dan Kasab',
  3: 'Kekuatan Takdir',
  4: 'Mengistirahatkan Diri Dari Keinginan Mengatur',
  5: 'Mata Hati Yang Buta',
  6: 'Allah Yang Menjamin Terkabulnya Doa',
  7: 'Keraguan Akan Mematikan Cahaya Hati',
  8: 'Amal, Berserah Diri, dan Ma’rifat',
  9: 'Amal, Ahwal, dan Warid',
  10: 'Cahaya Ikhlas',
  11: 'Kuburlah Eksistensimu',
  12: 'Uzlah dan Tafakur',
  13: 'Hati yang Ingin Bercahaya',
  14: 'Alam Menjadi Terang Karena Allah',
  15: 'Hijab Dari Yang Maha Nyata',
  16: 'Jangan Menunggu Dunia Menjadi Tenang',
  17: 'Dunia Memang Tempat Ujian',
  18: 'Memohon Dengan Allah, Bukan Dengan Diri',
  19: 'Keberhasilan Berawal Dari Tawakal',
  20: 'Awal Yang Baik, Akhir Yang Baik',
  21: 'Rahasia Hati Akan Tampak',
  22: 'Nafas Dalam Genggaman Takdir',
  23: 'Muraqabah Di Tengah Kesibukan',
  24: 'Jangan Heran Dengan Kesulitan Dunia',
  25: 'Ketergantungan Menentukan Hasil',
  26: 'Tawakal Sejak Permulaan',
  27: 'Cahaya Awal Menentukan Akhir',
  28: 'Rahasia Batin Menjelma Dalam Perbuatan',
  29: 'Allah Tidak Memerlukan Bukti',
  30: 'Yang Nyata Tidak Membutuhkan Dalil',
  31: 'Sedekah Sesuai Keadaan',
  32: 'Cahaya Perjalanan dan Cahaya Kedekatan',
  33: 'Mengoreksi Diri Lebih Penting',
  34: 'Allah Tidak Pernah Terhijab',
  35: 'Keluar Dari Sifat-Sifat Nafsu',
  36: 'Bahaya Ridha Terhadap Nafsu',
  37: 'Tingkatan Penyaksian Hati',
  38: 'Allah Tetap Sebagaimana Adanya',
  39: 'Jangan Bercita-Cita Selain Allah',
  40: 'Hanya Allah Tempat Meminta',
  41: 'Berbaik Sangka Kepada Allah',
  42: 'Jangan Lari Dari Allah',
  43: 'Hijrah Dari Makhluk Kepada Sang Pencipta',
  44: 'Pilih Sahabat Yang Mengingatkan Allah',
  45: 'Lingkungan Membentuk Pandangan',
  46: 'Nilai Amal Ada Pada Hatinya',
  47: 'Amal Lahir Dari Keadaan Batin',
  48: 'Jangan Tinggalkan Dzikir',
  49: 'Tanda Kematian Hati',
  50: 'Jangan Putus Asa Karena Dosa',
  51: 'Karunia Allah Lebih Besar Dari Dosamu',
  52: 'Amal Yang Tersembunyi Lebih Selamat',
  53: 'Warid Untuk Mendekat Kepada Allah',
  54: 'Merdeka Dari Belenggu Dunia',
  55: 'Keluar Dari Penjara Diri',
  56: 'Cahaya Kendaraan Ruhani',
  57: 'Cahaya Adalah Tentara Hati',
  58: 'Fungsi Cahaya dan Bashirah',
  59: 'Bergembira Karena Karunia Allah',
  60: 'Lupakan Amal, Pandang Allah',
  61: 'Ketamakan Melahirkan Kehinaan',
  62: 'Angan-Angan Adalah Jerat',
  63: 'Budak Dari Apa Yang Diinginkan',
  64: 'Ditarik Kepada Allah Dengan Nikmat atau Ujian',
  65: 'Syukur Menjaga Nikmat',
  66: 'Takutlah Terhadap Istidraj',
  67: 'Hukuman Tidak Selalu Terlihat',
  68: 'Jangan Meremehkan Ahli Wirid',
  69: 'Manusia Memiliki Jalan Yang Berbeda',
  70: 'Karunia Allah Datang Tanpa Klaim',
  71: 'Terlalu Banyak Bicara Tanda Kejahilan',
  72: 'Dunia Bukan Tempat Balasan',
  73: 'Buah Amal Sebelum Akhirat',
  74: 'Lihat Di Mana Allah Menempatkanmu',
  75: 'Nikmat Terbesar Adalah Ketaatan',
  76: 'Mintalah Apa Yang Allah Minta Darimu',
  77: 'Sedih Tanpa Bergerak Adalah Tipuan',
  78: 'Fana Dalam Penyaksian',
  79: 'Harapan Harus Disertai Amal',
  80: 'Hakikat Ubudiyah',
  81: 'Lapang dan Sempit Adalah Pendidikan Allah',
}
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

        <div className="hikam-content">
          {TITLE_MAP[hikam.nomor] && (
            <div className="hikam-title">
              {TITLE_MAP[hikam.nomor]}
            </div>
          )}

          <p className="arabic-text hikam-preview">
            {hikam.arab}
          </p>
        </div>

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
  ? hikamList.filter(h => {
      const keyword = search.toLowerCase().trim()

      const nomorMatch =
        !isNaN(keyword) &&
        Number(keyword) === h.nomor

      const titleMatch =
        TITLE_MAP[h.nomor]
          ?.toLowerCase()
          .includes(keyword)

      const terjemahanMatch =
        h.terjemahan
          ?.toLowerCase()
          .includes(keyword)

      const penjelasanMatch =
        h.penjelasan
          ?.toLowerCase()
          .includes(keyword)

      const arabMatch =
        h.arab?.includes(search)

      return (
        nomorMatch ||
        titleMatch ||
        terjemahanMatch ||
        penjelasanMatch ||
        arabMatch
      )
    })
  : hikamList

  return (
    <div className="tab-content">
      {/* Sticky search area */}
      <div className="search-sticky">
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
      </div>

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