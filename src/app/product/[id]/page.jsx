// 'use client'
// import { useState, useEffect } from 'react'
// import { useParams, useRouter } from 'next/navigation'
// import { useCart } from '@/components/CartContext'
// import Link from 'next/link'

// const gradients = {
//   cake: 'from-[#F5E6C0] to-[#E8C97A]',
//   bread: 'from-[#EDD9A3] to-[#C9954C]',
//   dessert: 'from-[#F9E4D4] to-[#E8A87C]',
//   pastry: 'from-[#F0E6D3] to-[#D4A57A]',
// }

// export default function ProductDetailPage() {
//   const { id } = useParams()
//   const router = useRouter()
//   const { addToCart } = useCart()

//   const [product, setProduct] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [activeImg, setActiveImg] = useState(0)
//   const [qty, setQty] = useState(1)
//   const [toast, setToast] = useState('')

//   useEffect(() => {
//     fetchProduct()
//   }, [id])

//   async function fetchProduct() {
//     const res = await fetch(`/api/products/${id}`)
//     const data = await res.json()
//     setProduct(data.product)
//     setLoading(false)
//   }

//   function handleAddToCart() {
//     if (!product.inStock) return
//     for (let i = 0; i < qty; i++) addToCart(product)
//     setToast(`✓ ${qty}x ${product.name} added to cart!`)
//     setTimeout(() => setToast(''), 3000)
//   }

//   if (loading) return (
//     <div className="pt-[72px] min-h-screen bg-[#FDF6EC] dark:bg-[#1A0F0A] flex items-center justify-center">
//       <div className="text-[#8B5E3C] dark:text-yellow-400 text-xl">🍞 Loading...</div>
//     </div>
//   )

//   if (!product) return (
//     <div className="pt-[72px] min-h-screen bg-[#FDF6EC] dark:bg-[#1A0F0A] flex items-center justify-center flex-col gap-4">
//       <div className="text-6xl">😕</div>
//       <p className="text-[#2C1810] dark:text-[#F5E6C0] text-lg font-semibold">Product not found</p>
//       <Link href="/menu" className="bg-[#C9A84C] text-[#2C1810] px-6 py-3 font-bold text-sm uppercase no-underline">
//         Back to Menu
//       </Link>
//     </div>
//   )

//   // All images — main + extra
//   const allImages = [
//     ...(product.image ? [{ url: product.image, publicId: product.imagePublicId }] : []),
//     ...(product.images || []),
//   ]

//   return (
//     <div className="pt-[72px] min-h-screen bg-[#FDF6EC] dark:bg-[#1A0F0A] transition-colors duration-300">

//       {/* Breadcrumb */}
//       <div className="bg-white dark:bg-[#2C1810] border-b border-yellow-700/20 px-6 py-3">
//         <div className="max-w-6xl mx-auto flex items-center gap-2 text-xs text-[#8B5E3C] dark:text-yellow-200/50">
//           <Link href="/" className="hover:text-[#C9A84C] no-underline transition-colors">Home</Link>
//           <span>›</span>
//           <Link href="/menu" className="hover:text-[#C9A84C] no-underline transition-colors">Menu</Link>
//           <span>›</span>
//           <span className="text-[#2C1810] dark:text-[#F5E6C0] font-medium">{product.name}</span>
//         </div>
//       </div>

//       <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

//           {/* ── LEFT: Images ── */}
//           <div>
//             {/* Main Image */}
//             <div className={`w-full aspect-square bg-gradient-to-br ${gradients[product.category] || gradients.cake} overflow-hidden relative`}>
//               {allImages.length > 0 ? (
//                 <img
//                   src={allImages[activeImg]?.url}
//                   alt={product.name}
//                   className="w-full h-full object-cover transition-all duration-500"
//                 />
//               ) : (
//                 <div className="w-full h-full flex items-center justify-center text-[10rem]">
//                   {product.emoji}
//                 </div>
//               )}

//               {/* Stock Badge */}
//               <div className={`absolute top-4 left-4 text-xs font-bold px-3 py-1.5
//                 ${product.inStock
//                   ? 'bg-green-500 text-white'
//                   : 'bg-red-500 text-white'
//                 }`}
//               >
//                 {product.inStock ? '🟢 Available' : '🔴 Unavailable'}
//               </div>

