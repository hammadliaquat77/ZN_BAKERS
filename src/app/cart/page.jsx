'use client'
import { useState } from 'react'
import { useCart } from '@/components/CartContext'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import CartItems from '@/components/cart/CartItems'
import CheckoutForm from '@/components/cart/CheckoutForm'

export default function CartPage() {
  const { cart, clearCart, cartTotal } = useCart()
  const { data: session } = useSession()
  const router = useRouter()
  const [step, setStep] = useState('cart')
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState('');


  const [screenshotUrl, setScreenshotUrl] = useState('')
  const [screenshotUploading, setScreenshotUploading] = useState(false)

  const [form, setForm] = useState({
    customerName: session?.user?.name || '',
    customerPhone: '',
    customerEmail: session?.user?.email || '',
    deliveryAddress: '',
    specialInstructions: '',
    paymentMethod: 'cod',
  })

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handlePlaceOrder() {

  if (!form.customerName || !form.customerPhone || !form.deliveryAddress) {
    setToast('⚠ Please fill all required fields.')
    setTimeout(() => setToast(''), 3000)
    return
  }

  // 🔹 Phone number validation (11 digits)
  const digits = form.customerPhone.replace(/\D/g, '')
  if (digits.length < 11) {
    setToast('⚠ Phone number must be at least 11 digits!')
    setTimeout(() => setToast(''), 3000)
    return
  }


  const isOnline = form.paymentMethod === 'jazzcash' || form.paymentMethod === 'easypaisa'

  // Screenshot check
  if (isOnline && !screenshotUrl) {
    setToast('⚠ Please upload payment screenshot first!')
    setTimeout(() => setToast(''), 3000)
    return
  }

  setLoading(true)
  try {
    const orderData = {
      ...form,
      items: cart.map(i => ({ product: i._id, name: i.name, price: i.price, quantity: i.quantity })),
      totalAmount: cartTotal,
      paymentScreenshot: screenshotUrl || '',
      paymentStatus: isOnline ? 'submitted' : 'pending',
    }

    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    })
    const data = await res.json()
    if (res.ok) {
      clearCart()
      setToast('🎉 Order placed successfully!')
      setTimeout(() => router.push('/my-orders'), 2000)
    } else {
      setToast('❌ ' + data.error)
    }
  } catch (err) {
    setToast('❌ Something went wrong.')
  } finally {
    setLoading(false)
    setTimeout(() => setToast(''), 4000)
  }
}

