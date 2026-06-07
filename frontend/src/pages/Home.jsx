import { Link } from 'react-router-dom'
import { BookOpen, MessageCircle, Star, ArrowRight } from 'lucide-react'
import { hikamData } from '../lib/hikamData'

export default function Home() {
  const featuredHikam = hikamData[0]

  return (
    <div className="page-enter">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-16 sm:pt-20 sm:pb-24">
          {/* Bismillah */}
          <div className="text-center mb-8">
            <p className="arabic-text text-3xl sm:text-4xl text-sand-600 font-arabic font-semibold mb-2">
              بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
            </p>
            <p className="font-sans text-xs text-sand-400 tracking-widest uppercase">Bismillahirrahmanirrahim</p>
          </div>

          {/* Title */}
          <div className="text-center mb-6">
            <h1 className="font-display text-5xl sm:text-7xl font-bold text-ink-800 leading-tight mb-2">
              Al-Hikam
            </h1>
            <div className="ornament mb-4">
              <span className="font-display text-lg text-sand-500 italic">Kitab Kebijaksanaan</span>
            </div>
            <p className="font-sans text-ink-500 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
              Karya agung Syaikh Ibnu Athaillah As-Sakandari — kumpulan hikmah dan nasihat spiritual yang telah menuntun jutaan jiwa menuju kedekatan dengan Allah.
            </p>
          </div>

          {/* Author badge */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex items-center gap-2 bg-sand-100 border border-sand-200 rounded-full px-4 py-2">
              <Star size={14} className="text-sand-500 fill-sand-400" />
              <span className="font-sans text-xs text-ink-600">Ibn 'Athā'illāh al-Iskandarī • ابن عطاء الله السكندري</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/kitab"
              className="group flex items-center gap-3 bg-sand-500 hover:bg-sand-600 text-white px-6 py-3.5 rounded-xl font-sans font-semibold text-sm shadow-lg shadow-sand-500/30 hover:shadow-sand-600/40 transition-all"
            >
              <BookOpen size={18} />
              Baca Kitab Al-Hikam
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to="/tanya-ustadz"
              className="flex items-center gap-3 bg-white hover:bg-sand-50 text-ink-700 px-6 py-3.5 rounded-xl font-sans font-semibold text-sm border border-sand-200 shadow-sm transition-all"
            >
              <MessageCircle size={18} className="text-sand-500" />
              Tanya Ustadz
            </Link>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-10 right-10 opacity-10 pointer-events-none hidden lg:block">
          <p className="font-arabic text-9xl text-sand-500 rotate-12">الحكم</p>
        </div>
      </section>

      {/* Featured Hikam */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-2xl font-semibold text-ink-800">Hikmah Pertama</h2>
          <Link to="/kitab" className="font-sans text-sm text-sand-500 hover:text-sand-700 flex items-center gap-1">
            Lihat semua <ArrowRight size={14} />
          </Link>
        </div>

        <Link
          to={`/kitab/${featuredHikam.id}`}
          className="block group bg-gradient-to-br from-ink-800 to-ink-900 rounded-3xl p-6 sm:p-8 lg:p-10 overflow-hidden relative"
        >
          {/* Decorative */}
          <div className="absolute top-0 right-0 w-48 h-48 opacity-10">
            <div className="w-full h-full rounded-full bg-sand-400 blur-3xl" />
          </div>

          <div className="relative">
            <div className="inline-flex items-center gap-2 bg-sand-500/20 border border-sand-400/30 rounded-full px-3 py-1 mb-5">
              <span className="font-sans text-xs text-sand-300">Hikmah ke-1</span>
            </div>

            <p className="arabic-text text-2xl sm:text-3xl lg:text-4xl text-sand-200 font-arabic leading-loose mb-6">
              {featuredHikam.arab}
            </p>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-px bg-sand-600/50" />
              <span className="text-sand-500 text-xs">✦</span>
              <div className="flex-1 h-px bg-sand-600/50" />
            </div>

            <p className="font-body text-sand-300 italic text-base sm:text-lg leading-relaxed mb-2">
              "{featuredHikam.terjemahan}"
            </p>

            <p className="font-sans text-xs text-sand-400 uppercase tracking-widest">
              {featuredHikam.latin}
            </p>

            <div className="mt-6 flex items-center gap-2 text-sand-400 text-sm font-sans">
              <span className="group-hover:text-sand-300 transition-colors">Baca penjelasan lengkap</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>
      </section>

      {/* Stats */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { angka: '264', label: 'Jumlah Hikmah' },
            { angka: '10', label: 'Bab Utama' },
            { angka: 'Abad 13', label: 'Ditulis Pada' },
            { angka: 'Mesir', label: 'Asal Pengarang' },
          ].map(item => (
            <div key={item.label} className="bg-white rounded-2xl border border-sand-200 p-5 text-center">
              <div className="font-display text-3xl font-semibold text-sand-600 mb-1">{item.angka}</div>
              <div className="font-sans text-xs text-ink-400 uppercase tracking-wider">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* About Al-Hikam */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div className="bg-white rounded-3xl border border-sand-200 p-6 sm:p-8 lg:p-10">
          <h2 className="font-display text-2xl font-semibold text-ink-800 mb-4">Tentang Kitab Al-Hikam</h2>
          <div className="ornament mb-6">
            <span className="text-sand-400 text-sm">✦</span>
          </div>
          <div className="space-y-4 font-body text-ink-600 leading-relaxed">
            <p>
              <em>Al-Hikam</em> (الحكم) adalah salah satu karya tasawuf paling agung dalam khazanah Islam. Kitab ini ditulis oleh <strong className="font-semibold text-ink-800">Syaikh Ibnu Athaillah As-Sakandari</strong> (wafat 709 H/1309 M), seorang ulama sufi besar dari Alexandria, Mesir.
            </p>
            <p>
              Kitab ini berisi 264 hikmah (aphorisme) singkat yang penuh makna mendalam tentang hubungan hamba dengan Allah, hakikat tawakkal, makna ikhlas, dan perjalanan jiwa menuju Allah. Setiap hikmah ditulis singkat namun sarat makna, sehingga banyak ulama menulis syarah (penjelasan) atas kitab ini.
            </p>
            <p>
              Di antara kitab-kitab tasawuf, <em>Al-Hikam</em> menempati posisi yang sangat istimewa karena menggabungkan kedalaman makrifat dengan bahasa yang indah dan mudah direnungkan oleh semua lapisan masyarakat.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
