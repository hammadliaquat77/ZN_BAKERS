// import { useState } from 'react'

// const STATUS_COLORS = {
//   pending: { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-600 dark:text-yellow-300' },
//   confirmed: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-600 dark:text-blue-300' },
//   preparing: { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-600 dark:text-purple-300' },
//   out_for_delivery: { bg: 'bg-pink-100 dark:bg-pink-900/30', text: 'text-pink-600 dark:text-pink-300' },
//   delivered: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-600 dark:text-green-300' },
//   cancelled: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-600 dark:text-red-300' },
// }

// export default function OrdersTable({ orders, onUpdateStatus, onDelete }) {
//   const [expandedOrder, setExpandedOrder] = useState(null)

//   return (
//     <div className="bg-white dark:bg-[#2C1810] border border-yellow-700/20 overflow-x-auto transition-colors">

//       <table className="w-full border-collapse">

//         {/* HEADER */}
//         <thead>
//           <tr className="bg-[#2C1810]">
//             {['Order ID', 'Customer', 'Items', 'Total', 'Payment', 'Status', 'Action'].map(h => (
//               <th
//                 key={h}
//                 className="px-4 py-3 text-left text-xs font-bold tracking-widest uppercase text-yellow-500 whitespace-nowrap"
//               >
//                 {h}
//               </th>
//             ))}
//           </tr>
//         </thead>

//         <tbody>

//           {orders.length === 0 ? (
//             <tr>
//               <td colSpan={7} className="text-center py-12 text-[#8B5E3C] dark:text-yellow-300">
//                 📦 No orders yet.
//               </td>
//             </tr>
//           ) : (

//             orders.map((order, i) => {
//               const sc = STATUS_COLORS[order.status] || STATUS_COLORS.pending
//               const isExpanded = expandedOrder === order._id

//               return (
//                 <>
//                   {/* MAIN ROW */}
//                   <tr
//                     key={order._id}
//                     className={`border-b border-yellow-700/10 
//                     ${i % 2 === 0
//                         ? 'bg-white dark:bg-[#2C1810]'
//                         : 'bg-[#FDFAF5] dark:bg-[#1A0F0A]'
//                       }`}
//                   >

//                     {/* Order ID */}
//                     <td className="px-4 py-3 font-mono text-xs text-[#8B5E3C] dark:text-yellow-300">
//                       #{order._id.slice(-6).toUpperCase()}
//                     </td>

//                     {/* Customer */}
//                     <td className="px-4 py-3">
//                       <div className="font-semibold text-sm text-[#2C1810] dark:text-yellow-200">
//                         {order.customerName}
//                       </div>
//                       <div className="text-xs text-[#8B5E3C] dark:text-yellow-400">
//                         {order.customerPhone}
//                       </div>
//                     </td>

//                     {/* Items */}
//                     <td className="px-4 py-3">
//                       <button
//                         onClick={() => setExpandedOrder(isExpanded ? null : order._id)}
//                         className="text-xs font-semibold text-yellow-600 dark:text-yellow-300 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 px-2.5 py-1.5 hover:bg-yellow-100 dark:hover:bg-yellow-900/40 transition-colors"
//                       >
//                         {order.items?.length} item(s) {isExpanded ? '▲' : '▼'}
//                       </button>
//                     </td>

//                     {/* Total */}
//                     <td
//                       className="px-4 py-3 font-bold text-[#2C1810] dark:text-yellow-200 whitespace-nowrap"
//                       style={{ fontFamily: 'Playfair Display, serif' }}
//                     >
//                       Rs. {order.totalAmount?.toLocaleString()}
//                     </td>

//                     {/* Payment */}
//                     <td className="px-4 py-3">
//                       <span
//                         className={`text-xs font-semibold px-2 py-1 
//                         ${order.paymentMethod === 'cod'
//                             ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
//                             : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
//                           }`}
//                       >
//                         {order.paymentMethod?.toUpperCase()}
//                       </span>
//                     </td>

//                     {/* Status */}
//                     <td className="px-4 py-3">
//                       <span className={`text-xs font-semibold px-2.5 py-1 ${sc.bg} ${sc.text}`}>
//                         {order.status?.replace('_', ' ').toUpperCase()}
//                       </span>
//                     </td>

//                     {/* ACTIONS */}
//                     <td className="px-4 py-3">
//                       <div className="flex flex-col gap-2 min-w-[160px]">