//               {/* Product Badge */}
//               {product.badge && (
//                 <div className="absolute top-4 right-4 bg-[#2C1810] text-[#C9A84C] text-xs font-bold px-3 py-1.5 uppercase tracking-wide">
//                   {product.badge}
//                 </div>
//               )}
//             </div>

//             {/* Thumbnail Strip */}
//             {allImages.length > 1 && (
//               <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
//                 {allImages.map((img, i) => (
//                   <button
//                     key={i}
//                     onClick={() => setActiveImg(i)}
//                     className={`w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 overflow-hidden border-2 transition-all duration-300 cursor-pointer
//                       ${activeImg === i
//                         ? 'border-[#C9A84C] opacity-100'
//                         : 'border-transparent opacity-60 hover:opacity-100'
//                       }`}
//                   >
//                     <img src={img.url} alt={`view ${i + 1}`} className="w-full h-full object-cover" />
//                   </button>
//                 ))}
//               </div>
//             )}

//             {/* No image fallback thumbnails */}
//             {allImages.length === 0 && (
//               <div className="flex gap-2 mt-3">
//                 <div className="w-20 h-20 bg-gradient-to-br from-[#F5E6C0] to-[#E8C97A] flex items-center justify-center text-3xl border-2 border-[#C9A84C]">
//                   {product.emoji}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* ── RIGHT: Info ── */}
//           <div className="flex flex-col gap-5">

//             {/* Category */}
//             <div>
//               <span className="text-xs font-bold tracking-[3px] uppercase text-[#C9A84C]">
//                 {product.category}
//               </span>
//             </div>

//             {/* Name */}
//             <h1
//               className="text-3xl sm:text-4xl font-black text-[#2C1810] dark:text-[#F5E6C0] leading-tight"
//               style={{ fontFamily: 'Playfair Display, serif' }}
//             >
//               {product.name}
//             </h1>

//             {/* Price */}
//             <div className="flex items-baseline gap-2">
//               <span
//                 className="text-3xl font-bold text-[#C9A84C]"
//                 style={{ fontFamily: 'Playfair Display, serif' }}
//               >
//                 Rs. {product.price?.toLocaleString()}
//               </span>
//               <span className="text-sm text-[#8B5E3C] dark:text-yellow-200/50">
//                 / {product.unit}
//               </span>
//             </div>

//             {/* Divider */}
//             <div className="h-px bg-yellow-700/20" />

//             {/* Description */}
//             <p className="text-[#5C3317] dark:text-yellow-200/70 leading-relaxed text-sm sm:text-base">
//               {product.description}
//             </p>

//             {/* Qty Selector */}
//             <div>
//               <label className="block text-xs font-bold tracking-widest uppercase text-[#5C3317] dark:text-yellow-500/80 mb-3">
//                 Quantity
//               </label>
//               <div className="flex items-center gap-3">
//                 <button
//                   onClick={() => setQty(q => Math.max(1, q - 1))}
//                   className="w-10 h-10 bg-[#FDF6EC] dark:bg-[#1A0F0A] border border-yellow-700/30 text-[#2C1810] dark:text-[#F5E6C0] flex items-center justify-center text-lg font-bold cursor-pointer hover:bg-yellow-500 hover:text-[#2C1810] transition-colors border-none"
//                 >
//                   −
//                 </button>
//                 <span className="w-10 text-center font-bold text-lg text-[#2C1810] dark:text-[#F5E6C0]">
//                   {qty}
//                 </span>
//                 <button
//                   onClick={() => setQty(q => q + 1)}
//                   className="w-10 h-10 bg-[#FDF6EC] dark:bg-[#1A0F0A] border border-yellow-700/30 text-[#2C1810] dark:text-[#F5E6C0] flex items-center justify-center text-lg font-bold cursor-pointer hover:bg-yellow-500 hover:text-[#2C1810] transition-colors border-none"
//                 >
//                   +
//                 </button>
//                 <span className="text-sm text-[#8B5E3C] dark:text-yellow-200/50 ml-2">
//                   Total: <strong className="text-[#C9A84C]">Rs. {(product.price * qty).toLocaleString()}</strong>
//                 </span>
//               </div>
//             </div>

