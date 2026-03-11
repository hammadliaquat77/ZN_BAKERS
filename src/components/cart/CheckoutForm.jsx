'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

export default function CheckoutForm({
  form,
  onChange,
  onScreenshotUpload,
  screenshotUrl,
  screenshotUploading,
  onSubmit
}) {

  const { data: session } = useSession()
  const [preview, setPreview] = useState(screenshotUrl || '')

  // 🔹 Format phone number like 0333-1234567
  function formatPhoneNumber(value) {
    const digits = value.replace(/\D/g, '').substring(0, 11)
    if (digits.length > 4) {
      return `${digits.slice(0, 4)}-${digits.slice(4)}`
    }
    return digits
  }

    // 🔹 Check if phone is valid (exactly 11 digits)
  function validatePhone(phone) {
    const digits = phone.replace(/\D/g, '')
    if (digits.length < 11) {
      setPhoneError('Phone number must be 11 digits')
      return false
    }
    if (digits.length > 11) {
      setPhoneError('Phone number cannot exceed 11 digits')
      return false
    }
    setPhoneError('')
    return true
  }

  // 🔹 Auto fill name & phone from session
  useEffect(() => {
    if (session?.user) {

      if (!form.customerName) {
        onChange({ target: { name: 'customerName', value: session.user.name || '' } })
      }

      if (!form.customerPhone) {
        const formattedPhone = session.user.phone ? formatPhoneNumber(session.user.phone) : ''
        onChange({ target: { name: 'customerPhone', value: formattedPhone } })
      }

    }
  }, [session])

  async function handleScreenshot(e) {
    const file = e.target.files[0]
    if (!file) return
    setPreview(URL.createObjectURL(file))
    await onScreenshotUpload(file)
  }

  const isOnline = form.paymentMethod === 'jazzcash' || form.paymentMethod === 'easypaisa'

  return (
    <div className="bg-white dark:bg-[#2C1810] border border-yellow-700/20 p-5 sm:p-7">

      <h3 className="text-lg sm:text-xl font-bold text-[#2C1810] dark:text-[#F5E6C0] mb-5 pb-4 border-b border-yellow-700/20"
        style={{ fontFamily: 'Playfair Display, serif' }}>
        Delivery Details
      </h3>

      <div className="flex flex-col gap-4">

        {/* Name + Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            ['customerName', 'Full Name *', 'text', 'Ahmed Khan'],
            ['customerPhone', 'Phone Number *', 'tel', '0333-1234567']
          ].map(([name, label, type, ph]) => (
            <div key={name}>
              <label className="block text-xs font-bold tracking-widest uppercase text-[#5C3317] dark:text-yellow-500/80 mb-2">
                {label}
              </label>

              <input
                name={name}
                type={type}
                value={form[name]}
                onChange={(e) => {
                  if (name === 'customerPhone') {
                    const formatted = formatPhoneNumber(e.target.value)
                    onChange({ target: { name, value: formatted } })
                  } else {
                    onChange(e)
                  }
                }}
                placeholder={ph}
                className="w-full px-4 py-3 bg-[#FDF6EC] dark:bg-[#1A0F0A] border border-yellow-700/30 text-[#2C1810] dark:text-[#F5E6C0] text-sm outline-none focus:border-yellow-500 transition-colors"
              />

            </div>
          ))}
        </div>

        {/* Delivery Address */}
        <div>
          <label className="block text-xs font-bold tracking-widest uppercase text-[#5C3317] dark:text-yellow-500/80 mb-2">
            Delivery Address *
          </label>

          <input
            name="deliveryAddress"
            value={form.deliveryAddress}
            onChange={onChange}
            placeholder="House #, Street, Area, City"
            className="w-full px-4 py-3 bg-[#FDF6EC] dark:bg-[#1A0F0A] border border-yellow-700/30 text-[#2C1810] dark:text-[#F5E6C0] text-sm outline-none focus:border-yellow-500 transition-colors"
          />
        </div>

        {/* Special Instructions */}
        <div>
          <label className="block text-xs font-bold tracking-widest uppercase text-[#5C3317] dark:text-yellow-500/80 mb-2">
            Special Instructions
          </label>

          <textarea
            name="specialInstructions"
            value={form.specialInstructions}
            onChange={onChange}
            placeholder="Cake message, dietary requirements..."
            rows={3}
            className="w-full px-4 py-3 bg-[#FDF6EC] dark:bg-[#1A0F0A] border border-yellow-700/30 text-[#2C1810] dark:text-[#F5E6C0] text-sm outline-none focus:border-yellow-500 resize-vertical"
          />
        </div>

        {/* Payment Method */}
        <div>
          <label className="block text-xs font-bold tracking-widest uppercase text-[#5C3317] dark:text-yellow-500/80 mb-3">
            Payment Method
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              ['cod', '💵 Cash on Delivery'],
              ['jazzcash', '📱 JazzCash'],
              ['easypaisa', '🟢 EasyPaisa']
            ].map(([val, label]) => (
              <label key={val} className={`flex items-center gap-2 cursor-pointer p-3 border transition-all duration-300
                ${form.paymentMethod === val
                    ? 'border-yellow-500 bg-[#FDF6EC] dark:bg-[#1A0F0A]'
                    : 'border-yellow-700/30 bg-white dark:bg-[#1A0F0A]/50 hover:border-yellow-500/50'
                  }`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value={val}
                  checked={form.paymentMethod === val}
                  onChange={onChange}
                  className="accent-yellow-500"
                />
                <span className="text-xs sm:text-sm font-medium text-[#2C1810] dark:text-[#F5E6C0]">{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Online Payment Screenshot */}
        {isOnline && (
          <div className="bg-[#FDF6EC] dark:bg-[#1A0F0A] border border-yellow-500/30 p-4">

            <div className="mb-4">
              <div className="text-xs font-bold tracking-widest uppercase text-[#C9A84C] mb-2">
                💳 Payment Details
              </div>
              {form.paymentMethod === 'jazzcash' ? (
                <div className="text-sm text-[#2C1810] dark:text-[#F5E6C0] space-y-1">
                  <p>📱 <strong>JazzCash Number:</strong> 0300-1234567</p>
                  <p>👤 <strong>Account Name:</strong> ZN Bakers</p>
                </div>
              ) : (
                <div className="text-sm text-[#2C1810] dark:text-[#F5E6C0] space-y-1">
                  <p>🟢 <strong>EasyPaisa Number:</strong> 0300-1234567</p>
                  <p>👤 <strong>Account Name:</strong> ZN Bakers</p>
                </div>
              )}
            </div>

            {/* Screenshot Upload */}
            {preview ? (
              <div className="relative">
                <img src={preview} alt="Payment screenshot" className="w-full max-h-48 object-contain border border-yellow-700/20 bg-white dark:bg-[#2C1810]" />
                <label className="absolute bottom-2 right-2 bg-[#C9A84C] text-[#2C1810] text-xs font-bold px-3 py-1.5 cursor-pointer hover:bg-yellow-400 transition-colors">
                  📷 Change
                  <input type="file" accept="image/*" onChange={handleScreenshot} className="hidden" />
                </label>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-yellow-500/40 cursor-pointer hover:border-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/10 transition-all duration-300">
                <span className="text-3xl mb-2">📸</span>
                <span className="text-xs text-[#8B5E3C] dark:text-yellow-200/60 font-medium">Click to upload payment screenshot</span>
                <input type="file" accept="image/*" onChange={handleScreenshot} className="hidden" />
              </label>
            )}

          </div>
        )}

      </div>

    </div>
  )
}









