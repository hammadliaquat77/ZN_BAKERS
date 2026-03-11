
import Link from 'next/link'
import connectDB from '@/lib/mongodb'
import Product from '@/models/Product'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'

async function getFeaturedProducts() {
  try {
    await connectDB()
    return await Product.find({ featured: true, inStock: true }).limit(8).lean()
  } catch {
    return []
  }
}

export default async function HomePage() {
  
  const featured = await getFeaturedProducts()

  return (
    <div className="bg-white dark:bg-[#1A0F0A] transition-colors duration-300">

      {/* ── HERO ── */}
      <section className="min-h-screen bg-gradient-to-br from-[#2C1810] via-[#5C3317] to-[#3D1F0E] flex items-center px-[5%] relative overflow-hidden">
        <div className="relative z-10 max-w-[600px] pt-[72px]">

          <div className="inline-block border border-[#C9A84C] text-[#C9A84C] text-[0.7rem] font-semibold tracking-[3px] uppercase px-4 py-1.5 mb-8">
            Artisan Bakery Since 2010
          </div>

          <h1
            className="text-[clamp(3rem,6vw,5.5rem)] font-black text-white leading-[1.05] mb-6"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Baked with{' '}
            <em className="italic text-[#C9A84C] block">Love & Craft</em>
          </h1>

          <p className="text-lg text-white/70 leading-[1.8] mb-10 font-light">
            Premium cakes, breads, and desserts handcrafted fresh every day.
          </p>

          <div className="flex gap-4 flex-wrap">
            <Link
              href="/menu"
              className="bg-[#C9A84C] text-[#2C1810] px-9 py-4 text-[0.85rem] font-bold tracking-[2px] uppercase no-underline hover:bg-yellow-400 transition-colors duration-300"
            >
              Explore Menu
            </Link>
            <Link
              href="/cart"
              className="bg-transparent text-white px-9 py-4 text-[0.85rem] font-semibold tracking-[2px] uppercase no-underline border border-white/40 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all duration-300"
            >
              Order Now
            </Link>
          </div>

        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="py-[100px] px-[5%] bg-white dark:bg-[#120A07] transition-colors duration-300">
        <div className="max-w-[1200px] mx-auto">

          {/* Header */}
          <div className="text-center mb-12">
            <span className="block text-[0.7rem] font-bold tracking-[4px] uppercase text-[#C9A84C] mb-3">
              Our Specialties
            </span>
            <h2
              className="text-[clamp(2rem,4vw,3.2rem)] font-bold text-[#2C1810] dark:text-[#F5E6C0]"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Freshly Baked Every Morning
            </h2>
          </div>

          {/* Products */}
          {featured.length === 0 ? (
            <div className="text-center py-12 text-[#8B5E3C] dark:text-yellow-200/60">
              <p className="text-lg mb-4">No products yet.</p>
              <a
                href="/api/seed"
                className="bg-[#C9A84C] text-[#2C1810] px-6 py-3 no-underline font-semibold hover:bg-yellow-400 transition-colors inline-block"
              >
                Seed Sample Products →
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featured.map(product => (
                <ProductCard key={product._id.toString()} product={product} />
              ))}
            </div>
          )}

          {/* View All Button */}
          <div className="text-center mt-10">
            <Link
              href="/menu"
              className="border border-yellow-500 text-yellow-600 dark:text-yellow-500 px-10 py-3.5 text-sm font-semibold tracking-[2px] uppercase no-underline hover:bg-yellow-500 hover:text-[#2C1810] dark:hover:text-black transition-all duration-300 inline-block"
            >
              View Full Menu →
            </Link>
          </div>

        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="py-20 px-[5%] bg-[#FDF6EC] dark:bg-[#1A0F0A] transition-colors duration-300">
        <div className="max-w-[1200px] mx-auto">

          {/* Header */}
          <div className="text-center mb-12">
            <span className="block text-[0.7rem] font-bold tracking-[4px] uppercase text-[#C9A84C] mb-3">
              Why Choose Us
            </span>
            <h2
              className="text-[clamp(2rem,4vw,3rem)] font-bold text-[#2C1810] dark:text-[#F5E6C0]"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Baked with Passion
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              { icon: '🌾', title: 'Premium Ingredients', desc: 'Finest quality flour, butter and natural flavors sourced locally.' },
              { icon: '👨‍🍳', title: 'Expert Bakers', desc: 'Trained artisan bakers with 10+ years of experience.' },
              { icon: '🚚', title: 'Fresh Delivery', desc: 'Same-day delivery for orders placed before 2PM.' },
              { icon: '🎂', title: 'Custom Orders', desc: 'Personalized cakes for every occasion and celebration.' },
            ].map(item => (
              <div
                key={item.title}
                className="bg-white dark:bg-[#2C1810] border border-yellow-700/20 p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-5xl mb-5">{item.icon}</div>
                <h3
                  className="text-lg font-bold text-[#2C1810] dark:text-[#F5E6C0] mb-3"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  {item.title}
                </h3>
                <p className="text-sm text-[#8B5E3C] dark:text-yellow-200/60 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-20 px-[5%] bg-gradient-to-br from-[#2C1810] to-[#5C3317] text-center relative overflow-hidden">
        <div className="relative z-10 max-w-2xl mx-auto">
          <span className="block text-[0.7rem] font-bold tracking-[4px] uppercase text-[#C9A84C] mb-4">
            Special Orders
          </span>
          <h2
            className="text-[clamp(2rem,4vw,3.2rem)] font-black text-white mb-5"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Custom Cakes for <em className="italic text-[#C9A84C]">Every Occasion</em>
          </h2>
          <p className="text-white/70 text-base mb-8 leading-relaxed">
            Wedding, birthday, or corporate event — we craft the perfect cake for your special moment.
          </p>
          <Link
            href="/custom-order"
            className="bg-[#C9A84C] text-[#2C1810] px-10 py-4 text-sm font-bold tracking-[2px] uppercase no-underline hover:bg-yellow-400 transition-all duration-300 inline-block hover:-translate-y-0.5"
          >
            Order Custom Cake →
          </Link>
        </div>
      </section>

    </div>
  )
}

