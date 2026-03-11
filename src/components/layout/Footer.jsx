// import Link from 'next/link'

// export default function Footer() {
//   return (
//     <footer className="bg-[#2C1810] pt-16 pb-8 border-t border-yellow-700/20">
//       <div className="max-w-6xl mx-auto px-6">

//         {/* Top Grid */}
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12 pb-10 border-b border-yellow-700/15">

//           {/* Brand */}
//           <div className="col-span-2 lg:col-span-1">
//             <div className="text-2xl font-black tracking-widest mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
//               <span className="text-yellow-500">ZN</span>
//               <span className="text-white">Bakers</span>
//             </div>
//             <p className="text-sm text-white/50 leading-relaxed max-w-xs">
//               Artisan bakery crafting premium baked goods with love and finest ingredients. Delivering joy to every doorstep in Karachi since 2010.
//             </p>

//             {/* Social Links */}
//             <div className="flex gap-2 mt-6">
//               {[
//                 ['f', 'Facebook'],
//                 ['in', 'LinkedIn'],
//                 ['ig', 'Instagram'],
//                 ['yt', 'YouTube'],
//               ].map(([icon, label]) => (
//                 <a
//                   key={icon}
//                   href="#"
//                   aria-label={label}
//                   className="w-9 h-9 border border-yellow-700/30 flex items-center justify-center text-white/50 hover:text-yellow-500 hover:border-yellow-500 transition-all duration-300 text-sm no-underline"
//                 >
//                   {icon}
//                 </a>
//               ))}
//             </div>
//           </div>

//           {/* Menu */}
//           <div>
//             <h4 className="text-xs font-bold tracking-[2.5px] uppercase text-yellow-500 mb-5">
//               Menu
//             </h4>
//             <ul className="flex flex-col gap-3 list-none">
//               {[
//                 ['Cakes', '/menu?cat=cake'],
//                 ['Breads', '/menu?cat=bread'],
//                 ['Desserts', '/menu?cat=dessert'],
//                 ['Pastries', '/menu?cat=pastry'],
//               ].map(([label, href]) => (
//                 <li key={label}>
//                   <Link
//                     href={href}
//                     className="text-white/55 hover:text-yellow-500 no-underline text-sm transition-colors duration-300"
//                   >
//                     {label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h4 className="text-xs font-bold tracking-[2.5px] uppercase text-yellow-500 mb-5">
//               Quick Links
//             </h4>
//             <ul className="flex flex-col gap-3 list-none">
//               {[
//                 ['Home', '/'],
//                 ['Menu', '/menu'],
//                 ['Cart', '/cart'],
//                 ['My Orders', '/my-orders'],
//               ].map(([label, href]) => (
//                 <li key={label}>
//                   <Link
//                     href={href}
//                     className="text-white/55 hover:text-yellow-500 no-underline text-sm transition-colors duration-300"
//                   >
//                     {label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Contact */}
//           <div>
//             <h4 className="text-xs font-bold tracking-[2.5px] uppercase text-yellow-500 mb-5">
//               Contact
//             </h4>
//             <ul className="flex flex-col gap-3 list-none">
//               {[
//                 ['📍  Main Station Road, Jhuddo', '#'],
//                 ['📞 0300-ZN-BAKER', '#'],
//                 ['✉️ orders@znbakers.pk', '#'],
//                 ['🕐 Mon-Sun: 8AM-10PM', '#'],
//               ].map(([label, href]) => (
//                 <li key={label}>
//                   <Link
//                     href={href}
//                     className="text-white/55 hover:text-yellow-500 no-underline text-sm transition-colors duration-300"
//                   >
//                     {label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//         </div>

//         {/* Bottom Bar */}
//         <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
//           <p className="text-xs text-white/35 text-center sm:text-left">
//             © {new Date().getFullYear()} ZN Bakers. All rights reserved. Made with ❤️ in Pakistan.
//           </p>
//           <p className="text-xs text-white/25">
//             Powered by Hammad Raza
//           </p>
//         </div>

//       </div>
//     </footer>
//   )
// }







