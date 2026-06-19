import { createServerSupabase, TENANT_ID } from '@/lib/supabase-server'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ProductCard from '@/components/shop/ProductCard'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const COLLECTION_PALETTES = [
  { bg: '#E8E0D8', text: '#1A1A1A' },
  { bg: '#D8E0E8', text: '#1A1A1A' },
  { bg: '#D8E8DE', text: '#1A1A1A' },
]

const BLOG_POSTS = [
  {
    title: 'Tendencias de temporada',
    date: new Date().toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' }),
    excerpt: 'Descubrí las piezas clave que definen la moda de esta temporada y cómo combinarlas para crear looks únicos.',
    bg: '#E8E4DC',
  },
  {
    title: 'Guía de talles y ajuste',
    date: new Date().toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' }),
    excerpt: 'Todo lo que necesitás saber para elegir el talle perfecto y conseguir el ajuste ideal en cada prenda.',
    bg: '#D8DDE8',
  },
  {
    title: 'Cuidado de prendas',
    date: new Date().toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' }),
    excerpt: 'Consejos esenciales para mantener tus prendas favoritas en perfecto estado temporada tras temporada.',
    bg: '#D8E8D8',
  },
]

export default async function HomePage() {
  const supabase = await createServerSupabase()

  const { data: tenant } = await supabase
    .from('tenants')
    .select('name, domain')
    .eq('id', TENANT_ID)
    .single()

  const { data: config } = await supabase
    .from('store_config')
    .select('logo_url, whatsapp_number, instagram_url, facebook_url, tiktok_url, pickup_address, pickup_enabled, branches')
    .eq('tenant_id', TENANT_ID)
    .single()

  // Imágenes configurables desde panel Personalización
  const { data: assetsRows } = await supabase
    .from('store_assets')
    .select('slot, url')
    .eq('tenant_id', TENANT_ID)

  const asset = (slot: string): string | null =>
    assetsRows?.find(a => a.slot === slot)?.url ?? null

  const { data: products } = await supabase
    .from('products')
    .select('id, name, slug, product_images(*), variants(price_rules(*))')
    .eq('tenant_id', TENANT_ID)
    .eq('active', true)
    .order('created_at', { ascending: false })
    .limit(5)

  const { data: categories } = await supabase
    .from('categories')
    .select('id, name, slug')
    .eq('tenant_id', TENANT_ID)
    .eq('active', true)
    .order('sort_order')
    .limit(3)

  const storeName = tenant?.name ?? 'MYKONOSLOVE'

  const collections = Array.from({ length: 3 }, (_, i) => ({
    name: (categories as any)?.[i]?.name ?? ['Nueva Colección', 'Accesorios', 'Ropa'][i],
    slug: (categories as any)?.[i]?.slug ?? ['nueva-coleccion', 'accesorios', 'ropa'][i],
    palette: COLLECTION_PALETTES[i],
  }))

  return (
    <>
      <Navbar storeName={storeName} logoUrl={config?.logo_url} />

      <main>

        {/* ── HERO ─────────────────────────────────────────────── */}
        {/* Canvas: 100vw. Imagen principal: 81% desde la izquierda. Zona derecha: 19% fondo liso */}
        {/* Navbar es fixed+transparente → hero ocupa 100vh desde el borde superior */}
        <section className="relative w-full bg-[#F0EFEC] overflow-hidden" style={{ height: '100vh' }}>

          {/* Imagen principal — 81% ancho, full height, con hover scale */}
          <div className="absolute left-0 top-0 bottom-0 overflow-hidden group/hero" style={{ width: '81%' }}>
            {asset('hero_main') ? (
              <img
                src={asset('hero_main')!}
                alt="Hero"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/hero:scale-[1.03]"
              />
            ) : (
              <div className="w-full h-full bg-[#E0D8CE]" />
            )}

            {/* Overlay gradiente */}
            <div className="absolute inset-0 bg-gradient-to-l from-black/45 via-transparent to-transparent" />

            {/* 2 Thumbnails superpuestos — ABAJO izquierda */}
            <div className="absolute bottom-10 left-8 flex gap-3 z-10">
              {/* Thumbnail 1 */}
              <div
                className="overflow-hidden group/t1 cursor-pointer"
                style={{ width: '18.5vw', height: 'calc(18.5vw * 1.3125)' }}
              >
                {asset('hero_thumb_1') ? (
                  <img
                    src={asset('hero_thumb_1')!}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/t1:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-[#8B7355] transition-transform duration-500 group-hover/t1:scale-105" />
                )}
              </div>

              {/* Thumbnail 2 */}
              <div
                className="overflow-hidden group/t2 cursor-pointer"
                style={{ width: '18.5vw', height: 'calc(18.5vw * 1.3125)' }}
              >
                {asset('hero_thumb_2') ? (
                  <img
                    src={asset('hero_thumb_2')!}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/t2:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-[#7B3535] transition-transform duration-500 group-hover/t2:scale-105" />
                )}
              </div>
            </div>

            {/* Flechas — debajo de los thumbnails (en el borde inferior) */}
            <div className="absolute bottom-3 left-8 z-10 flex gap-2">
              <button className="w-9 h-9 bg-[var(--color-black)] text-white flex items-center justify-center hover:bg-[var(--color-accent)] transition-colors">
                <ChevronLeft size={16} />
              </button>
              <button className="w-9 h-9 bg-[var(--color-black)] text-white flex items-center justify-center hover:bg-[var(--color-accent)] transition-colors">
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Texto hero — sobre la imagen, lado derecho */}
            <div className="absolute right-10 top-1/2 -translate-y-1/2 max-w-xs text-right z-10">
              <p className="text-xs tracking-[0.25em] uppercase text-white/70 mb-4">
                Fashion Exclusive Collection
              </p>
              <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-5">
                Nueva<br />
                Temporada<br />
                2026
              </h1>
              <p className="text-sm text-white/80 mb-7 font-light leading-relaxed">
                Piezas únicas diseñadas para<br />
                quienes buscan estilo y distinción.
              </p>
              <div className="flex items-center gap-4 justify-end">
                <Link
                  href="/tienda"
                  className="inline-block bg-[var(--color-accent)] text-white text-xs tracking-[0.15em] uppercase px-6 py-3 hover:bg-[#c96a28] transition-colors"
                >
                  Ver colección
                </Link>
                <Link
                  href="/tienda"
                  className="text-xs tracking-[0.15em] uppercase text-white border-b border-white/60 pb-0.5 hover:border-white transition-colors"
                >
                  Tienda
                </Link>
              </div>
            </div>
          </div>

          {/* Zona derecha — 19% fondo liso */}
          <div className="absolute right-0 top-0 bottom-0 bg-[#F0EFEC]" style={{ width: '19%' }} />
        </section>

        {/* ── FEATURES BAR ─────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: 'Envío gratis', desc: 'En compras que superen el monto mínimo. Entrega rápida y segura a todo el país.' },
              { title: 'Devoluciones', desc: 'Tenés 14 días para devolver o cambiar tu pedido si no quedás satisfecho.' },
              { title: 'Atención al cliente', desc: 'Estamos disponibles para ayudarte en todo momento por WhatsApp e email.' },
            ].map((feat, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-11 h-11 bg-[var(--color-light)] flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-sm text-[var(--color-black)] mb-1.5">{feat.title}</h3>
                  <p className="text-xs leading-relaxed text-[var(--color-accent)]">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── COLECCIONES ──────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-6 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {collections.map((col, i) => {
              const colImg = asset(`collection_${i + 1}`)
              return (
                <Link
                  key={i}
                  href={`/tienda?categoria=${col.slug}`}
                  className="group relative overflow-hidden aspect-[4/5] block"
                  style={{ backgroundColor: col.palette.bg }}
                >
                  {colImg && (
                    <img
                      src={colImg}
                      alt={col.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h2 className={`text-2xl font-extrabold mb-1 ${colImg ? 'text-white' : 'text-[var(--color-black)]'}`}>{col.name}</h2>
                    <p className={`text-xs mb-4 leading-relaxed ${colImg ? 'text-white/70' : 'text-[var(--color-gray)]'}`}>
                      Quisque condimentum ipsum at velit hendrerit venenatis.
                    </p>
                    <span className={`text-xs font-bold tracking-[0.15em] uppercase border-b-2 pb-0.5 group-hover:text-[var(--color-accent)] group-hover:border-[var(--color-accent)] transition-colors ${colImg ? 'text-white border-white' : 'text-[var(--color-black)] border-[var(--color-black)]'}`}>
                      DISCOVER MORE
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        {/* ── FEATURED PRODUCTS ────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-6 pb-24">
          <div className="flex items-start justify-between mb-10">
            <div>
              <h2 className="text-4xl font-extrabold text-[var(--color-black)] mb-2">Featured product</h2>
              <p className="text-sm text-[var(--color-accent)] max-w-md">
                Las últimas incorporaciones a nuestra colección, seleccionadas especialmente para vos.
              </p>
            </div>
            <div className="hidden md:flex gap-2 mt-1 flex-shrink-0">
              <button className="w-9 h-9 border border-[var(--color-border)] flex items-center justify-center hover:border-[var(--color-black)] transition-colors">
                <ChevronLeft size={16} />
              </button>
              <button className="w-9 h-9 border border-[var(--color-border)] flex items-center justify-center hover:border-[var(--color-black)] transition-colors">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
            {(products as any[])?.map((product: any, i: number) => {
              const cover = product.product_images?.find((img: any) => img.is_cover) ?? product.product_images?.[0]
              const retailPrice = product.variants?.[0]?.price_rules?.find((p: any) => p.type === 'retail' && p.active)?.price
              const wholesalePrice = product.variants?.[0]?.price_rules?.find((p: any) => p.type === 'wholesale' && p.active)?.price
              const colors = [...new Set((product.variants ?? []).map((v: any) => v.color).filter(Boolean))] as string[]
              const sizes = [...new Set((product.variants ?? []).map((v: any) => v.size).filter(Boolean))] as string[]

              return (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  slug={product.slug}
                  coverUrl={cover?.url}
                  retailPrice={retailPrice}
                  wholesalePrice={wholesalePrice}
                  colors={colors}
                  sizes={sizes}
                  index={i}
                />
              )
            })}

            {(!products || products.length === 0) && (
              <div className="col-span-5 py-20 text-center">
                <p className="text-[var(--color-gray)] text-sm">Los productos se mostrarán aquí</p>
              </div>
            )}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/tienda"
              className="text-xs font-bold tracking-[0.15em] uppercase border-b-2 border-[var(--color-black)] pb-0.5 hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-colors"
            >
              DISCOVER MORE
            </Link>
          </div>
        </section>

        {/* ── BLOG ─────────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-6 pb-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-[var(--color-black)] mb-3">Fashion news &amp; tips</h2>
            <p className="text-sm text-[var(--color-accent)]">
              Todo sobre moda, tendencias y cuidado de prendas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post, i) => {
              const blogImg = asset(`blog_${i + 1}`)
              return (
              <article key={i} className="group cursor-pointer">
                <div
                  className="aspect-[4/3] mb-5 overflow-hidden relative"
                  style={{ backgroundColor: post.bg }}
                >
                  {blogImg && (
                    <img
                      src={blogImg}
                      alt={post.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  )}
                </div>
                <h3 className="text-base font-bold text-[var(--color-black)] mb-1 group-hover:text-[var(--color-accent)] transition-colors">
                  {post.title}
                </h3>
                <p className="text-xs text-[var(--color-gray)] mb-3">{post.date}</p>
                <p className="text-sm text-[var(--color-gray)] leading-relaxed mb-4">{post.excerpt}</p>
                <span className="text-xs font-bold tracking-[0.15em] uppercase border-b-2 border-[var(--color-black)] pb-0.5 group-hover:text-[var(--color-accent)] group-hover:border-[var(--color-accent)] transition-colors">
                  READ MORE
                </span>
              </article>
              )
            })}
          </div>
        </section>

        {/* ── NEWSLETTER ───────────────────────────────────────── */}
        <section className="relative bg-[#1A1A1A] py-24 px-6">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'radial-gradient(ellipse at 20% 50%, #E07B39 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, #555 0%, transparent 60%)'
            }}
          />
          <div className="relative max-w-xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
              Recibí las últimas novedades
            </h2>
            <p className="text-sm text-white/60 mb-8">
              Suscribite y obtené un 15% de descuento en tu primera compra
            </p>
            <div className="flex flex-col sm:flex-row">
              <input
                type="email"
                placeholder="Tu dirección de email..."
                className="flex-1 bg-white text-[var(--color-black)] text-sm px-5 py-4 outline-none placeholder:text-[var(--color-gray)]"
              />
              <button className="bg-[var(--color-accent)] text-white text-xs font-bold tracking-[0.15em] uppercase px-8 py-4 hover:bg-[#c96a28] transition-colors whitespace-nowrap">
                SUSCRIBIRSE
              </button>
            </div>
          </div>
        </section>

      </main>

      <Footer
        storeName={storeName}
        whatsapp={config?.whatsapp_number ?? ''}
        email={config?.notification_email ?? ''}
        instagramUrl={(config as any)?.instagram_url ?? undefined}
        facebookUrl={(config as any)?.facebook_url ?? undefined}
      />
    </>
  )
}
