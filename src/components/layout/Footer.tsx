import Link from 'next/link'

interface FooterProps {
  storeName?: string
  whatsapp?: string
  email?: string
  instagramUrl?: string
  facebookUrl?: string
  tiktokUrl?: string
  pickupAddress?: string
  branches?: { name: string; address: string; phone?: string }[]
}

function IconInstagram() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  )
}

function IconFacebook() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  )
}

function IconTwitter() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
    </svg>
  )
}

function IconPinterest() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
    </svg>
  )
}

export default function Footer({
  storeName = 'MYKONOSLOVE',
  whatsapp = '',
  email = '',
  instagramUrl,
  facebookUrl,
}: FooterProps) {
  return (
    <footer className="bg-white border-t border-[var(--color-border)]">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">

          {/* Logo / nombre */}
          <Link href="/" className="text-base font-bold tracking-tight text-[var(--color-black)]">
            {storeName}
          </Link>

          {/* Newsletter inline */}
          <div className="flex items-center gap-2 text-xs text-[var(--color-gray)]">
            <span className="tracking-wide">Suscribite al newsletter</span>
            {instagramUrl && (
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer"
                className="text-[var(--color-black)] hover:text-[var(--color-accent)] transition-colors ml-2">
                <IconInstagram />
              </a>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[var(--color-border)] my-6" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--color-gray)]">
            Copyright &copy; {new Date().getFullYear()} {storeName}
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            {facebookUrl && (
              <a href={facebookUrl} target="_blank" rel="noopener noreferrer"
                className="text-[var(--color-gray)] hover:text-[var(--color-black)] transition-colors">
                <IconFacebook />
              </a>
            )}
            <a href="#" className="text-[var(--color-gray)] hover:text-[var(--color-black)] transition-colors">
              <IconTwitter />
            </a>
            <a href="#" className="text-[var(--color-gray)] hover:text-[var(--color-black)] transition-colors">
              <IconPinterest />
            </a>
            {instagramUrl && (
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer"
                className="text-[var(--color-gray)] hover:text-[var(--color-black)] transition-colors">
                <IconInstagram />
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
