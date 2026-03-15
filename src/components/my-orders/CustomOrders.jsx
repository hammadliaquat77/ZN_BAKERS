import Link from 'next/link'

const STATUS_COLORS = {
  pending: { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-700 dark:text-yellow-300' },
  confirmed: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-300' },
  preparing: { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-700 dark:text-purple-300' },
  out_for_delivery: { bg: 'bg-pink-100 dark:bg-pink-900/30', text: 'text-pink-700 dark:text-pink-300' },
  ready: { bg: 'bg-teal-100 dark:bg-teal-900/30', text: 'text-teal-700 dark:text-teal-300' },
  delivered: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-300' },
  cancelled: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-300' },
}

export default function CustomOrders({ customOrders, expandedCustom, setExpandedCustom }) {
  if (customOrders.length === 0) {
    return (
      <EmptyState emoji="🎂" title="No custom orders yet" desc="Place a custom cake order for your special occasion!" href="/custom-order" btnText="Order Custom Cake" />
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {customOrders.map(order => {
        const sc = STATUS_COLORS[order.status] || STATUS_COLORS.pending
        const isExp = expandedCustom === order._id

        return (
          <div key={order._id} className="bg-white dark:bg-[#2C1810] border border-yellow-700/20 overflow-hidden">

            {/* Header */}
            <div
              className="flex flex-wrap items-center justify-between gap-3 p-4 sm:p-5 cursor-pointer hover:bg-[#FDF6EC] dark:hover:bg-[#1A0F0A]/50 transition-colors"
              onClick={() => setExpandedCustom(isExp ? null : order._id)}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#FDF6EC] dark:bg-[#1A0F0A] flex items-center justify-center text-xl">🎂</div>
                <div>
                  <div className="font-mono text-xs text-[#8B5E3C] dark:text-yellow-400">#{order._id.slice(-6).toUpperCase()}</div>
                  <div className="font-semibold text-sm sm:text-base text-[#2C1810] dark:text-[#F5E6C0]" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {order.cakeType} — {order.flavor}
                  </div>
                  <div className="text-xs text-[#8B5E3C] dark:text-yellow-200/50">Delivery: {order.deliveryDate}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {order.quotedPrice > 0 ? (
                  <span className="font-bold text-[#C9A84C]" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Rs. {order.quotedPrice.toLocaleString()}
                  </span>
                ) : (
                  <span className="text-xs text-[#8B5E3C] dark:text-yellow-200/40 italic">Price pending...</span>
                )}
                <span className={`text-xs font-bold px-2.5 py-1 ${sc.bg} ${sc.text}`}>
                  {order.status?.toUpperCase()}
                </span>
                <span className="text-[#8B5E3C] dark:text-yellow-400 text-sm">{isExp ? '▲' : '▼'}</span>
              </div>
            </div>

            {/* Expanded */}
            {isExp && (
              <div className="border-t border-yellow-700/15 p-4 sm:p-5 bg-[#FDF6EC] dark:bg-[#1A0F0A]/50">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                  {/* Cake Details */}
                  <div className="bg-white dark:bg-[#2C1810] border border-yellow-700/15 p-4">
                    <div className="text-xs font-bold tracking-widest uppercase text-[#C9A84C] mb-3">🎂 Cake Details</div>
                    {[['Type', order.cakeType], ['Flavor', order.flavor], ['Size', order.size], ['Tiers', order.tiers]].map(([k, v]) => (
                      <div key={k} className="flex justify-between text-sm py-1 border-b border-yellow-700/10">
                        <span className="text-[#8B5E3C] dark:text-yellow-200/50">{k}</span>
                        <span className="font-medium text-[#2C1810] dark:text-[#F5E6C0]">{v}</span>
                      </div>
                    ))}
                  </div>

                  {/* Customization */}
                  <div className="bg-white dark:bg-[#2C1810] border border-yellow-700/15 p-4">
                    <div className="text-xs font-bold tracking-widest uppercase text-[#C9A84C] mb-3">✨ Customization</div>
                    {[['Message', order.message || '—'], ['Theme', order.theme || '—'], ['Colors', order.colors || '—']].map(([k, v]) => (
                      <div key={k} className="flex justify-between text-sm py-1 border-b border-yellow-700/10">
                        <span className="text-[#8B5E3C] dark:text-yellow-200/50">{k}</span>
                        <span className="font-medium text-[#2C1810] dark:text-[#F5E6C0] text-right max-w-[130px] truncate">{v}</span>
                      </div>
                    ))}
                    {/* Theme Reference Image */}
                    {order.themeImage && (
                      <div className="mt-3">
                        <div className="text-xs text-[#8B5E3C] dark:text-yellow-200/50 mb-1 font-semibold">🖼️ Reference Image:</div>
                        <img
                          src={order.themeImage}
                          alt="Theme reference"
                          className="w-full max-h-32 object-contain border border-yellow-700/20 cursor-pointer hover:opacity-80 transition-opacity"
                          onClick={() => window.open(order.themeImage, '_blank')}
                        />
                        <p className="text-xs text-[#8B5E3C] dark:text-yellow-200/40 mt-1">Click to enlarge</p>
                      </div>
                    )}
                    {order.specialRequests && (
                      <p className="text-xs text-[#8B5E3C] dark:text-yellow-200/50 mt-2">
                        <span className="font-bold">Notes:</span> {order.specialRequests}
                      </p>
                    )}
                  </div>

                  {/* Delivery & Price */}
                  <div className="bg-white dark:bg-[#2C1810] border border-yellow-700/15 p-4">
                    <div className="text-xs font-bold tracking-widest uppercase text-[#C9A84C] mb-3">🚚 Delivery & Price</div>
                    {[['Date', order.deliveryDate], ['Address', order.deliveryAddress], ['Payment', order.paymentMethod?.toUpperCase()]].map(([k, v]) => (
                      <div key={k} className="flex justify-between text-sm py-1 border-b border-yellow-700/10">
                        <span className="text-[#8B5E3C] dark:text-yellow-200/50">{k}</span>
                        <span className="font-medium text-[#2C1810] dark:text-[#F5E6C0] text-right max-w-[130px] truncate">{v}</span>
                      </div>
                    ))}
                    <div className="mt-3 pt-2 border-t border-yellow-700/20">
                      {order.quotedPrice > 0 ? (
                        <div className="flex justify-between">
                          <span className="font-bold text-sm text-[#2C1810] dark:text-[#F5E6C0]">Quoted Price</span>
                          <span className="font-bold text-[#C9A84C]">Rs. {order.quotedPrice.toLocaleString()}</span>
                        </div>
                      ) : (
                        <p className="text-xs text-yellow-600 dark:text-yellow-400 italic text-center">
                          ⏳ Price will be confirmed via call within 2 hours
                        </p>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

function EmptyState({ emoji, title, desc, href, btnText }) {
  return (
    <div className="text-center py-16 flex flex-col items-center gap-4">
      <div className="text-7xl">{emoji}</div>
      <h2 className="text-2xl font-bold text-[#2C1810] dark:text-[#F5E6C0]" style={{ fontFamily: 'Playfair Display, serif' }}>{title}</h2>
      <p className="text-[#8B5E3C] dark:text-yellow-200/60">{desc}</p>
      <Link href={href} className="bg-[#C9A84C] text-[#2C1810] px-8 py-3 text-sm font-bold tracking-widest uppercase no-underline hover:bg-yellow-400 transition-colors">
        {btnText}
      </Link>
    </div>
  )
}