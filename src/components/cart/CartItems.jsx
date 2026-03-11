// import { useCart } from '@/components/CartContext'

// export default function CartItems() {
//   const { cart, removeFromCart, updateQty } = useCart()

//   return (
//     <div className="bg-white dark:bg-[#2C1810] border border-yellow-700/20 overflow-hidden">
//       {cart.map((item, i) => (
//         <div
//           key={item._id}
//           className={`flex items-center gap-3 sm:gap-4 p-4 sm:p-5 ${i !== cart.length - 1 ? 'border-b border-yellow-700/15' : ''}`}
//         >
//           {/* Emoji */}
//           <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center text-3xl sm:text-4xl bg-[#FDF6EC] dark:bg-[#1A0F0A] flex-shrink-0">
//             {item.emoji}
//           </div>

//           {/* Name + Price */}
//           <div className="flex-1 min-w-0">
//             <div
//               className="font-semibold text-sm sm:text-base text-[#2C1810] dark:text-[#F5E6C0] truncate"
//               style={{ fontFamily: 'Playfair Display, serif' }}
//             >
//               {item.name}
//             </div>
//             <div className="text-xs sm:text-sm text-[#8B5E3C] dark:text-yellow-200/60">
//               Rs. {item.price.toLocaleString()} / {item.unit}
//             </div>
//           </div>

//           {/* Qty Controls */}
//           <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
//             <button
//               onClick={() => updateQty(item._id, item.quantity - 1)}
//               className="w-7 h-7 sm:w-8 sm:h-8 bg-[#FDF6EC] dark:bg-[#1A0F0A] border border-yellow-700/30 cursor-pointer text-[#2C1810] dark:text-[#F5E6C0] flex items-center justify-center hover:bg-yellow-500 hover:text-[#2C1810] transition-colors"
//             >
//               −
//             </button>
//             <span className="font-bold text-sm sm:text-base w-5 text-center text-[#2C1810] dark:text-[#F5E6C0]">
//               {item.quantity}
//             </span>
//             <button
//               onClick={() => updateQty(item._id, item.quantity + 1)}
//               className="w-7 h-7 sm:w-8 sm:h-8 bg-[#FDF6EC] dark:bg-[#1A0F0A] border border-yellow-700/30 cursor-pointer text-[#2C1810] dark:text-[#F5E6C0] flex items-center justify-center hover:bg-yellow-500 hover:text-[#2C1810] transition-colors"
//             >
//               +
//             </button>
//           </div>

//           {/* Item Total */}
//           <div
//             className="font-bold text-sm sm:text-base text-[#2C1810] dark:text-[#C9A84C] w-20 sm:w-24 text-right flex-shrink-0"
//             style={{ fontFamily: 'Playfair Display, serif' }}
//           >
//             Rs. {(item.price * item.quantity).toLocaleString()}
//           </div>

//           {/* Remove */}
//           <button
//             onClick={() => removeFromCart(item._id)}
//             className="text-red-400 hover:text-red-600 cursor-pointer bg-transparent border-none text-lg sm:text-xl px-1 flex-shrink-0 transition-colors"
//           >
//             ×
//           </button>
//         </div>
//       ))}
//     </div>
//   )
// }



import { useCart } from '@/components/CartContext'

export default function CartItems() {
  const { cart, removeFromCart, updateQty } = useCart()

  return (
    <div className="bg-white dark:bg-[#2C1810] border border-yellow-700/20 overflow-hidden rounded-md">
      {cart.map((item, i) => (
        <div
          key={item._id}
          className={`flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-4 sm:p-5 ${
            i !== cart.length - 1 ? 'border-b border-yellow-700/15 dark:border-yellow-700/25' : ''
          }`}
        >
          {/* Emoji */}
          <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center text-3xl sm:text-4xl bg-[#FDF6EC] dark:bg-[#1A0F0A] flex-shrink-0 rounded-md">
            {item.emoji}
          </div>

          {/* Name + Price */}
          <div className="flex-1 min-w-0 w-full sm:w-auto flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
            <div className="flex-1 min-w-0">
              <div
                className="font-semibold text-sm sm:text-base text-[#2C1810] dark:text-[#F5E6C0] truncate"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                {item.name}
              </div>
              <div className="text-xs sm:text-sm text-[#8B5E3C] dark:text-yellow-200/60 truncate">
                Rs. {item.price.toLocaleString()} / {item.unit}
              </div>
            </div>

            {/* Qty Controls */}
            <div className="flex items-center gap-1 sm:gap-2 mt-2 sm:mt-0">
              <button
                onClick={() => updateQty(item._id, item.quantity - 1)}
                className="w-7 h-7 sm:w-8 sm:h-8 bg-[#FDF6EC] dark:bg-[#1A0F0A] border border-yellow-700/30 cursor-pointer text-[#2C1810] dark:text-[#F5E6C0] flex items-center justify-center hover:bg-yellow-500 hover:text-[#2C1810] transition-colors rounded-md"
              >
                −
              </button>
              <span className="font-bold text-sm sm:text-base w-5 text-center text-[#2C1810] dark:text-[#F5E6C0]">
                {item.quantity}
              </span>
              <button
                onClick={() => updateQty(item._id, item.quantity + 1)}
                className="w-7 h-7 sm:w-8 sm:h-8 bg-[#FDF6EC] dark:bg-[#1A0F0A] border border-yellow-700/30 cursor-pointer text-[#2C1810] dark:text-[#F5E6C0] flex items-center justify-center hover:bg-yellow-500 hover:text-[#2C1810] transition-colors rounded-md"
              >
                +
              </button>
            </div>
          </div>

          {/* Item Total + Remove */}
          <div className="flex items-center justify-between w-full sm:w-auto mt-2 sm:mt-0 gap-2">
            <div
              className="font-bold text-sm sm:text-base text-[#2C1810] dark:text-[#C9A84C] w-full sm:w-20 text-right"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Rs. {(item.price * item.quantity).toLocaleString()}
            </div>
            <button
              onClick={() => removeFromCart(item._id)}
              className="text-red-400 hover:text-red-600 cursor-pointer text-lg sm:text-xl transition-colors"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

