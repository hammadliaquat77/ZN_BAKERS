// 'use client'
// import { useState, useEffect } from 'react'
// import { useSession } from 'next-auth/react'
// import { useRouter } from 'next/navigation'
// import StatsCards from '@/components/admin/StatsCards'
// import OrdersTable from '@/components/admin/OrdersTable'
// import ProductsList from '@/components/admin/ProductsList'
// import AddProductForm from '@/components/admin/AddProductForm'
// import CustomOrdersTable from '@/components/admin/CustomOrdersTable'

// export default function AdminPage() {
//   const { data: session, status } = useSession()
//   const router = useRouter()
//   const [tab, setTab] = useState('orders')
//   const [orders, setOrders] = useState([])
//   const [products, setProducts] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [stats, setStats] = useState({ total: 0, pending: 0, revenue: 0 })
//   const [toast, setToast] = useState('')
//   const [customOrders, setCustomOrders] = useState([])

//   useEffect(() => {
//     if (status === 'loading') return
//     if (!session || session.user.role !== 'admin') { router.push('/'); return }
//     fetchData()
//   }, [session, status])

//   async function fetchData() {
//     setLoading(true)
//     const [ordRes, prodRes, coRes] = await Promise.all([
//       fetch('/api/orders'),
//       fetch('/api/products'),
//       fetch('/api/custom-orders')
//     ])
//     const ordData = await ordRes.json()
//     const prodData = await prodRes.json()
//     const coData = await coRes.json()
//     const ords = ordData.orders || []
//     setCustomOrders(coData.orders || [])
//     setOrders(ords)
//     setProducts(prodData.products || [])
//     setStats({
//       total: ords.length,
//       pending: ords.filter(o => o.status === 'pending').length,
//       revenue: ords.filter(o => o.status !== 'cancelled').reduce((s, o) => s + o.totalAmount, 0),
//     })
//     setLoading(false)
//   }

//   async function updateOrderStatus(id, newStatus) {
//     await fetch(`/api/orders/${id}`, {
//       method: 'PATCH',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ status: newStatus })
//     })
//     showToast('✓ Order updated')
//     fetchData()
//   }

//   async function handleAddProduct(data) {
//     const res = await fetch('/api/products', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(data)
//     })
//     if (res.ok) { showToast('✓ Product added!'); fetchData() }
//     else showToast('❌ Error adding product')
//   }

//   async function handleDeleteProduct(id) {
//     if (!confirm('Delete this product?')) return
//     await fetch(`/api/products/${id}`, { method: 'DELETE' })
//     showToast('✓ Product deleted')
//     fetchData()
//   }

//   async function handleDeleteOrder(id) {
//     if (!confirm('Are you sure you want to delete this order?')) return
//     const res = await fetch(`/api/orders/${id}`, { method: 'DELETE' })
//     if (res.ok) { showToast('✓ Order deleted'); fetchData() }
//     else showToast('❌ Error deleting order')
//   }


//   async function handleCustomOrderUpdate(id, data) {
//     const res = await fetch(`/api/custom-orders/${id}`, {
//       method: 'PATCH',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(data)
//     })
//     if (res.ok) { showToast('✓ Updated!'); fetchData() }
//     else showToast('❌ Error updating')
//   }

//   async function handleCustomOrderDelete(id) {
//     if (!confirm('Delete this custom order?')) return
//     const res = await fetch(`/api/custom-orders/${id}`, { method: 'DELETE' })
//     if (res.ok) { showToast('✓ Deleted'); fetchData() }
//     else showToast('❌ Error deleting')
//   }



//   async function handleEditProduct(id, data) {
//     const res = await fetch(`/api/products/${id}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(data)
//     })
//     if (res.ok) { showToast('✓ Product updated!'); fetchData() }
//     else showToast('❌ Error updating product')
//   }


//   function showToast(msg) {
//     setToast(msg)
//     setTimeout(() => setToast(''), 3000)
//   }

//   if (loading) {
//     return (
//       <div className="pt-[72px] min-h-screen bg-[#FDF6EC] dark:bg-[#1A0F0A] flex items-center justify-center transition-colors">
//         <div className="text-center">
//           <div className="text-6xl mb-4">⏳</div>
//           <p className="text-[#8B5E3C] dark:text-yellow-300 text-lg font-medium">
//             Loading Admin Panel...
//           </p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="pt-[72px] min-h-screen bg-[#FDF6EC] dark:bg-[#1A0F0A] transition-colors">

