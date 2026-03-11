export default function StatsCards({ stats, productsCount }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {[
        { label: 'Total Orders', value: stats.total, icon: '📦' },
        { label: 'Pending Orders', value: stats.pending, icon: '⏳' },
        { label: 'Total Products', value: productsCount, icon: '🎂' },
        { label: 'Total Revenue', value: `Rs. ${stats.revenue.toLocaleString()}`, icon: '💰' },
      ].map(s => (
        <div
          key={s.label}
          className="bg-white dark:bg-[#2C1810] border border-yellow-700/20 p-4 flex gap-3 items-center hover:shadow-md dark:hover:shadow-lg transition-shadow"
        >
          <div className="text-3xl">{s.icon}</div>

          <div>
            <div className="text-xs font-bold tracking-widest uppercase text-[#8B5E3C] dark:text-yellow-400 mb-1">
              {s.label}
            </div>

            <div
              className="text-xl md:text-2xl font-bold text-[#2C1810] dark:text-yellow-200"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              {s.value}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}