//                         <select
//                           value={order.status}
//                           onChange={e => onUpdateStatus(order._id, e.target.value)}
//                           className="px-2 py-1.5 bg-[#FDF6EC] dark:bg-[#1A0F0A] border border-yellow-700/30 text-xs outline-none text-[#2C1810] dark:text-yellow-200 w-full"
//                         >
//                           {['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'].map(s => (
//                             <option key={s} value={s}>{s.replace('_', ' ')}</option>
//                           ))}
//                         </select>

//                         <button
//                           onClick={() => onDelete(order._id)}
//                           className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 px-3 py-1.5 text-xs font-semibold hover:bg-red-600 hover:text-white transition-all"
//                         >
//                           🗑 Delete Order
//                         </button>

//                       </div>
//                     </td>

//                   </tr>

//                   {/* EXPANDED ROW */}
//                   {isExpanded && (
//                     <tr className="bg-[#FDF6EC] dark:bg-[#1A0F0A]">
//                       <td colSpan={7} className="px-6 py-4 border-b border-yellow-700/20">

//                         <div className="mb-2 text-xs font-bold tracking-widest uppercase text-yellow-600 dark:text-yellow-300">
//                           📦 Order Items — #{order._id.slice(-6).toUpperCase()}
//                         </div>

//                         {/* Items */}
//                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
//                           {order.items?.map((item, idx) => (
//                             <div
//                               key={idx}
//                               className="bg-white dark:bg-[#2C1810] border border-yellow-700/15 p-3 flex items-center gap-3"
//                             >
//                               <div className="text-3xl">🎂</div>

//                               <div className="flex-1 min-w-0">
//                                 <div className="font-semibold text-sm text-[#2C1810] dark:text-yellow-200 truncate">
//                                   {item.name}
//                                 </div>

//                                 <div className="text-xs text-[#8B5E3C] dark:text-yellow-400">
//                                   Rs. {item.price?.toLocaleString()} × {item.quantity}
//                                 </div>
//                               </div>

//                               <div
//                                 className="font-bold text-sm text-[#2C1810] dark:text-yellow-200 whitespace-nowrap"
//                                 style={{ fontFamily: 'Playfair Display, serif' }}
//                               >
//                                 Rs. {(item.price * item.quantity)?.toLocaleString()}
//                               </div>
//                             </div>
//                           ))}
//                         </div>


//                         {/* Customer / Delivery Info */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

//                           {/* Customer Details */}
//                           <div className="bg-white dark:bg-[#2C1810] border border-yellow-700/15 p-4">

//                             <div className="text-xs font-bold tracking-widest uppercase text-yellow-600 dark:text-yellow-300 mb-3">
//                               👤 Customer Details
//                             </div>

//                             <div className="space-y-1 text-sm text-[#2C1810] dark:text-yellow-200">
//                               <p><span className="font-semibold">Name:</span> {order.customerName}</p>
//                               <p><span className="font-semibold">📞 Phone:</span> {order.customerPhone}</p>
//                               <p><span className="font-semibold">📍 Address:</span> {order.deliveryAddress}</p>

//                               {order.specialInstructions && (
//                                 <p><span className="font-semibold">📝 Note:</span> {order.specialInstructions}</p>
//                               )}
//                             </div>

//                           </div>


//                           {/* Price Summary */}
//                           <div className="bg-white dark:bg-[#2C1810] border border-yellow-700/15 p-4">

//                             <div className="text-xs font-bold tracking-widest uppercase text-yellow-600 dark:text-yellow-300 mb-3">
//                               💰 Order Summary
//                             </div>

//                             <div className="space-y-1">

//                               <div className="flex justify-between text-sm">
//                                 <span className="text-[#8B5E3C] dark:text-yellow-400">Subtotal</span>
//                                 <span className="text-[#2C1810] dark:text-yellow-200">
//                                   Rs. {order.totalAmount?.toLocaleString()}
//                                 </span>
//                               </div>

//                               <div className="flex justify-between text-sm">
//                                 <span className="text-[#8B5E3C] dark:text-yellow-400">Delivery</span>
//                                 <span className={order.totalAmount >= 2000 ? 'text-green-600 font-semibold' : 'text-[#2C1810] dark:text-yellow-200'}>
//                                   {order.totalAmount >= 2000 ? 'FREE' : 'Rs. 150'}
//                                 </span>
//                               </div>