//       {/* Header */}
//       <div className="bg-gradient-to-br from-[#2C1810] to-[#5C3317] py-10 px-6">
//         <div className="max-w-6xl mx-auto">
//           <h1
//             className="text-3xl md:text-4xl font-black text-yellow-500"
//             style={{ fontFamily: 'Playfair Display, serif' }}
//           >
//             🍞 Admin Dashboard
//           </h1>
//           <p className="text-white/60 text-sm mt-1">
//             ZN Bakers Management Panel
//           </p>
//         </div>
//       </div>

//       <div className="max-w-6xl mx-auto px-4 py-8">

//         {/* Stats */}
//         <StatsCards stats={stats} productsCount={products.length} />

//         {/* Tabs */}
//         <div className="flex flex-wrap gap-0 mb-6 border border-yellow-700/30 w-fit overflow-hidden">

//           {[
//             ['orders', '📦 Orders'],
//             ['custom-orders', '🎂 Custom Orders'],
//             ['products', '🎂 Products'],
//             ['add-product', '➕ Add Product'],
//           ].map(([t, label]) => (

//             <button
//               key={t}
//               onClick={() => setTab(t)}
//               className={`px-5 py-3 text-xs font-semibold tracking-widest uppercase transition-all duration-300
//               ${tab === t
//                   ? 'bg-[#2C1810] text-yellow-500'
//                   : 'bg-transparent text-[#5C3317] dark:text-yellow-300 hover:bg-[#2C1810]/10 dark:hover:bg-yellow-900/20'
//                 }`}
//             >
//               {label}
//             </button>

//           ))}

//         </div>

//         {/* Tabs Content */}

//         {tab === 'orders' && (
//           <OrdersTable
//             orders={orders}
//             onUpdateStatus={updateOrderStatus}
//             onDelete={handleDeleteOrder}
//           />
//         )}

//         {tab === 'custom-orders' && (
//           <CustomOrdersTable
//             orders={customOrders}
//             onUpdateStatus={handleCustomOrderUpdate}
//             onDelete={handleCustomOrderDelete}
//           />
//         )}

//         {tab === 'products' && (
//           <ProductsList
//             products={products}
//             onDelete={handleDeleteProduct}
//             onEdit={handleEditProduct}
//           />
//         )}

//         {tab === 'add-product' && (
//           <AddProductForm
//             onAdd={handleAddProduct}
//           />
//         )}

//       </div>

//       {/* Toast */}

//       {toast && (
//         <div className="fixed bottom-6 right-6 bg-[#2C1810] dark:bg-black text-yellow-500 px-6 py-3.5 text-sm font-semibold border-l-4 border-yellow-500 z-50 shadow-xl">
//           {toast}
//         </div>
//       )}

//     </div>
//   )
// }









'use client'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import StatsCards from '@/components/admin/StatsCards'
import OrdersTable from '@/components/admin/OrdersTable'
import ProductsList from '@/components/admin/ProductsList'
import AddProductForm from '@/components/admin/AddProductForm'
import CustomOrdersTable from '@/components/admin/CustomOrdersTable'