// Screen Shoot Upload
  async function handleScreenshotUpload(file) {
    setScreenshotUploading(true)
    const formData = new FormData()
    formData.append('screenshot', file)

    const res = await fetch('/api/upload-payment', {
      method: 'POST',
      body: formData,
    })
    const data = await res.json()
    if (res.ok) {
      setScreenshotUrl(data.url)
    } else {
      setToast('❌ Screenshot upload failed')
    }
    setScreenshotUploading(false)
  }

  const deliveryFee = cartTotal >= 2000 ? 0 : 150
  const grandTotal = cartTotal + deliveryFee

  // Empty Cart
  if (cart.length === 0 && step === 'cart') {
    return (
      <div className="pt-[72px] min-h-screen bg-[#FDF6EC] dark:bg-[#1A0F0A] flex items-center justify-center flex-col gap-6 px-4 transition-colors duration-300">
        <div className="text-8xl">🛒</div>
        <h2
          className="text-2xl sm:text-3xl font-bold text-[#2C1810] dark:text-[#F5E6C0] text-center"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          Your Cart is Empty
        </h2>
        <p className="text-[#8B5E3C] dark:text-yellow-200/60 text-center">
          Add some delicious items from our menu!
        </p>
        <Link
          href="/menu"
          className="bg-[#C9A84C] text-[#2C1810] px-8 py-3.5 text-sm font-bold tracking-widest uppercase no-underline hover:bg-yellow-400 transition-colors"
        >
          Browse Menu
        </Link>
      </div>
    )
  }

  return (
    <div className="pt-[72px] min-h-screen bg-[#FDF6EC] dark:bg-[#1A0F0A] transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">

        {/* Title */}
        <h1
          className="text-2xl sm:text-3xl md:text-4xl font-black text-[#2C1810] dark:text-[#F5E6C0] mb-6 sm:mb-8"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          {step === 'cart' ? '🛒 Your Cart' : '📦 Checkout'}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">

          {/* LEFT — Cart or Checkout */}
          <div>
            {step === 'cart'
              ? <CartItems />
              : <CheckoutForm 
                   form={form} 
                   onChange={handleChange} 
                   onScreenshotUpload={handleScreenshotUpload} 
                   screenshotUrl={screenshotUrl}
                   screenshotUploading={screenshotUploading}
                   />
            }
          </div>

          {/* RIGHT — Order Summary */}
          <div className="bg-[#2C1810] dark:bg-[#1A0F0A] border border-yellow-700/30 p-5 sm:p-6 lg:sticky lg:top-[90px] h-fit">
            <h3
              className="text-lg font-bold text-[#C9A84C] mb-5 pb-4 border-b border-yellow-700/20"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Order Summary
            </h3>

            {/* Items List */}
            <div className="flex flex-col gap-2 mb-4">
              {cart.map(item => (
                <div key={item._id} className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm text-white/70 truncate flex-1 mr-2">
                    {item.emoji} {item.name} × {item.quantity}
                  </span>
                  <span className="text-xs sm:text-sm text-white font-medium flex-shrink-0">
                    Rs. {(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Price Breakdown */}
            <div className="border-t border-yellow-700/20 pt-4 flex flex-col gap-2">
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Subtotal</span>
                <span className="text-white font-medium">Rs. {cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Delivery</span>
                <span className={`font-medium ${deliveryFee === 0 ? 'text-[#C9A84C]' : 'text-white'}`}>
                  {deliveryFee === 0 ? 'FREE' : 'Rs. 150'}
                </span>
              </div>
              <div className="flex justify-between border-t border-yellow-700/30 pt-3 mt-1">
                <span className="font-bold text-white text-base" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Total
                </span>
                <span className="font-bold text-[#C9A84C] text-lg" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Rs. {grandTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Free Delivery Notice */}
            {cartTotal < 2000 && (
              <p className="text-xs text-[#C9A84C]/70 text-center mt-3">
                Add Rs. {(2000 - cartTotal).toLocaleString()} more for free delivery!
              </p>
            )}

            {/* Action Buttons */}
            <div className="mt-5 flex flex-col gap-2">
              {step === 'cart' ? (
                <button
                  onClick={() => {
                    if (!session) {
                      router.push('/login')
                      return
                    }
                    setStep('checkout')
                  }}
                  className="w-full bg-[#C9A84C] text-[#2C1810] border-none py-4 text-sm font-bold tracking-widest uppercase cursor-pointer hover:bg-yellow-400 transition-colors"
                >
                  {session ? 'Proceed to Checkout →' : '🔒 Login to Checkout'}
                </button>
              ) : (
                <>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={loading}
                    className={`w-full border-none py-4 text-sm font-bold tracking-widest uppercase transition-colors
                         ${loading
                        ? 'bg-yellow-500/50 text-[#2C1810] cursor-not-allowed'
                        : 'bg-[#C9A84C] text-[#2C1810] cursor-pointer hover:bg-yellow-400'
                      }`}
                  >
                    {loading ? '⏳ Processing...' : '✓ Place Order'}
                  </button>
                  <button
                    onClick={() => setStep('cart')}
                    className="w-full bg-transparent text-white/50 border border-white/20 py-3 text-xs cursor-pointer hover:border-white/40 transition-colors"
                  >
                    ← Back to Cart
                  </button>
                </>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 bg-[#2C1810] dark:bg-[#1A0F0A] text-[#C9A84C] px-5 py-3 text-sm font-semibold border-l-4 border-[#C9A84C] z-50 shadow-xl">
          {toast}
        </div>
      )}
    </div>
  )
}





