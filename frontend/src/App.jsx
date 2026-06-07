import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Kitab from './pages/Kitab'
import HikamDetail from './pages/HikamDetail'
import TanyaUstadz from './pages/TanyaUstadz'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/kitab" element={<Kitab />} />
            <Route path="/kitab/:id" element={<HikamDetail />} />
            <Route path="/tanya-ustadz" element={<TanyaUstadz />} />
          </Routes>
        </main>
        <footer className="border-t border-sand-200 py-8 mt-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
            <p className="arabic-text text-xl text-sand-400 mb-2 font-arabic">وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ</p>
            <p className="font-sans text-xs text-sand-400">
              Al-Hikam · Kitab Kebijaksanaan Ibnu Athaillah As-Sakandari
            </p>
          </div>
        </footer>
      </div>
      <Toaster position="bottom-center" />
    </BrowserRouter>
  )
}
