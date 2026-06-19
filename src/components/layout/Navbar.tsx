'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ShoppingBag, Menu, X, Search, User } from 'lucide-react'
import { useCart } from '@/components/shop/CartContext'

interface NavbarProps {
  storeName?: string
  logoUrl?: string | null
}

export default function Navbar({ storeName = 'MYKONOSLOVE', logoUrl }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { count } = useCart()

  const navLinks = [
    { href: '/', label: 'HOME' },
    { href: '/tienda', label: 'SHOP' },
    { href: '/contacto', label: 'CONTACT' },
  ]

  return (
    <>
      <header className="sticky top-0 left-0 right-0 z-50 bg-white border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            {logoUrl ? (
              <img src={logoUrl} alt={storeName} className="h-7 object-contain" />
            ) : (
              <span className="text-base font-bold tracking-tight text-[var(--color-black)]">
                {storeName}
              </span>
            )}
          </Link>

          {/* Nav desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs font-medium tracking-[0.12em] text-[var(--color-black)] hover:text-[var(--color-accent)] transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-[var(--color-accent)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </Link>
            ))}
          </nav>

          {/* Íconos derecha */}
          <div className="hidden md:flex items-center gap-5">
            <button className="text-[var(--color-black)] hover:text-[var(--color-accent)] transition-colors">
              <Search size={18} strokeWidth={1.5} />
            </button>
            <Link href="/cuenta" className="text-[var(--color-black)] hover:text-[var(--color-accent)] transition-colors">
              <User size={18} strokeWidth={1.5} />
            </Link>
            <Link href="/carrito" className="relative text-[var(--color-black)] hover:text-[var(--color-accent)] transition-colors">
              <ShoppingBag size={18} strokeWidth={1.5} />
              {count > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-[var(--color-accent)] text-white text-[9px] rounded-full flex items-center justify-center font-medium">
                  {count}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center gap-4">
            <Link href="/carrito" className="relative">
              <ShoppingBag size={20} strokeWidth={1.5} />
              {count > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-[var(--color-accent)] text-white text-[9px] rounded-full flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-8 md:hidden">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-2xl font-bold tracking-widest uppercase text-[var(--color-black)] hover:text-[var(--color-accent)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