//             {/* Add to Cart */}
//             <div className="flex gap-3">
//               <button
//                 onClick={handleAddToCart}
//                 disabled={!product.inStock}
//                 className={`flex-1 py-4 text-sm font-bold tracking-widest uppercase border-none transition-all duration-300
//                   ${product.inStock
//                     ? 'bg-[#C9A84C] text-[#2C1810] cursor-pointer hover:bg-yellow-400 hover:-translate-y-0.5'
//                     : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
//                   }`}
//               >
//                 {product.inStock ? `🛒 Add ${qty} to Cart` : '❌ Unavailable'}
//               </button>
//               <Link
//                 href="/cart"
//                 className="px-6 py-4 border border-yellow-700/30 text-[#5C3317] dark:text-yellow-200/60 text-sm font-semibold no-underline hover:border-yellow-500 hover:text-[#C9A84C] transition-all duration-300 flex items-center"
//               >
//                 View Cart
//               </Link>
//             </div>

//             {/* Divider */}
//             <div className="h-px bg-yellow-700/20" />

//             {/* Product Details */}
//             <div>
//               <div className="text-xs font-bold tracking-widest uppercase text-[#C9A84C] mb-3">
//                 Product Details
//               </div>
//               <div className="flex flex-col gap-2">
//                 {[
//                   ['Category', product.category],
//                   ['Unit', product.unit],
//                   ['Availability', product.inStock ? '✅ In Stock' : '❌ Out of Stock'],
//                   product.badge && ['Badge', product.badge],
//                 ].filter(Boolean).map(([key, val]) => (
//                   <div key={key} className="flex justify-between py-2 border-b border-yellow-700/10">
//                     <span className="text-xs text-[#8B5E3C] dark:text-yellow-200/50 uppercase tracking-wide font-semibold">{key}</span>
//                     <span className="text-sm text-[#2C1810] dark:text-[#F5E6C0] capitalize">{val}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Delivery Info */}
//             <div className="bg-[#2C1810] dark:bg-[#1A0F0A] border border-yellow-700/30 p-4">
//               <div className="text-xs font-bold tracking-widest uppercase text-[#C9A84C] mb-3">
//                 Delivery Info
//               </div>
//               <div className="flex flex-col gap-2 text-sm text-white/70">
//                 <div className="flex items-center gap-2">🚚 <span>Free delivery on orders above Rs. 2,000</span></div>
//                 <div className="flex items-center gap-2">⏰ <span>Same-day delivery for orders before 2PM</span></div>
//                 <div className="flex items-center gap-2">📦 <span>Freshly baked and packed daily</span></div>
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>

//       {/* Toast */}
//       {toast && (
//         <div className="fixed bottom-6 right-6 bg-[#2C1810] dark:bg-[#1A0F0A] text-[#C9A84C] px-5 py-3 text-sm font-semibold border-l-4 border-[#C9A84C] z-50 shadow-xl">
//           {toast}
//         </div>
//       )}

//     </div>
//   )
// }

















'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useCart } from '@/components/CartContext'
import Link from 'next/link'

const gradients = {
  cake: 'from-[#F5E6C0] to-[#E8C97A]',
  bread: 'from-[#EDD9A3] to-[#C9954C]',
  dessert: 'from-[#F9E4D4] to-[#E8A87C]',
  pastry: 'from-[#F0E6D3] to-[#D4A57A]',
}

