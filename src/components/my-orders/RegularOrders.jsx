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

const PAYMENT_STATUS = {
  verified: {
    icon: '✅', label: 'Payment Verified!',
    desc: 'Aapki payment confirm ho gayi. Order process ho raha hai.',
    box: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
    text: 'text-green-700 dark:text-green-300',
    subtext: 'text-green-600 dark:text-green-400',
    badge: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
  },
  rejected: {
    icon: '❌', label: 'Payment Rejected!',
    desc: 'Aapki payment verify nahi ho saki. Humse contact karein: 0300-1234567',
    box: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
    text: 'text-red-700 dark:text-red-300',
    subtext: 'text-red-600 dark:text-red-400',
    badge: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300',
  },
  submitted: {
    icon: '⏳', label: 'Payment Under Review',
    desc: 'Screenshot mil gayi — admin verify kar raha hai.',
    box: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
    text: 'text-blue-700 dark:text-blue-300',
    subtext: 'text-blue-600 dark:text-blue-400',
    badge: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300',
  },
  pending: {
    icon: '📸', label: 'Payment Pending',
    desc: 'Screenshot abhi tak nahi mili.',
    box: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
    text: 'text-yellow-700 dark:text-yellow-300',
    subtext: 'text-yellow-600 dark:text-yellow-400',
    badge: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
  },
}

