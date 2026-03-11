// 'use client'
// import Link from 'next/link'
// import { useSession, signOut } from 'next-auth/react'
// import { useState, useEffect } from 'react'
// import { useCart } from '@/components/CartContext'
// import { useTheme } from '@/components/ThemeContext'

// export default function Navbar() {
//   const { data: session } = useSession()
//   const { cartCount } = useCart()
//   const { darkMode, toggleTheme } = useTheme()
//   const [scrolled, setScrolled] = useState(false)
//   const [menuOpen, setMenuOpen] = useState(false)

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 20)
//     window.addEventListener('scroll', handleScroll)
//     return () => window.removeEventListener('scroll', handleScroll)
//   }, [])

//   const isAdmin = session?.user?.role === 'admin'
//   const adminLinks = [['/admin', 'Dashboard']]
//   const userLinks = [['/', 'Home'], ['/menu', 'Menu'], ['/my-orders', 'My Orders'], ['/contact', 'Contact']]
//   const navLinks = isAdmin ? adminLinks : userLinks

//   return (
//     <>
//       <nav className={`fixed top-0 w-full z-50 border-b border-yellow-700/30 backdrop-blur-md transition-all duration-300 ${scrolled ? 'bg-[#2C1810]/97' : 'bg-[#2C1810]/90'}`}>
//         <div className="max-w-6xl mx-auto px-6 flex items-center justify-between" style={{ height: 72 }}>

//           {/* Logo */}
//           <Link
//             href={isAdmin ? '/admin' : '/'}
//             className="text-3xl font-black tracking-widest no-underline"
//             style={{ fontFamily: 'Playfair Display, serif' }}
//           >
//             <span className="text-yellow-500">ZN</span>
//             <span className="text-white">Bakers</span>
//           </Link>

//           {/* Desktop Links */}
//           <ul className="hidden md:flex gap-8 list-none items-center">
//             {navLinks.map(([href, label]) => (
//               <li key={href}>
//                 <Link href={href} className="text-white/80 hover:text-yellow-500 no-underline text-sm font-medium tracking-widest uppercase transition-colors duration-300">
//                   {label}
//                   {label === 'Cart' && cartCount > 0 && (
//                     <span className="bg-yellow-500 text-[#2C1810] rounded-full px-2 py-0.5 text-xs ml-1 font-bold">{cartCount}</span>
//                   )}
//                 </Link>
//               </li>
//             ))}
//           </ul>

//           {/* Desktop Right */}
//           <div className="hidden md:flex gap-3 items-center">

//             {/* 🌙 Dark Mode Toggle */}
//             <button
//               onClick={toggleTheme}
//               className="w-10 h-10 flex items-center justify-center border border-yellow-500/30 text-yellow-500 hover:bg-yellow-500/10 transition-all duration-300 cursor-pointer bg-transparent text-lg"
//               title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
//             >
//               {darkMode ? '☀️' : '🌙'}
//             </button>

//              {/* Cart Icon */}
//             <Link href="/cart" className="relative text-white text-lg no-underline">
//               🛒
//               {cartCount > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-yellow-500 text-[#2C1810] rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold">
//                   {cartCount}
//                 </span>
//               )}
//             </Link>

//             {session ? (
//               <>
//                 <span className="text-white/60 text-sm">
//                   {isAdmin ? '👑' : '👤'} {session.user.name?.split(' ')[0]}
//                 </span>
//                 <button
//                   onClick={() => signOut({ callbackUrl: '/login' })}
//                   className="bg-transparent border border-yellow-500/50 text-yellow-500 px-4 py-2 text-xs font-semibold tracking-widest uppercase cursor-pointer hover:bg-yellow-500/10 transition-all duration-300"
//                 >
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <>
//                 <Link href="/login" className="text-white/70 no-underline text-sm font-medium tracking-wide hover:text-yellow-500 transition-colors">Login</Link>
//                 <Link href="/register" className="bg-yellow-500 text-[#2C1810] px-5 py-2.5 text-xs font-bold tracking-widest uppercase no-underline hover:bg-yellow-400 transition-all duration-300">Sign Up</Link>
//               </>
//             )}
//           </div>

//           {/* Mobile Right */}
//           <div className="flex md:hidden items-center gap-2">
//             {/* Theme Toggle Mobile */}
//             <button
//               onClick={toggleTheme}
//               className="w-9 h-9 flex items-center justify-center border border-yellow-500/30 text-yellow-500 bg-transparent cursor-pointer text-base"
//             >
//               {darkMode ? '☀️' : '🌙'}
//             </button>