export default function ProductDetailPage() {
  const { id } = useParams()
  const { addToCart } = useCart()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeImg, setActiveImg] = useState(0)
  const [qty, setQty] = useState(1)
  const [toast, setToast] = useState('')

  useEffect(() => { fetchProduct() }, [id])

  async function fetchProduct() {
    const res = await fetch(`/api/products/${id}`)
    const data = await res.json()
    setProduct(data.product)
    setLoading(false)
  }

  function handleAddToCart() {
    if (!product.inStock) return
    for (let i = 0; i < qty; i++) addToCart(product)
    setToast(`✓ ${qty}x ${product.name} added to cart!`)
    setTimeout(() => setToast(''), 3000)
  }

  if (loading) return (
    <div className="pt-[72px] min-h-screen bg-[#FDF6EC] dark:bg-[#1A0F0A] flex items-center justify-center">
      <div className="text-[#8B5E3C] dark:text-yellow-400 text-xl">🍞 Loading...</div>
    </div>
  )

  if (!product) return (
    <div className="pt-[72px] min-h-screen bg-[#FDF6EC] dark:bg-[#1A0F0A] flex items-center justify-center flex-col gap-4">
      <div className="text-6xl">😕</div>
      <p className="text-[#2C1810] dark:text-[#F5E6C0] text-lg font-semibold">Product not found</p>
      <Link href="/menu" className="bg-[#C9A84C] text-[#2C1810] px-6 py-3 font-bold text-sm uppercase no-underline">
        Back to Menu
      </Link>
    </div>
  )

  // ── Sab images ek array mein combine karo ──
  const allImages = [
    ...(product.image ? [{ url: product.image, publicId: product.imagePublicId }] : []),
    ...(Array.isArray(product.images) ? product.images.filter(img => img?.url) : []),
  ]

  const hasImages = allImages.length > 0

  return (
    <div className="pt-[72px] min-h-screen bg-[#FDF6EC] dark:bg-[#1A0F0A] transition-colors duration-300">

      {/* Breadcrumb */}
      <div className="bg-white dark:bg-[#2C1810] border-b border-yellow-700/20 px-6 py-3">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-xs text-[#8B5E3C] dark:text-yellow-200/50">
          <Link href="/" className="hover:text-[#C9A84C] no-underline transition-colors">Home</Link>
          <span>›</span>
          <Link href="/menu" className="hover:text-[#C9A84C] no-underline transition-colors">Menu</Link>
          <span>›</span>
          <span className="text-[#2C1810] dark:text-[#F5E6C0] font-medium">{product.name}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* ── LEFT: Images ── */}
          <div className="flex flex-col gap-3">

            {/* Main Image */}
            <div className={`w-full aspect-square bg-gradient-to-br ${gradients[product.category] || gradients.cake} overflow-hidden relative`}>
              {hasImages ? (
                <img
                  src={allImages[activeImg]?.url}
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[10rem]">
                  {product.emoji}
                </div>
              )}

              {/* Stock Badge */}
              <div className={`absolute top-4 left-4 text-xs font-bold px-3 py-1.5
                ${product.inStock ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                {product.inStock ? '🟢 Available' : '🔴 Unavailable'}
              </div>

              {/* Product Badge */}
              {product.badge && (
                <div className="absolute top-4 right-4 bg-[#2C1810] text-[#C9A84C] text-xs font-bold px-3 py-1.5 uppercase tracking-wide">
                  {product.badge}
                </div>
              )}

              {/* Image Counter */}
              {allImages.length > 1 && (
                <div className="absolute bottom-4 right-4 bg-black/50 text-white text-xs font-bold px-2.5 py-1">
                  {activeImg + 1} / {allImages.length}
                </div>
              )}

              {/* Prev / Next Arrows */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImg(i => (i - 1 + allImages.length) % allImages.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/40 hover:bg-black/70 text-white flex items-center justify-center cursor-pointer border-none transition-colors text-lg"
                  >
                    ‹
                  </button>
                  <button
                    onClick={() => setActiveImg(i => (i + 1) % allImages.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/40 hover:bg-black/70 text-white flex items-center justify-center cursor-pointer border-none transition-colors text-lg"
                  >
                    ›
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 overflow-hidden border-2 transition-all duration-300 cursor-pointer p-0 bg-transparent
                      ${activeImg === i
                        ? 'border-[#C9A84C] opacity-100 scale-105'
                        : 'border-yellow-700/20 opacity-50 hover:opacity-100 hover:border-yellow-500/50'
                      }`}
                  >
                    <img
                      src={img.url}
                      alt={`view ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Emoji fallback thumbnail */}
            {!hasImages && (
              <div className="flex gap-2">
                <div className="w-20 h-20 bg-gradient-to-br from-[#F5E6C0] to-[#E8C97A] flex items-center justify-center text-3xl border-2 border-[#C9A84C]">
                  {product.emoji}
                </div>
              </div>
            )}

          </div>

          {/* ── RIGHT: Info ── */}
          <div className="flex flex-col gap-5">

            {/* Category */}
            <span className="text-xs font-bold tracking-[3px] uppercase text-[#C9A84C]">
              {product.category}
            </span>

            {/* Name */}
            <h1
              className="text-3xl sm:text-4xl font-black text-[#2C1810] dark:text-[#F5E6C0] leading-tight"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-2">
              <span
                className="text-3xl font-bold text-[#C9A84C]"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Rs. {product.price?.toLocaleString()}
              </span>
              <span className="text-sm text-[#8B5E3C] dark:text-yellow-200/50">
                / {product.unit}
              </span>
            </div>

            <div className="h-px bg-yellow-700/20" />

            {/* Description */}
            <p className="text-[#5C3317] dark:text-yellow-200/70 leading-relaxed text-sm sm:text-base">
              {product.description}
            </p>

            {/* Qty */}
            <div>
              <label className="block text-xs font-bold tracking-widest uppercase text-[#5C3317] dark:text-yellow-500/80 mb-3">
                Quantity
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="w-10 h-10 bg-[#FDF6EC] dark:bg-[#1A0F0A] text-[#2C1810] dark:text-[#F5E6C0] flex items-center justify-center text-lg font-bold cursor-pointer hover:bg-yellow-500 hover:text-[#2C1810] transition-colors border border-yellow-700/30"
                >
                  −
                </button>
                <span className="w-10 text-center font-bold text-lg text-[#2C1810] dark:text-[#F5E6C0]">
                  {qty}
                </span>
                <button
                  onClick={() => setQty(q => q + 1)}
                  className="w-10 h-10 bg-[#FDF6EC] dark:bg-[#1A0F0A] text-[#2C1810] dark:text-[#F5E6C0] flex items-center justify-center text-lg font-bold cursor-pointer hover:bg-yellow-500 hover:text-[#2C1810] transition-colors border border-yellow-700/30"
                >
                  +
                </button>
                <span className="text-sm text-[#8B5E3C] dark:text-yellow-200/50 ml-1">
                  Total: <strong className="text-[#C9A84C]">Rs. {(product.price * qty).toLocaleString()}</strong>
                </span>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex-1 py-4 text-sm font-bold tracking-widest uppercase border-none transition-all duration-300
                  ${product.inStock
                    ? 'bg-[#C9A84C] text-[#2C1810] cursor-pointer hover:bg-yellow-400 hover:-translate-y-0.5'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                  }`}
              >
                {product.inStock ? `🛒 Add ${qty} to Cart` : '❌ Unavailable'}
              </button>
              <Link
                href="/cart"
                className="px-6 py-4 border border-yellow-700/30 text-[#5C3317] dark:text-yellow-200/60 text-sm font-semibold no-underline hover:border-yellow-500 hover:text-[#C9A84C] transition-all duration-300 flex items-center whitespace-nowrap"
              >
                View Cart
              </Link>
            </div>

            <div className="h-px bg-yellow-700/20" />

            {/* Product Details */}
            <div>
              <div className="text-xs font-bold tracking-widest uppercase text-[#C9A84C] mb-3">
                Product Details
              </div>
              <div className="flex flex-col">
                {[
                  ['Category', product.category],
                  ['Unit', product.unit],
                  ['Availability', product.inStock ? '✅ In Stock' : '❌ Out of Stock'],
                  ['Images', `${allImages.length} photo${allImages.length !== 1 ? 's' : ''}`],
                  product.badge && ['Badge', product.badge],
                ].filter(Boolean).map(([key, val]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-yellow-700/10">
                    <span className="text-xs text-[#8B5E3C] dark:text-yellow-200/50 uppercase tracking-wide font-semibold">{key}</span>
                    <span className="text-sm text-[#2C1810] dark:text-[#F5E6C0] capitalize">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-[#2C1810] dark:bg-[#1A0F0A] border border-yellow-700/30 p-4">
              <div className="text-xs font-bold tracking-widest uppercase text-[#C9A84C] mb-3">
                Delivery Info
              </div>
              <div className="flex flex-col gap-2 text-sm text-white/70">
                <div className="flex items-center gap-2">🚚 <span>Free delivery on orders above Rs. 2,000</span></div>
                <div className="flex items-center gap-2">⏰ <span>Same-day delivery for orders before 2PM</span></div>
                <div className="flex items-center gap-2">📦 <span>Freshly baked and packed daily</span></div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-[#2C1810] dark:bg-[#1A0F0A] text-[#C9A84C] px-5 py-3 text-sm font-semibold border-l-4 border-[#C9A84C] z-50 shadow-xl">
          {toast}
        </div>
      )}

    </div>
  )
}