'use client'
import Link from 'next/link'
import { useTheme } from '@/components/ThemeContext'

export default function Footer() {
  const { darkMode } = useTheme()

  return (
    <footer className={`pt-16 pb-8 border-t transition-colors duration-300 ${darkMode ? 'bg-[#0F0705] border-yellow-700/20' : 'bg-[#FDFBF6] border-yellow-700/20'}`}>
      <div className="max-w-6xl mx-auto px-6">

        {/* Top Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12 pb-10 border-b transition-colors duration-300" 
             style={{ borderColor: darkMode ? 'rgba(255, 215, 0, 0.15)' : 'rgba(255, 215, 0, 0.15)'}}>
          
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <div className="text-2xl font-black tracking-widest mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              <span className="text-yellow-500">ZN</span>
              <span className={darkMode ? 'text-white' : 'text-black'}>Bakers</span>
            </div>
            <p className={`text-sm leading-relaxed max-w-xs transition-colors duration-300 ${darkMode ? 'text-white/60' : 'text-black/60'}`}>
              Artisan bakery crafting premium baked goods with love and finest ingredients. Delivering joy to every doorstep in Karachi since 2010.
            </p>

            {/* Social Links */}
            <div className="flex gap-2 mt-6">
              {[
                ['f', 'Facebook'],
                ['in', 'LinkedIn'],
                ['ig', 'Instagram'],
                ['yt', 'YouTube'],
              ].map(([icon, label]) => (
                <a
                  key={icon}
                  href="#"
                  aria-label={label}
                  className={`w-9 h-9 border flex items-center justify-center transition-all duration-300 text-sm no-underline ${darkMode ? 'border-yellow-700/20 text-white/50 hover:text-yellow-500 hover:border-yellow-500' : 'border-yellow-700/30 text-black/50 hover:text-yellow-500 hover:border-yellow-500'}`}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Menu */}
          <div>
            <h4 className="text-xs font-bold tracking-[2.5px] uppercase text-yellow-500 mb-5">
              Menu
            </h4>
            <ul className="flex flex-col gap-3 list-none">
              {[
                ['Cakes', '/menu?cat=cake'],
                ['Breads', '/menu?cat=bread'],
                ['Desserts', '/menu?cat=dessert'],
                ['Pastries', '/menu?cat=pastry'],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link
                    href={href}
                    className={`text-sm no-underline transition-colors duration-300 ${darkMode ? 'text-white/60 hover:text-yellow-500' : 'text-black/60 hover:text-yellow-500'}`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold tracking-[2.5px] uppercase text-yellow-500 mb-5">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-3 list-none">
              {[
                ['Home', '/'],
                ['Menu', '/menu'],
                ['Cart', '/cart'],
                ['My Orders', '/my-orders'],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link
                    href={href}
                    className={`text-sm no-underline transition-colors duration-300 ${darkMode ? 'text-white/60 hover:text-yellow-500' : 'text-black/60 hover:text-yellow-500'}`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold tracking-[2.5px] uppercase text-yellow-500 mb-5">
              Contact
            </h4>
            <ul className="flex flex-col gap-3 list-none">
              {[
                ['📍 Main Station Road, Jhuddo', '#'],
                ['📞 0300-ZN-BAKER', '#'],
                ['✉️ orders@znbakers.pk', '#'],
                ['🕐 Mon-Sun: 8AM-10PM', '#'],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link
                    href={href}
                    className={`text-sm no-underline transition-colors duration-300 ${darkMode ? 'text-white/60 hover:text-yellow-500' : 'text-black/60 hover:text-yellow-500'}`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 transition-colors duration-300">
          <p className={`text-xs text-center sm:text-left ${darkMode ? 'text-white/30' : 'text-black/30'}`}>
            © {new Date().getFullYear()} ZN Bakers. All rights reserved. Made with ❤️ in Pakistan.
          </p>
          <p className={`text-xs ${darkMode ? 'text-white/20' : 'text-black/20'}`}>
            Powered by Hammad Raza
          </p>
        </div>

      </div>
    </footer>
  )
}