//             {!isAdmin && (
//               <Link href="/cart" className="text-white/80 no-underline relative px-1">
//                 🛒
//                 {cartCount > 0 && (
//                   <span className="absolute -top-2 -right-1 bg-yellow-500 text-[#2C1810] rounded-full w-4 h-4 text-xs flex items-center justify-center font-bold">{cartCount}</span>
//                 )}
//               </Link>
//             )}

//             <button
//               onClick={() => setMenuOpen(!menuOpen)}
//               className="text-white flex flex-col gap-1.5 p-1 cursor-pointer bg-transparent border-none"
//             >
//               <span className={`block w-6 h-0.5 bg-yellow-500 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
//               <span className={`block w-6 h-0.5 bg-yellow-500 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
//               <span className={`block w-6 h-0.5 bg-yellow-500 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
//             </button>
//           </div>

//         </div>
//       </nav>

//       {/* Mobile Menu */}
//       <div className={`fixed top-[72px] left-0 w-full z-40 bg-[#2C1810] border-b border-yellow-700/30 transition-all duration-300 md:hidden ${menuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
//         <div className="flex flex-col px-6 py-4 gap-1">
//           {navLinks.map(([href, label]) => (
//             <Link
//               key={href}
//               href={href}
//               onClick={() => setMenuOpen(false)}
//               className="text-white/80 hover:text-yellow-500 no-underline text-sm font-medium tracking-widest uppercase py-3 border-b border-yellow-700/20 transition-colors duration-300"
//             >
//               {label}
//               {label === 'Cart' && cartCount > 0 && (
//                 <span className="bg-yellow-500 text-[#2C1810] rounded-full px-2 py-0.5 text-xs ml-2 font-bold">{cartCount}</span>
//               )}
//             </Link>
//           ))}

//           <div className="pt-3">
//             {session ? (
//               <div className="flex items-center justify-between">
//                 <span className="text-white/60 text-sm">{isAdmin ? '👑 Admin' : `👤 ${session.user.name?.split(' ')[0]}`}</span>
//                 <button
//                   onClick={() => { signOut({ callbackUrl: '/login' }); setMenuOpen(false) }}
//                   className="bg-transparent border border-yellow-500/50 text-yellow-500 px-4 py-2 text-xs font-semibold tracking-widest uppercase cursor-pointer"
//                 >
//                   Logout
//                 </button>
//               </div>
//             ) : (
//               <div className="flex gap-3">
//                 <Link href="/login" onClick={() => setMenuOpen(false)} className="flex-1 text-center border border-yellow-500/50 text-yellow-500 py-2.5 text-xs font-semibold tracking-widest uppercase no-underline">Login</Link>
//                 <Link href="/register" onClick={() => setMenuOpen(false)} className="flex-1 text-center bg-yellow-500 text-[#2C1810] py-2.5 text-xs font-bold tracking-widest uppercase no-underline">Sign Up</Link>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }







'use client'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { useCart } from '@/components/CartContext'
import { useTheme } from '@/components/ThemeContext'

