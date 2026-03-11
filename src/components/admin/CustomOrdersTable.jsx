import { useState } from 'react'

const STATUS_COLORS = {
  pending:   { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-700 dark:text-yellow-300' },
  confirmed: { bg: 'bg-blue-100 dark:bg-blue-900/30',   text: 'text-blue-700 dark:text-blue-300' },
  preparing: { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-700 dark:text-purple-300' },
  ready:     { bg: 'bg-teal-100 dark:bg-teal-900/30',   text: 'text-teal-700 dark:text-teal-300' },
  delivered: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-300' },
  cancelled: { bg: 'bg-red-100 dark:bg-red-900/30',     text: 'text-red-700 dark:text-red-300' },
}

export default function CustomOrdersTable({ orders, onUpdateStatus, onDelete }) {
  const [expanded, setExpanded] = useState(null)
  const [prices, setPrices] = useState({})

  function handlePriceChange(id, val) {
    setPrices(prev => ({ ...prev, [id]: val }))
  }

  return (
    <div className="bg-white dark:bg-[#2C1810] border border-yellow-700/20 overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-[#2C1810] dark:bg-[#1A0F0A]">
            {['Order ID', 'Customer', 'Cake Details', 'Delivery Date', 'Status', 'Action'].map(h => (
              <th key={h} className="px-4 py-3 text-left text-xs font-bold tracking-widest uppercase text-yellow-500 whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-12 text-[#8B5E3C] dark:text-yellow-300">
                🎂 No custom orders yet.
              </td>
            </tr>
          ) : orders.map((order, i) => {
            const sc = STATUS_COLORS[order.status] || STATUS_COLORS.pending
            const isExpanded = expanded === order._id

            return (
              <>
                {/* Main Row */}
                <tr
                  key={order._id}
                  className={`border-b border-yellow-700/10 ${i % 2 === 0 ? 'bg-white dark:bg-[#2C1810]' : 'bg-[#FDFAF5] dark:bg-[#1A0F0A]/40'}`}
                >
                  {/* ID */}
                  <td className="px-4 py-3 font-mono text-xs text-[#8B5E3C] dark:text-yellow-400">
                    #{order._id.slice(-6).toUpperCase()}
                  </td>

                  {/* Customer */}
                  <td className="px-4 py-3">
                    <div className="font-semibold text-sm text-[#2C1810] dark:text-[#F5E6C0]">{order.customerName}</div>
                    <div className="text-xs text-[#8B5E3C] dark:text-yellow-200/50">{order.customerPhone}</div>
                  </td>

                  {/* Cake Details */}
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setExpanded(isExpanded ? null : order._id)}
                      className="text-xs font-semibold text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700/30 px-2.5 py-1.5 cursor-pointer hover:bg-yellow-100 dark:hover:bg-yellow-800/40 transition-colors whitespace-nowrap"
                    >
                      🎂 {order.cakeType} {isExpanded ? '▲' : '▼'}
                    </button>
                  </td>

                  {/* Delivery Date */}
                  <td className="px-4 py-3 text-sm text-[#2C1810] dark:text-[#F5E6C0] whitespace-nowrap">
                    📅 {order.deliveryDate}
                  </td>

                  {/* Status Badge */}
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 ${sc.bg} ${sc.text}`}>
                      {order.status?.toUpperCase()}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-2 min-w-[160px]">
                      <select
                        value={order.status}
                        onChange={e => onUpdateStatus(order._id, { status: e.target.value })}
                        className="px-2 py-1.5 bg-[#FDF6EC] dark:bg-[#1A0F0A] border border-yellow-700/30 text-xs cursor-pointer outline-none text-[#2C1810] dark:text-[#F5E6C0] w-full"
                      >
                        {['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'].map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      <button
                        onClick={() => onDelete(order._id)}
                        className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-none px-3 py-1.5 text-xs font-semibold cursor-pointer hover:bg-red-600 hover:text-white transition-all duration-300 w-full"
                      >
                        🗑 Delete
                      </button>
                    </div>
                  </td>
                </tr>

                {/* Expanded Row */}
                {isExpanded && (
                  <tr key={`${order._id}-exp`} className="bg-[#FDF6EC] dark:bg-[#1A0F0A]">
                    <td colSpan={6} className="px-6 py-5 border-b border-yellow-700/20">
                      <div className="text-xs font-bold tracking-widest uppercase text-yellow-600 dark:text-yellow-400 mb-4">
                        🎂 Custom Order Details — #{order._id.slice(-6).toUpperCase()}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">

                        {/* Cake Info */}
                        <div className="bg-white dark:bg-[#2C1810] border border-yellow-700/15 p-4">
                          <div className="text-xs font-bold tracking-widest uppercase text-yellow-600 dark:text-yellow-400 mb-3">
                            🎂 Cake Info
                          </div>
                          {[
                            ['Type', order.cakeType],
                            ['Flavor', order.flavor],
                            ['Size', order.size],
                            ['Tiers', order.tiers],
                          ].map(([k, v]) => (
                            <div key={k} className="flex justify-between text-sm py-1 border-b border-yellow-700/10">
                              <span className="text-[#8B5E3C] dark:text-yellow-200/50">{k}</span>
                              <span className="font-medium text-[#2C1810] dark:text-[#F5E6C0]">{v}</span>
                            </div>
                          ))}
                        </div>

                        {/* Customization */}
                        <div className="bg-white dark:bg-[#2C1810] border border-yellow-700/15 p-4">
                          <div className="text-xs font-bold tracking-widest uppercase text-yellow-600 dark:text-yellow-400 mb-3">
                            ✨ Customization
                          </div>
                          {[
                            ['Message', order.message || '—'],
                            ['Theme', order.theme || '—'],
                            ['Colors', order.colors || '—'],
                          ].map(([k, v]) => (
                            <div key={k} className="flex justify-between text-sm py-1 border-b border-yellow-700/10">
                              <span className="text-[#8B5E3C] dark:text-yellow-200/50">{k}</span>
                              <span className="font-medium text-[#2C1810] dark:text-[#F5E6C0] text-right max-w-[120px] truncate">{v}</span>
                            </div>
                          ))}
                          {order.specialRequests && (
                            <div className="mt-2 text-xs text-[#8B5E3C] dark:text-yellow-200/50">
                              <span className="font-bold">Notes:</span> {order.specialRequests}
                            </div>
                          )}
                        </div>

                        {/* Delivery + Price Quote */}
                        <div className="bg-white dark:bg-[#2C1810] border border-yellow-700/15 p-4">
                          <div className="text-xs font-bold tracking-widest uppercase text-yellow-600 dark:text-yellow-400 mb-3">
                            🚚 Delivery
                          </div>
                          {[
                            ['Date', order.deliveryDate],
                            ['Phone', order.customerPhone],
                            ['Payment', order.paymentMethod?.toUpperCase()],
                          ].map(([k, v]) => (
                            <div key={k} className="flex justify-between text-sm py-1 border-b border-yellow-700/10">
                              <span className="text-[#8B5E3C] dark:text-yellow-200/50">{k}</span>
                              <span className="font-medium text-[#2C1810] dark:text-[#F5E6C0]">{v}</span>
                            </div>
                          ))}
                          <div className="text-xs text-[#8B5E3C] dark:text-yellow-200/50 mt-2 truncate">
                            📍 {order.deliveryAddress}
                          </div>

                          {/* Quote Price */}
                          <div className="mt-3 pt-3 border-t border-yellow-700/20">
                            <div className="text-xs font-bold tracking-wide uppercase text-yellow-600 dark:text-yellow-400 mb-2">
                              💰 Set Quote Price
                            </div>
                            <div className="flex gap-2">
                              <input
                                type="number"
                                placeholder="Rs. 0"
                                value={prices[order._id] || order.quotedPrice || ''}
                                onChange={e => handlePriceChange(order._id, e.target.value)}
                                className="flex-1 px-2 py-1.5 bg-[#FDF6EC] dark:bg-[#1A0F0A] border border-yellow-700/30 text-sm text-[#2C1810] dark:text-[#F5E6C0] outline-none focus:border-yellow-500"
                              />
                              <button
                                onClick={() => onUpdateStatus(order._id, { quotedPrice: Number(prices[order._id]) })}
                                className="bg-[#C9A84C] text-[#2C1810] border-none px-3 py-1.5 text-xs font-bold cursor-pointer hover:bg-yellow-400 transition-colors whitespace-nowrap"
                              >
                                ✓ Save
                              </button>
                            </div>
                          </div>
                        </div>

                      </div>
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