//                               <div className="flex justify-between border-t border-yellow-700/20 pt-2 mt-2">
//                                 <span className="font-bold text-[#2C1810] dark:text-yellow-200">
//                                   Total
//                                 </span>

//                                 <span
//                                   className="font-bold text-yellow-600"
//                                   style={{ fontFamily: 'Playfair Display, serif' }}
//                                 >
//                                   Rs. {(order.totalAmount + (order.totalAmount >= 2000 ? 0 : 150))?.toLocaleString()}
//                                 </span>
//                               </div>

//                             </div>

//                           </div>

//                         </div>

//                       </td>
//                     </tr>
//                   )}

//                 </>
//               )
//             })

//           )}

//         </tbody>

//       </table>

//     </div>
//   )
// }




import { useState } from 'react'

const STATUS_COLORS = {
  pending: { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-600 dark:text-yellow-300' },
  confirmed: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-600 dark:text-blue-300' },
  preparing: { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-600 dark:text-purple-300' },
  out_for_delivery: { bg: 'bg-pink-100 dark:bg-pink-900/30', text: 'text-pink-600 dark:text-pink-300' },
  delivered: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-600 dark:text-green-300' },
  cancelled: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-600 dark:text-red-300' },
}

const PAYMENT_STATUS_COLORS = {
  pending:   { bg: 'bg-gray-100 dark:bg-gray-800',       text: 'text-gray-600 dark:text-gray-300' },
  submitted: { bg: 'bg-blue-100 dark:bg-blue-900/30',    text: 'text-blue-600 dark:text-blue-300' },
  verified:  { bg: 'bg-green-100 dark:bg-green-900/30',  text: 'text-green-600 dark:text-green-300' },
  rejected:  { bg: 'bg-red-100 dark:bg-red-900/30',      text: 'text-red-600 dark:text-red-300' },
}

export default function OrdersTable({ orders, onUpdateStatus, onDelete }) {
  const [expandedOrder, setExpandedOrder] = useState(null)

  async function handlePaymentVerify(orderId, paymentStatus) {
    await onUpdateStatus(orderId, paymentStatus)
  }

  return (
    <div className="bg-white dark:bg-[#2C1810] border border-yellow-700/20 overflow-x-auto transition-colors">
      <table className="w-full border-collapse">

        {/* HEADER */}
        <thead>
          <tr className="bg-[#2C1810]">
            {['Order ID', 'Customer', 'Items', 'Total', 'Payment', 'Status', 'Action'].map(h => (
              <th key={h} className="px-4 py-3 text-left text-xs font-bold tracking-widest uppercase text-yellow-500 whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center py-12 text-[#8B5E3C] dark:text-yellow-300">
                📦 No orders yet.
              </td>
            </tr>
          ) : orders.map((order, i) => {
            const sc = STATUS_COLORS[order.status] || STATUS_COLORS.pending
            const pc = PAYMENT_STATUS_COLORS[order.paymentStatus] || PAYMENT_STATUS_COLORS.pending
            const isExpanded = expandedOrder === order._id
            const isOnline = order.paymentMethod === 'jazzcash' || order.paymentMethod === 'easypaisa'

            return (
              <>
                {/* MAIN ROW */}
                <tr
                  key={order._id}
                  className={`border-b border-yellow-700/10 ${i % 2 === 0 ? 'bg-white dark:bg-[#2C1810]' : 'bg-[#FDFAF5] dark:bg-[#1A0F0A]'}`}
                >
                  {/* Order ID */}
                  <td className="px-4 py-3 font-mono text-xs text-[#8B5E3C] dark:text-yellow-300">
                    #{order._id.slice(-6).toUpperCase()}
                  </td>

                  {/* Customer */}
                  <td className="px-4 py-3">
                    <div className="font-semibold text-sm text-[#2C1810] dark:text-yellow-200">{order.customerName}</div>
                    <div className="text-xs text-[#8B5E3C] dark:text-yellow-400">{order.customerPhone}</div>
                  </td>

                  {/* Items */}
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setExpandedOrder(isExpanded ? null : order._id)}
                      className="text-xs font-semibold text-yellow-600 dark:text-yellow-300 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 px-2.5 py-1.5 hover:bg-yellow-100 transition-colors cursor-pointer"
                    >
                      {order.items?.length} item(s) {isExpanded ? '▲' : '▼'}
                    </button>
                  </td>

                  {/* Total */}
                  <td className="px-4 py-3 font-bold text-[#2C1810] dark:text-yellow-200 whitespace-nowrap" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Rs. {order.totalAmount?.toLocaleString()}
                  </td>

                  {/* Payment */}
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-1">
                      <span className={`text-xs font-semibold px-2 py-1 ${order.paymentMethod === 'cod' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'}`}>
                        {order.paymentMethod?.toUpperCase()}
                      </span>
                      {/* Payment Status Badge */}
                      {isOnline && (
                        <span className={`text-xs font-semibold px-2 py-1 ${pc.bg} ${pc.text}`}>
                          {order.paymentStatus?.toUpperCase() || 'PENDING'}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 ${sc.bg} ${sc.text}`}>
                      {order.status?.replace('_', ' ').toUpperCase()}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-2 min-w-[160px]">
                      <select
                        value={order.status}
                        onChange={e => onUpdateStatus(order._id, e.target.value)}
                        className="px-2 py-1.5 bg-[#FDF6EC] dark:bg-[#1A0F0A] border border-yellow-700/30 text-xs outline-none text-[#2C1810] dark:text-yellow-200 w-full cursor-pointer"
                      >
                        {['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'].map(s => (
                          <option key={s} value={s}>{s.replace('_', ' ')}</option>
                        ))}
                      </select>
                      <button
                        onClick={() => onDelete(order._id)}
                        className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 px-3 py-1.5 text-xs font-semibold hover:bg-red-600 hover:text-white transition-all cursor-pointer border-none"
                      >
                        🗑 Delete Order
                      </button>
                    </div>
                  </td>
                </tr>

                {/* EXPANDED ROW */}
                {isExpanded && (
                  <tr className="bg-[#FDF6EC] dark:bg-[#1A0F0A]">
                    <td colSpan={7} className="px-6 py-4 border-b border-yellow-700/20">

                      <div className="mb-2 text-xs font-bold tracking-widest uppercase text-yellow-600 dark:text-yellow-300">
                        📦 Order Items — #{order._id.slice(-6).toUpperCase()}
                      </div>

                      {/* Items Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                        {order.items?.map((item, idx) => (
                          <div key={idx} className="bg-white dark:bg-[#2C1810] border border-yellow-700/15 p-3 flex items-center gap-3">
                            <div className="text-3xl">🎂</div>
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-sm text-[#2C1810] dark:text-yellow-200 truncate">{item.name}</div>
                              <div className="text-xs text-[#8B5E3C] dark:text-yellow-400">Rs. {item.price?.toLocaleString()} × {item.quantity}</div>
                            </div>
                            <div className="font-bold text-sm text-[#2C1810] dark:text-yellow-200 whitespace-nowrap" style={{ fontFamily: 'Playfair Display, serif' }}>
                              Rs. {(item.price * item.quantity)?.toLocaleString()}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Info Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

                        {/* Customer Details */}
                        <div className="bg-white dark:bg-[#2C1810] border border-yellow-700/15 p-4">
                          <div className="text-xs font-bold tracking-widest uppercase text-yellow-600 dark:text-yellow-300 mb-3">
                            👤 Customer Details
                          </div>
                          <div className="space-y-1 text-sm text-[#2C1810] dark:text-yellow-200">
                            <p><span className="font-semibold">Name:</span> {order.customerName}</p>
                            <p><span className="font-semibold">📞 Phone:</span> {order.customerPhone}</p>
                            <p><span className="font-semibold">📍 Address:</span> {order.deliveryAddress}</p>
                            {order.specialInstructions && (
                              <p><span className="font-semibold">📝 Note:</span> {order.specialInstructions}</p>
                            )}
                          </div>
                        </div>

                        {/* Price Summary */}
                        <div className="bg-white dark:bg-[#2C1810] border border-yellow-700/15 p-4">
                          <div className="text-xs font-bold tracking-widest uppercase text-yellow-600 dark:text-yellow-300 mb-3">
                            💰 Order Summary
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span className="text-[#8B5E3C] dark:text-yellow-400">Subtotal</span>
                              <span className="text-[#2C1810] dark:text-yellow-200">Rs. {order.totalAmount?.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-[#8B5E3C] dark:text-yellow-400">Delivery</span>
                              <span className={order.totalAmount >= 2000 ? 'text-green-600 font-semibold' : 'text-[#2C1810] dark:text-yellow-200'}>
                                {order.totalAmount >= 2000 ? 'FREE' : 'Rs. 150'}
                              </span>
                            </div>
                            <div className="flex justify-between border-t border-yellow-700/20 pt-2 mt-2">
                              <span className="font-bold text-[#2C1810] dark:text-yellow-200">Total</span>
                              <span className="font-bold text-yellow-600" style={{ fontFamily: 'Playfair Display, serif' }}>
                                Rs. {(order.totalAmount + (order.totalAmount >= 2000 ? 0 : 150))?.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>

                      </div>

                      {/* ── PAYMENT SCREENSHOT SECTION ── */}
                      {isOnline && (
                        <div className="bg-white dark:bg-[#2C1810] border border-yellow-700/15 p-4">
                          <div className="text-xs font-bold tracking-widest uppercase text-yellow-600 dark:text-yellow-300 mb-3">
                            📸 Payment Verification
                          </div>

                          <div className="flex flex-col sm:flex-row items-start gap-4">

                            {/* Screenshot */}
                            {order.paymentScreenshot ? (
                              <div className="flex-shrink-0">
                                <img
                                  src={order.paymentScreenshot}
                                  alt="Payment proof"
                                  className="w-32 h-32 object-cover border border-yellow-700/20 cursor-pointer hover:opacity-80 transition-opacity"
                                  onClick={() => window.open(order.paymentScreenshot, '_blank')}
                                />
                                <p className="text-xs text-[#8B5E3C] dark:text-yellow-400 mt-1 text-center">
                                  Click to enlarge
                                </p>
                              </div>
                            ) : (
                              <div className="w-32 h-32 bg-gray-100 dark:bg-gray-800 border border-yellow-700/20 flex items-center justify-center flex-shrink-0">
                                <span className="text-xs text-gray-400 text-center px-2">No screenshot uploaded</span>
                              </div>
                            )}

                            {/* Verify Actions */}
                            <div className="flex-1">
                              {/* Current Status */}
                              <div className="flex items-center gap-2 mb-3">
                                <span className="text-xs text-[#8B5E3C] dark:text-yellow-400 font-semibold">
                                  Payment Status:
                                </span>
                                <span className={`text-xs font-bold px-2.5 py-1 ${pc.bg} ${pc.text}`}>
                                  {order.paymentStatus?.toUpperCase() || 'PENDING'}
                                </span>
                              </div>

                              {/* Method Info */}
                              <p className="text-sm text-[#2C1810] dark:text-yellow-200 mb-3">
                                <span className="font-semibold">Method:</span> {order.paymentMethod?.toUpperCase()}
                              </p>

                              {/* Action Buttons */}
                              {order.paymentStatus !== 'verified' && order.paymentStatus !== 'rejected' ? (
                                <div className="flex gap-2 flex-wrap">
                                  <button
                                    onClick={() => handlePaymentVerify(order._id, 'verified')}
                                    className="flex items-center gap-1.5 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 border-none px-4 py-2 text-xs font-bold cursor-pointer hover:bg-green-500 hover:text-white transition-all duration-300"
                                  >
                                    ✓ Verify Payment
                                  </button>
                                  <button
                                    onClick={() => handlePaymentVerify(order._id, 'rejected')}
                                    className="flex items-center gap-1.5 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 border-none px-4 py-2 text-xs font-bold cursor-pointer hover:bg-red-500 hover:text-white transition-all duration-300"
                                  >
                                    ✕ Reject Payment
                                  </button>
                                </div>
                              ) : (
                                <div className="flex items-center gap-2">
                                  {order.paymentStatus === 'verified' ? (
                                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                                      <span className="text-xl">✅</span>
                                      <span className="text-sm font-bold">Payment Verified</span>
                                    </div>
                                  ) : (
                                    <div className="flex flex-col gap-2">
                                      <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                                        <span className="text-xl">❌</span>
                                        <span className="text-sm font-bold">Payment Rejected</span>
                                      </div>
                                      {/* Re-verify option */}
                                      <button
                                        onClick={() => handlePaymentVerify(order._id, 'verified')}
                                        className="bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 border-none px-3 py-1.5 text-xs font-bold cursor-pointer hover:bg-green-500 hover:text-white transition-all w-fit"
                                      >
                                        ✓ Verify Instead
                                      </button>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                    </td>
                  </tr>
                )}
              </>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}