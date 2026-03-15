
// 'use client'
// import { useState, useEffect } from 'react'
// import { useCart } from '@/components/CartContext'

// const CATEGORIES = ['all', 'cake', 'bread', 'dessert', 'pastry']
// const gradients = {
//   cake: 'from-[#F5E6C0] to-[#E8C97A]',
//   bread: 'from-[#EDD9A3] to-[#C9954C]',
//   dessert: 'from-[#F9E4D4] to-[#E8A87C]',
//   pastry: 'from-[#F0E6D3] to-[#D4A57A]',
// }

// export default function MenuPage() {
//   const [products, setProducts] = useState([])
//   const [category, setCategory] = useState('all')
//   const [loading, setLoading] = useState(true)
//   const [toast, setToast] = useState('')
//   const { addToCart } = useCart()

//   useEffect(() => {
//     fetchProducts()
//   }, [category])

//   async function fetchProducts() {
//     setLoading(true)
//     const res = await fetch(`/api/products?category=${category}`)
//     const data = await res.json()
//     setProducts(data.products || [])
//     setLoading(false)
//   }

//   function handleAddToCart(product) {
//     addToCart(product)
//     setToast(`✓ ${product.name} added to cart!`)
//     setTimeout(() => setToast(''), 3000)
//   }

//   return (
//     <div className="pt-20 min-h-screen bg-[#FDF6EC] dark:bg-[#1A0F0A] transition-colors duration-300">

//       {/* Header */}
//       <div className="bg-gradient-to-br from-[#2C1810] to-[#5C3317] py-16 px-5 text-center">
//         <span className="block text-[#C9A84C] text-xs sm:text-sm font-bold tracking-widest uppercase mb-2">
//           Our Menu
//         </span>
//         <h1 className="font-playfair text-2xl sm:text-3xl md:text-4xl lg:text-[3.5rem] font-black text-white">
//           Freshly Baked <em className="text-[#C9A84C] italic">Goodness</em>
//         </h1>
//       </div>

//       {/* Filter Tabs (Scrollable on Mobile) */}
//       <div className="bg-white dark:bg-[#2C1810] border-b border-yellow-700/20 transition-colors duration-300 overflow-x-auto">
//         <div
//           className="flex gap-2 sm:gap-3 px-5 py-4 sm:py-5 overflow-x-auto sm:overflow-x-visible justify-start sm:justify-center min-w-max sm:min-w-full"
//         >
//           {CATEGORIES.map(cat => (
//             <button
//               key={cat}
//               onClick={() => setCategory(cat)}
//               className={`px-5 sm:px-7 py-2 sm:py-3 text-[0.7rem] sm:text-[0.8rem] font-semibold tracking-wide uppercase border transition-all duration-300 cursor-pointer rounded-md whitespace-nowrap
//                 ${category === cat
//                   ? 'bg-[#2C1810] dark:bg-[#1A0F0A] text-[#C9A84C] border-[#2C1810] dark:border-[#C9A84C]'
//                   : 'bg-transparent text-[#5C3317] dark:text-[#C9A84C]/70 border-yellow-700/30 hover:bg-[#2C1810] hover:text-[#C9A84C] dark:hover:bg-[#1A0F0A]'
//                 }`}
//             >
//               {cat === 'all' ? 'All Items' : cat.charAt(0).toUpperCase() + cat.slice(1) + 's'}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Products Grid */}
//       <div className="max-w-[1200px] mx-auto px-5 py-12">
//         {loading ? (
//           <div className="text-center py-16 text-[#8B5E3C] dark:text-[#C9A84C] text-lg sm:text-xl">
//             🍞 Loading...
//           </div>
//         ) : products.length === 0 ? (
//           <div className="text-center py-16 text-[#8B5E3C] dark:text-[#C9A84C]">
//             <p className="text-base sm:text-lg mb-4">No products found.</p>
//             <a
//               href="/api/seed"
//               className="bg-[#C9A84C] text-[#2C1810] px-4 sm:px-6 py-2 sm:py-3 font-semibold inline-block no-underline rounded"
//             >
//               Seed Products →
//             </a>
//           </div>
//         ) : (
//           <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//             {products.map(product => (
//               <div
//                 key={product._id}
//                 className={`bg-white dark:bg-[#2C1810] border border-yellow-700/20 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${!product.inStock ? 'opacity-70' : ''}`}
//               >
//                 {/* Product Image */}
//                 <div 
//                 className={`h-52 flex items-center justify-center relative bg-gradient-to-br ${gradients[product.category]}`} >
//                   {/* {product.emoji} */}
//                   {product.image ? (
//                     <img
//                       src={product.image}
//                       alt={product.name}
//                       className="w-full h-full object-cover"
//                     />
//                   ) : (
//                     <span className="text-5xl sm:text-6xl md:text-7xl">{product.emoji}</span>
//                   )}
//                   {product.badge && (
//                     <span className="absolute top-3 right-3 bg-[#2C1810] text-[#C9A84C] text-[0.6rem] sm:text-[0.65rem] font-bold uppercase tracking-tight px-2.5 py-1 rounded">
//                       {product.badge}
//                     </span>
//                   )}
//                 </div>