export default function AdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [tab, setTab] = useState('orders')
  const [orders, setOrders] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ total: 0, pending: 0, revenue: 0 })
  const [toast, setToast] = useState('')
  const [customOrders, setCustomOrders] = useState([])

  useEffect(() => {
    if (status === 'loading') return
    if (!session || session.user.role !== 'admin') { router.push('/'); return }
    fetchData()
  }, [session, status])

  async function fetchData() {
    setLoading(true)
    const [ordRes, prodRes, coRes] = await Promise.all([
      fetch('/api/orders'),
      fetch('/api/products'),
      fetch('/api/custom-orders')
    ])
    const ordData = await ordRes.json()
    const prodData = await prodRes.json()
    const coData = await coRes.json()
    const ords = ordData.orders || []
    setCustomOrders(coData.orders || [])
    setOrders(ords)
    setProducts(prodData.products || [])
    setStats({
      total: ords.length,
      pending: ords.filter(o => o.status === 'pending').length,
      revenue: ords.filter(o => o.status !== 'cancelled').reduce((s, o) => s + o.totalAmount, 0),
    })
    setLoading(false)
  }

  

  async function updateOrderStatus(id, value) {
  // Agar value payment status hai
  const paymentStatuses = ['verified', 'rejected', 'submitted']
  const isPaymentStatus = paymentStatuses.includes(value)

  await fetch(`/api/orders/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(
      isPaymentStatus
        ? { paymentStatus: value }
        : { status: value }
    )
  })
  showToast(isPaymentStatus ? '✓ Payment status updated!' : '✓ Order updated')
  fetchData()
}

  async function handleAddProduct(data) {
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (res.ok) { showToast('✓ Product added!'); fetchData() }
    else showToast('❌ Error adding product')
  }

  async function handleDeleteProduct(id) {
    if (!confirm('Delete this product?')) return
    await fetch(`/api/products/${id}`, { method: 'DELETE' })
    showToast('✓ Product deleted')
    fetchData()
  }

  async function handleDeleteOrder(id) {
    if (!confirm('Are you sure you want to delete this order?')) return
    const res = await fetch(`/api/orders/${id}`, { method: 'DELETE' })
    if (res.ok) { showToast('✓ Order deleted'); fetchData() }
    else showToast('❌ Error deleting order')
  }


  async function handleCustomOrderUpdate(id, data) {
    const res = await fetch(`/api/custom-orders/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (res.ok) { showToast('✓ Updated!'); fetchData() }
    else showToast('❌ Error updating')
  }

  async function handleCustomOrderDelete(id) {
    if (!confirm('Delete this custom order?')) return
    const res = await fetch(`/api/custom-orders/${id}`, { method: 'DELETE' })
    if (res.ok) { showToast('✓ Deleted'); fetchData() }
    else showToast('❌ Error deleting')
  }



  async function handleEditProduct(id, data) {
    const res = await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (res.ok) { showToast('✓ Product updated!'); fetchData() }
    else showToast('❌ Error updating product')
  }


  function showToast(msg) {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  if (loading) {
    return (
      <div className="pt-[72px] min-h-screen bg-[#FDF6EC] dark:bg-[#1A0F0A] flex items-center justify-center transition-colors">
        <div className="text-center">
          <div className="text-6xl mb-4">⏳</div>
          <p className="text-[#8B5E3C] dark:text-yellow-300 text-lg font-medium">
            Loading Admin Panel...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-[72px] min-h-screen bg-[#FDF6EC] dark:bg-[#1A0F0A] transition-colors">

      {/* Header */}
      <div className="bg-gradient-to-br from-[#2C1810] to-[#5C3317] py-10 px-6">
        <div className="max-w-6xl mx-auto">
          <h1
            className="text-3xl md:text-4xl font-black text-yellow-500"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            🍞 Admin Dashboard
          </h1>
          <p className="text-white/60 text-sm mt-1">
            ZN Bakers Management Panel
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* Stats */}
        <StatsCards stats={stats} productsCount={products.length} />

        {/* Tabs */}
        <div className="flex flex-wrap gap-0 mb-6 border border-yellow-700/30 w-fit overflow-hidden">

          {[
            ['orders', '📦 Orders'],
            ['custom-orders', '🎂 Custom Orders'],
            ['products', '🎂 Products'],
            ['add-product', '➕ Add Product'],
          ].map(([t, label]) => (

            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-3 text-xs font-semibold tracking-widest uppercase transition-all duration-300
              ${tab === t
                  ? 'bg-[#2C1810] text-yellow-500'
                  : 'bg-transparent text-[#5C3317] dark:text-yellow-300 hover:bg-[#2C1810]/10 dark:hover:bg-yellow-900/20'
                }`}
            >
              {label}
            </button>

          ))}

        </div>

        {/* Tabs Content */}

        {tab === 'orders' && (
          <OrdersTable
            orders={orders}
            onUpdateStatus={updateOrderStatus}
            onDelete={handleDeleteOrder}
          />
        )}

        {tab === 'custom-orders' && (
          <CustomOrdersTable
            orders={customOrders}
            onUpdateStatus={handleCustomOrderUpdate}
            onDelete={handleCustomOrderDelete}
          />
        )}

        {tab === 'products' && (
          <ProductsList
            products={products}
            onDelete={handleDeleteProduct}
            onEdit={handleEditProduct}
          />
        )}

        {tab === 'add-product' && (
          <AddProductForm
            onAdd={handleAddProduct}
          />
        )}

      </div>

      {/* Toast */}

      {toast && (
        <div className="fixed bottom-6 right-6 bg-[#2C1810] dark:bg-black text-yellow-500 px-6 py-3.5 text-sm font-semibold border-l-4 border-yellow-500 z-50 shadow-xl">
          {toast}
        </div>
      )}

    </div>
  )
}

