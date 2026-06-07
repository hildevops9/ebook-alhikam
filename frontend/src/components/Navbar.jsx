import { Link, useLocation } from 'react-router-dom'
import { BookOpen, MessageCircle, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  const links = [
    { to: '/', label: 'Beranda', icon: null },
    { to: '/kitab', label: 'Kitab Al-Hikam', icon: <BookOpen size={16} /> },
    { to: '/tanya-ustadz', label: 'Tanya Ustadz', icon: <MessageCircle size={16} /> },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-sand-50/90 backdrop-blur-md border-b border-sand-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sand-400 to-sand-600 flex items-center justify-center shadow-md group-hover:shadow-sand-400/40 transition-shadow">
              <span className="text-white font-arabic text-lg leading-none">ح</span>
            </div>
            <div className="hidden sm:block">
              <div className="font-display text-lg font-semibold text-ink-800 leading-none">Al-Hikam</div>
              <div className="text-xs text-sand-500 font-sans leading-none mt-0.5">Kitab Kebijaksanaan</div>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-sans font-medium transition-all ${
                  pathname === link.to
                    ? 'bg-sand-500 text-white shadow-sm'
                    : 'text-ink-600 hover:bg-sand-100 hover:text-ink-800'
                }`}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg text-ink-600 hover:bg-sand-100"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden pb-4 space-y-1 animate-fade-in">
            {links.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-sans font-medium transition-all ${
                  pathname === link.to
                    ? 'bg-sand-500 text-white'
                    : 'text-ink-600 hover:bg-sand-100'
                }`}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