//                 {/* Product Info */}
//                 <div className="p-4 sm:p-5">
//                   <div className="font-playfair text-base sm:text-lg font-semibold text-[#2C1810] dark:text-[#F5E6C0] mb-1">
//                     {product.name}
//                   </div>
//                   <span className={`inline-block text-xs font-bold px-2 py-0.5 mb-2
//                         ${product.inStock
//                       ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
//                       : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300'
//                     }`}
//                   >
//                     {product.inStock ? '🟢 Available' : '🔴 Unavailable'}
//                   </span>
//                   <div className="text-sm sm:text-[0.82rem] text-[#5C3317] dark:text-yellow-200/60 leading-relaxed mb-4">
//                     {product.description}
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <div className="font-playfair text-base sm:text-lg font-bold text-[#5C3317] dark:text-[#C9A84C]">
//                       Rs. {product.price.toLocaleString()}
//                       <span className="text-xs sm:text-sm font-normal font-jost dark:text-yellow-200/50">
//                         {' '}/ {product.unit}
//                       </span>
//                     </div>
//                     <button
//                       onClick={() => product.inStock && handleAddToCart(product)}
//                       disabled={!product.inStock}
//                       className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-xl sm:text-2xl font-bold transition-all duration-300
//                          ${product.inStock
//                           ? 'bg-[#C9A84C] text-[#2C1810] cursor-pointer hover:bg-[#2C1810] hover:text-[#C9A84C]'
//                           : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
//                         }`}
//                       title={product.inStock ? 'Add to cart' : 'Out of stock'}
//                     >
//                       {product.inStock ? '+' : '✕'}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Toast */}
//       {toast && (
//         <div className="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 bg-[#2C1810] dark:bg-[#1A0F0A] text-[#C9A84C] px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold border-l-4 border-[#C9A84C] z-50 shadow-xl rounded">
//           {toast}
//         </div>
//       )}

//     </div>
//   )
// }

















'use client'
import { useState, useEffect } from 'react'
import { useCart } from '@/components/CartContext'
import Link from 'next/link'

// const CATEGORIES = ['all', 'cake', 'bread', 'dessert', 'pastry']
// const gradients = {
//   cake: 'from-[#F5E6C0] to-[#E8C97A]',
//   bread: 'from-[#EDD9A3] to-[#C9954C]',
//   dessert: 'from-[#F9E4D4] to-[#E8A87C]',
//   pastry: 'from-[#F0E6D3] to-[#D4A57A]',
// }


const CATEGORIES = [
  'all',
  'cake',
  'bread',
  'dessert',
  'pastry',
  'juice',
  'cookies-biscuits',
  'savory-snacks',
  'fast-food',
  'beverages',
  'cupcakes',
  'brownies'
]

const gradients = {
  cake: 'from-[#F5E6C0] to-[#E8C97A]',
  bread: 'from-[#EDD9A3] to-[#C9954C]',
  dessert: 'from-[#F9E4D4] to-[#E8A87C]',
  pastry: 'from-[#F0E6D3] to-[#D4A57A]',
  juice: 'from-[#FFE5B4] to-[#FFA07A]',
  'cookies-biscuits': 'from-[#F3D5B5] to-[#C89F7B]',
  'savory-snacks': 'from-[#F5CBA7] to-[#D98880]',
  'fast-food': 'from-[#F8C471] to-[#E67E22]',
  beverages: 'from-[#D6EAF8] to-[#5DADE2]',
  cupcakes: 'from-[#FADBD8] to-[#F1948A]',
  brownies: 'from-[#D7BDE2] to-[#8E44AD]'
}