export default function RegularOrders({ orders, expandedOrder, setExpandedOrder }) {
  if (orders.length === 0) {
    return (
      <EmptyState emoji="📦" title="No orders yet" desc="You haven't placed any orders yet." href="/menu" btnText="Browse Menu" />
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {orders.map(order => {
        const sc = STATUS_COLORS[order.status] || STATUS_COLORS.pending
        const isExp = expandedOrder === order._id
        const deliveryFee = order.totalAmount >= 2000 ? 0 : 150
        const isOnline = order.paymentMethod === 'jazzcash' || order.paymentMethod === 'easypaisa'
        const ps = PAYMENT_STATUS[order.paymentStatus] || PAYMENT_STATUS.pending

        return (
          <div key={order._id} className="bg-white dark:bg-[#2C1810] border border-yellow-700/20 overflow-hidden">

            {/* Order Header */}
            <div
              className="flex flex-wrap items-center justify-between gap-3 p-4 sm:p-5 cursor-pointer hover:bg-[#FDF6EC] dark:hover:bg-[#1A0F0A]/50 transition-colors"
              onClick={() => setExpandedOrder(isExp ? null : order._id)}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#FDF6EC] dark:bg-[#1A0F0A] flex items-center justify-center text-xl">📦</div>
                <div>
                  <div className="font-mono text-xs text-[#8B5E3C] dark:text-yellow-400">#{order._id.slice(-6).toUpperCase()}</div>
                  <div className="font-semibold text-sm sm:text-base text-[#2C1810] dark:text-[#F5E6C0]" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {order.items?.length} item(s)
                  </div>
                  <div className="text-xs text-[#8B5E3C] dark:text-yellow-200/50">
                    {new Date(order.createdAt).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="font-bold text-[#2C1810] dark:text-[#C9A84C]" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Rs. {order.totalAmount?.toLocaleString()}
                </span>
                <span className={`text-xs font-bold px-2.5 py-1 ${sc.bg} ${sc.text}`}>
                  {order.status?.replace('_', ' ').toUpperCase()}
                </span>
                {isOnline && (
                  <span className={`text-xs font-bold px-2 py-1 ${ps.badge}`}>
                    {ps.icon} {order.paymentStatus === 'verified' ? 'Verified' : order.paymentStatus === 'rejected' ? 'Rejected' : order.paymentStatus === 'submitted' ? 'Under Review' : 'Pending'}
                  </span>
                )}
                <span className="text-[#8B5E3C] dark:text-yellow-400 text-sm">{isExp ? '▲' : '▼'}</span>
              </div>
            </div>

            {/* Expanded */}
            {isExp && (
              <div className="border-t border-yellow-700/15 p-4 sm:p-5 bg-[#FDF6EC] dark:bg-[#1A0F0A]/50">

                {/* Items */}
                <div className="mb-4">
                  <div className="text-xs font-bold tracking-widest uppercase text-[#C9A84C] mb-3">🛒 Items Ordered</div>
                  <div className="flex flex-col gap-2">
                    {order.items?.map((item, i) => (
                      <div key={i} className="flex items-center gap-3 bg-white dark:bg-[#2C1810] px-4 py-2.5 border border-yellow-700/15">
                        <div className="w-12 h-12 flex-shrink-0 overflow-hidden bg-gradient-to-br from-[#F5E6C0] to-[#E8C97A]">
                          {item.image ? (
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xl">{item.emoji || '🎂'}</div>
                          )}
                        </div>
                        <span className="flex-1 text-sm text-[#2C1810] dark:text-[#F5E6C0]">{item.name} × {item.quantity}</span>
                        <span className="font-semibold text-sm text-[#2C1810] dark:text-[#C9A84C] flex-shrink-0">
                          Rs. {(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delivery + Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-[#2C1810] border border-yellow-700/15 p-4">
                    <div className="text-xs font-bold tracking-widests uppercase text-[#C9A84C] mb-2">📍 Delivery Info</div>
                    <div className="text-sm text-[#2C1810] dark:text-[#F5E6C0]/80 space-y-1">
                      <p><span className="font-semibold">Name:</span> {order.customerName}</p>
                      <p><span className="font-semibold">Phone:</span> {order.customerPhone}</p>
                      <p><span className="font-semibold">Address:</span> {order.deliveryAddress}</p>
                      <p><span className="font-semibold">Payment:</span> {order.paymentMethod?.toUpperCase()}</p>
                      {order.specialInstructions && (
                        <p><span className="font-semibold">Note:</span> {order.specialInstructions}</p>
                      )}
                    </div>
                  </div>

                  <div className="bg-white dark:bg-[#2C1810] border border-yellow-700/15 p-4">
                    <div className="text-xs font-bold tracking-widest uppercase text-[#C9A84C] mb-2">💰 Price Summary</div>
                    <div className="space-y-1.5 text-sm">
                      <div className="flex justify-between">
                        <span className="text-[#8B5E3C] dark:text-yellow-200/50">Subtotal</span>
                        <span className="text-[#2C1810] dark:text-[#F5E6C0]">Rs. {order.totalAmount?.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#8B5E3C] dark:text-yellow-200/50">Delivery</span>
                        <span className={deliveryFee === 0 ? 'text-green-600 font-semibold' : 'text-[#2C1810] dark:text-[#F5E6C0]'}>
                          {deliveryFee === 0 ? 'FREE' : 'Rs. 150'}
                        </span>
                      </div>
                      <div className="flex justify-between border-t border-yellow-700/20 pt-1.5 mt-1">
                        <span className="font-bold text-[#2C1810] dark:text-[#F5E6C0]">Total</span>
                        <span className="font-bold text-[#C9A84C]">Rs. {(order.totalAmount + deliveryFee).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Status Box */}
                {isOnline && (
                  <div className={`border p-4 mt-4 ${ps.box}`}>
                    <div className="text-xs font-bold tracking-widest uppercase text-[#C9A84C] mb-2">💳 Payment Status</div>
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{ps.icon}</span>
                      <div>
                        <p className={`font-bold text-sm ${ps.text}`}>{ps.label}</p>
                        <p className={`text-xs mt-0.5 ${ps.subtext}`}>{ps.desc}</p>
                      </div>
                    </div>
                  </div>
                )}

                <Link href="/menu" className="mt-4 inline-block bg-[#C9A84C] text-[#2C1810] px-6 py-2.5 text-xs font-bold tracking-widest uppercase no-underline hover:bg-yellow-400 transition-colors">
                  🔄 Order Again
                </Link>
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