export default function Navbar() {
  const { data: session } = useSession()
  const { cartCount } = useCart()
  const { darkMode, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isAdmin = session?.user?.role === 'admin'
  const adminLinks = [['/admin', 'Dashboard']]
  const userLinks = [['/', 'Home'], ['/menu', 'Menu'], ['/my-orders', 'My Orders'], ['/contact', 'Contact']]
  const navLinks = isAdmin ? adminLinks : userLinks

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 border-b border-yellow-700/30 backdrop-blur-md transition-all duration-300 ${scrolled ? 'bg-white/95 dark:bg-[#2C1810]/95' : 'bg-white/90 dark:bg-[#2C1810]/90'}`}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between" style={{ height: 72 }}>

          {/* Logo */}
          <Link
            href={isAdmin ? '/admin' : '/'}
            className="text-3xl font-black tracking-widest no-underline"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            <span className="text-yellow-500">ZN</span>
            <span className={`text-black dark:text-white`}>Bakers</span>
          </Link>

          {/* Desktop Links */}
          <ul className="hidden md:flex gap-8 list-none items-center">
            {navLinks.map(([href, label]) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-black dark:text-white/80 hover:text-yellow-500 dark:hover:text-yellow-400 no-underline text-sm font-medium tracking-widest uppercase transition-colors duration-300"
                >
                  {label}
                  {label === 'Cart' && cartCount > 0 && (
                    <span className="bg-yellow-500 text-[#2C1810] rounded-full px-2 py-0.5 text-xs ml-1 font-bold">{cartCount}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop Right */}
          <div className="hidden md:flex gap-3 items-center">

            {/* 🌙 Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="w-10 h-10 flex items-center justify-center border border-yellow-500/30 text-yellow-500 hover:bg-yellow-500/10 transition-all duration-300 cursor-pointer bg-transparent text-lg rounded-md"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>

             {/* Cart Icon */}
            {!isAdmin && (
              <Link href="/cart" className="relative text-black dark:text-white text-lg no-underline">
                🛒
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-yellow-500 text-[#2C1810] rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}

            {session ? (
              <>
                <span className="text-black dark:text-white/60 text-sm">
                  {isAdmin ? '👑' : '👤'} {session.user.name?.split(' ')[0]}
                </span>
                <button
                  onClick={() => signOut({ callbackUrl: '/login' })}
                  className="bg-transparent border border-yellow-500/50 text-yellow-500 px-4 py-2 text-xs font-semibold tracking-widest uppercase cursor-pointer hover:bg-yellow-500/10 transition-all duration-300 rounded-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-black dark:text-white/70 no-underline text-sm font-medium tracking-wide hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors">Login</Link>
                <Link href="/register" className="bg-yellow-500 text-[#2C1810] px-5 py-2.5 text-xs font-bold tracking-widest uppercase no-underline hover:bg-yellow-400 transition-all duration-300 rounded-md">Sign Up</Link>
              </>
            )}
          </div>

          {/* Mobile Right */}
          <div className="flex md:hidden items-center gap-2">
            {/* Theme Toggle Mobile */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 flex items-center justify-center border border-yellow-500/30 text-yellow-500 bg-transparent cursor-pointer text-base rounded-md"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>

            {!isAdmin && (
              <Link href="/cart" className="text-black dark:text-white/80 no-underline relative px-1">
                🛒
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-1 bg-yellow-500 text-[#2C1810] rounded-full w-4 h-4 text-xs flex items-center justify-center font-bold">{cartCount}</span>
                )}
              </Link>
            )}

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-black dark:text-white flex flex-col gap-1.5 p-1 cursor-pointer bg-transparent border-none"
            >
              <span className={`block w-6 h-0.5 bg-yellow-500 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-yellow-500 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-yellow-500 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed top-[72px] left-0 w-full z-40 bg-white dark:bg-[#2C1810] border-b border-yellow-700/30 transition-all duration-300 md:hidden ${menuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
        <div className="flex flex-col px-6 py-4 gap-1">
          {navLinks.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="text-black dark:text-white/80 hover:text-yellow-500 dark:hover:text-yellow-400 no-underline text-sm font-medium tracking-widest uppercase py-3 border-b border-yellow-700/20 transition-colors duration-300"
            >
              {label}
              {label === 'Cart' && cartCount > 0 && (
                <span className="bg-yellow-500 text-[#2C1810] rounded-full px-2 py-0.5 text-xs ml-2 font-bold">{cartCount}</span>
              )}
            </Link>
          ))}

          <div className="pt-3">
            {session ? (
              <div className="flex items-center justify-between">
                <span className="text-black dark:text-white/60 text-sm">{isAdmin ? '👑 Admin' : `👤 ${session.user.name?.split(' ')[0]}`}</span>
                <button
                  onClick={() => { signOut({ callbackUrl: '/login' }); setMenuOpen(false) }}
                  className="bg-transparent border border-yellow-500/50 text-yellow-500 px-4 py-2 text-xs font-semibold tracking-widest uppercase cursor-pointer rounded-md"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
                <Link href="/login" onClick={() => setMenuOpen(false)} className="flex-1 text-center border border-yellow-500/50 text-yellow-500 py-2.5 text-xs font-semibold tracking-widest uppercase no-underline rounded-md">Login</Link>
                <Link href="/register" onClick={() => setMenuOpen(false)} className="flex-1 text-center bg-yellow-500 text-[#2C1810] py-2.5 text-xs font-bold tracking-widest uppercase no-underline rounded-md">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}