export default function MenuPage() {
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState('all')
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState('')
  const { addToCart } = useCart()

  useEffect(() => {
    fetchProducts()
  }, [category])

  async function fetchProducts() {
    setLoading(true)
    const res = await fetch(`/api/products?category=${category}`)
    const data = await res.json()
    setProducts(data.products || [])
    setLoading(false)
  }

  function handleAddToCart(e, product) {
    e.preventDefault()
    e.stopPropagation()
    if (!product.inStock) return
    addToCart(product)
    setToast(`✓ ${product.name} added to cart!`)
    setTimeout(() => setToast(''), 3000)
  }

  return (
    <div className="pt-20 min-h-screen bg-[#FDF6EC] dark:bg-[#1A0F0A] transition-colors duration-300">

      {/* Header */}
      <div className="bg-gradient-to-br from-[#2C1810] to-[#5C3317] py-16 px-5 text-center">
        <span className="block text-[#C9A84C] text-xs sm:text-sm font-bold tracking-widest uppercase mb-2">
          Our Menu
        </span>
        <h1 className="font-playfair text-2xl sm:text-3xl md:text-4xl lg:text-[3.5rem] font-black text-white">
          Freshly Baked <em className="text-[#C9A84C] italic">Goodness</em>
        </h1>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white dark:bg-[#2C1810] border-b border-yellow-700/20 transition-colors duration-300 overflow-x-auto">
        <div className="flex flex-wrap gap-2 sm:gap-3 px-5 py-4 sm:py-5 justify-start sm:justify-center min-w-max sm:min-w-full">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-5 sm:px-7 py-2 sm:py-3 text-[0.7rem] sm:text-[0.8rem] font-semibold tracking-wide uppercase border transition-all duration-300 cursor-pointer whitespace-nowrap
                ${category === cat
                  ? 'bg-[#2C1810] dark:bg-[#1A0F0A] text-[#C9A84C] border-[#2C1810] dark:border-[#C9A84C]'
                  : 'bg-transparent text-[#5C3317] dark:text-[#C9A84C]/70 border-yellow-700/30 hover:bg-[#2C1810] hover:text-[#C9A84C] dark:hover:bg-[#1A0F0A]'
                }`}
            >
              {cat === 'all' ? 'All Items' : cat.charAt(0).toUpperCase() + cat.slice(1) + 's'}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-[1200px] mx-auto px-5 py-12">
        {loading ? (
          <div className="text-center py-16 text-[#8B5E3C] dark:text-[#C9A84C] text-lg sm:text-xl">
            🍞 Loading...
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 text-[#8B5E3C] dark:text-[#C9A84C]">
            <p className="text-base sm:text-lg mb-4">No products found.</p>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map(product => (

              // ── Clickable Card → Product Detail ──
              <Link
                key={product._id}
                href={`/product/${product._id}`}
                className="no-underline block group"
              >
                <div className={`bg-white dark:bg-[#2C1810] border border-yellow-700/20 overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 ${!product.inStock ? 'opacity-70' : ''}`}>

                  {/* Image */}
                  <div className={`h-52 flex items-center justify-center relative bg-gradient-to-br ${gradients[product.category]}`}>
                    {product.image ? (
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-5xl sm:text-6xl md:text-7xl">{product.emoji}</span>
                    )}
                    {product.badge && (
                      <span className="absolute top-3 right-3 bg-[#2C1810] text-[#C9A84C] text-[0.6rem] sm:text-[0.65rem] font-bold uppercase tracking-tight px-2.5 py-1">
                        {product.badge}
                      </span>
                    )}
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-[#2C1810]/0 group-hover:bg-[#2C1810]/10 transition-all duration-300 flex items-center justify-center">
                      <span className="text-white text-xs font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 bg-[#2C1810]/70 px-3 py-1.5">
                        View Details →
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4 sm:p-5">
                    <div className="font-playfair text-base sm:text-lg font-semibold text-[#2C1810] dark:text-[#F5E6C0] mb-1">
                      {product.name}
                    </div>

                    {/* Stock Badge */}
                    <span className={`inline-block text-xs font-bold px-2 py-0.5 mb-2
                      ${product.inStock
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                        : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300'
                      }`}
                    >
                      {product.inStock ? '🟢 Available' : '🔴 Unavailable'}
                    </span>

                    <div className="text-sm sm:text-[0.82rem] text-[#5C3317] dark:text-yellow-200/60 leading-relaxed mb-4 line-clamp-2">
                      {product.description}
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="font-playfair text-base sm:text-lg font-bold text-[#5C3317] dark:text-[#C9A84C]">
                        Rs. {product.price.toLocaleString()}
                        <span className="text-xs sm:text-sm font-normal font-jost dark:text-yellow-200/50">
                          {' '}/ {product.unit}
                        </span>
                      </div>

                      {/* Add to Cart — stops link navigation */}
                      <button
                        onClick={(e) => handleAddToCart(e, product)}
                        disabled={!product.inStock}
                        className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-xl sm:text-2xl font-bold transition-all duration-300 border-none
                          ${product.inStock
                            ? 'bg-[#C9A84C] text-[#2C1810] cursor-pointer hover:bg-[#2C1810] hover:text-[#C9A84C]'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                          }`}
                        title={product.inStock ? 'Add to cart' : 'Out of stock'}
                      >
                        {product.inStock ? '+' : '✕'}
                      </button>
                    </div>
                  </div>
                </div>
              </Link>

            ))}
          </div>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 bg-[#2C1810] dark:bg-[#1A0F0A] text-[#C9A84C] px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold border-l-4 border-[#C9A84C] z-50 shadow-xl">
          {toast}
        </div>
      )}

    </div>
  )
}