// ── PRODUCT CARD ──
const gradients = {
  cake: 'from-[#F5E6C0] to-[#E8C97A]',
  bread: 'from-[#EDD9A3] to-[#C9954C]',
  dessert: 'from-[#F9E4D4] to-[#E8A87C]',
  pastry: 'from-[#F0E6D3] to-[#D4A57A]',
}

function ProductCard({ product }) {
  return (
    <div className="bg-[#FDF6EC] dark:bg-[#2C1810] border border-yellow-700/20 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

      {/* Emoji Area */}
      <div className={`h-48 flex items-center justify-center relative bg-gradient-to-br ${gradients[product.category] || gradients.cake}`}>
        {/* {product.emoji} */}
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-[5rem]">{product.emoji}</span>
        )}
        {product.badge && (
          <span className="absolute top-3 right-3 bg-[#2C1810] text-yellow-500 text-xs font-bold tracking-wide uppercase px-2.5 py-1">
            {product.badge}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-5">
        <div
          className="text-lg font-semibold text-[#2C1810] dark:text-[#F5E6C0] mb-1"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          {product.name}
        </div>
        <div className="text-[0.82rem] text-[#5C3317] dark:text-yellow-200/70 leading-relaxed mb-4 line-clamp-2">
          {product.description}
        </div>
        <div className="flex items-center justify-between">
          <div
            className="text-lg font-bold text-[#5C3317] dark:text-[#C9A84C]"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Rs. {product.price?.toLocaleString()}
            <span className="text-xs font-normal ml-1 dark:text-yellow-200/50">/ {product.unit}</span>
          </div>
          <Link
            href="/menu"
            className="w-9 h-9 bg-[#C9A84C] text-[#2C1810] flex items-center justify-center text-xl font-bold no-underline hover:bg-[#2C1810] hover:text-[#C9A84C] dark:hover:bg-[#1A0F0A] transition-all duration-300"
          >
            +
          </Link>
        </div>
      </div>

    </div>
  )
}