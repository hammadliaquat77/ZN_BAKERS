// 'use client'
// import { useState, useEffect } from 'react'
// import { useRouter } from 'next/navigation'
// import { useSession } from 'next-auth/react'

// const CAKE_TYPES = ['Birthday Cake', 'Wedding Cake', 'Anniversary Cake', 'Baby Shower Cake', 'Engagement Cake', 'Corporate Cake', 'Other']
// const FLAVORS = ['Chocolate', 'Vanilla', 'Red Velvet', 'Butterscotch', 'Lemon', 'Strawberry', 'Black Forest', 'Caramel']
// const SIZES = [
//   { label: '0.5 kg', desc: '4–6 people', price: 'Rs. 800+' },
//   { label: '1 kg', desc: '8–12 people', price: 'Rs. 1,500+' },
//   { label: '2 kg', desc: '15–20 people', price: 'Rs. 2,800+' },
//   { label: '3 kg', desc: '25–30 people', price: 'Rs. 4,000+' },
//   { label: '4 kg+', desc: 'Large Events', price: 'Custom Quote' },
// ]
// const TIERS = ['1 Tier', '2 Tiers', '3 Tiers', '4+ Tiers']

// export default function CustomOrderPage() {
//   const router = useRouter()
//   const { data: session } = useSession()
//   const [step, setStep] = useState(1)
//   const [loading, setLoading] = useState(false)
//   const [toast, setToast] = useState({ msg: '', type: '' })

//   const [form, setForm] = useState({
//     cakeType: '',
//     flavor: '',
//     size: '',
//     tiers: '1 Tier',
//     message: '',
//     theme: '',
//     colors: '',
//     specialRequests: '',
//     customerName: '',
//     customerPhone: '',
//     customerEmail: '',
//     deliveryDate: '',
//     deliveryAddress: '',
//     paymentMethod: 'cod',
//     userId: '',
//   })

//   // Session se name, email, userId auto fill karo
//   useEffect(() => {
//     if (session?.user) {
//       setForm(prev => ({
//         ...prev,
//         customerName: session.user.name || prev.customerName,
//         customerEmail: session.user.email || prev.customerEmail,
//         userId: session.user.id || session.user.email || '',
//       }))
//     }
//   }, [session])

//   function handleChange(e) {
//     setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
//   }

//   function handleSelect(field, value) {
//     setForm(prev => ({ ...prev, [field]: value }))
//   }

//   function validateStep() {
//     if (step === 1 && (!form.cakeType || !form.flavor || !form.size)) {
//       showToast('⚠ Please select Cake Type, Flavor and Size.', 'error')
//       return false
//     }
//     if (step === 3 && (!form.customerName || !form.customerPhone || !form.deliveryDate || !form.deliveryAddress)) {
//       showToast('⚠ Please fill all required fields.', 'error')
//       return false
//     }
//     return true
//   }

//   function showToast(msg, type = 'success') {
//     setToast({ msg, type })
//     setTimeout(() => setToast({ msg: '', type: '' }), 3500)
//   }

//   async function handleSubmit() {
//     if (!validateStep()) return
//     setLoading(true)

//     try {
//       // Force inject userId aur email from session
//       const orderData = {
//         ...form,
//         userId: session?.user?.id || session?.user?.email || form.userId || '',
//         customerEmail: session?.user?.email || form.customerEmail || '',
//       }

//       const res = await fetch('/api/custom-orders', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(orderData),
//       })

//       if (!res.ok) {
//         const data = await res.json()
//         showToast('❌ ' + (data.error || 'Something went wrong'), 'error')
//         setLoading(false)
//         return
//       }

//       setLoading(false)
//       showToast('🎉 Custom order request sent! We\'ll contact you within 2 hours.')
//       setTimeout(() => router.push('/my-orders'), 3000)
//     } catch (err) {
//       showToast('❌ Something went wrong.', 'error')
//       setLoading(false)
//     }
//   }

//   const steps = ['Cake Details', 'Customization', 'Delivery & Payment']

//   return (
//     <div className="pt-[72px] min-h-screen bg-[#FDF6EC] dark:bg-[#1A0F0A] transition-colors duration-300">

//       {/* ── HEADER ── */}
//       <section className="bg-gradient-to-br from-[#2C1810] to-[#5C3317] py-14 px-6 text-center">
//         <span className="block text-[#C9A84C] text-xs font-bold tracking-[4px] uppercase mb-3">
//           Special Orders
//         </span>
//         <h1
//           className="text-3xl sm:text-4xl lg:text-5xl font-black text-white"
//           style={{ fontFamily: 'Playfair Display, serif' }}
//         >
//           Custom Cake <em className="italic text-[#C9A84C]">Order</em>
//         </h1>
//         <p className="text-white/60 mt-3 text-sm max-w-md mx-auto">
//           Tell us your dream cake and we'll make it reality!
//         </p>
//       </section>

//       {/* ── STEP INDICATOR ── */}
//       <div className="bg-white dark:bg-[#2C1810] border-b border-yellow-700/20 px-4 py-4">
//         <div className="max-w-2xl mx-auto flex items-center justify-between">
//           {steps.map((label, i) => {
//             const num = i + 1
//             const active = step === num
//             const done = step > num
//             return (
//               <div key={label} className="flex items-center flex-1">
//                 <div className="flex flex-col items-center flex-1">
//                   <div className={`w-9 h-9 flex items-center justify-center text-sm font-bold transition-all duration-300
//                     ${done ? 'bg-green-500 text-white' : active ? 'bg-[#C9A84C] text-[#2C1810]' : 'bg-[#FDF6EC] dark:bg-[#1A0F0A] text-[#8B5E3C] border border-yellow-700/30'}`}
//                   >
//                     {done ? '✓' : num}
//                   </div>
//                   <span className={`text-xs mt-1.5 font-semibold hidden sm:block tracking-wide
//                     ${active ? 'text-[#C9A84C]' : done ? 'text-green-500' : 'text-[#8B5E3C] dark:text-yellow-200/40'}`}
//                   >
//                     {label}
//                   </span>
//                 </div>
//                 {i < steps.length - 1 && (
//                   <div className={`h-0.5 flex-1 mx-2 transition-colors duration-300 ${done ? 'bg-green-500' : 'bg-yellow-700/20'}`} />
//                 )}
//               </div>
//             )
//           })}
//         </div>
//       </div>

//       {/* ── FORM ── */}
//       <div className="max-w-2xl mx-auto px-4 py-10">
//         <div className="bg-white dark:bg-[#2C1810] border border-yellow-700/20 p-6 sm:p-8">

//           {/* STEP 1 */}
//           {step === 1 && (
//             <div>
//               <h2 className="text-xl font-bold text-[#2C1810] dark:text-[#F5E6C0] mb-6 pb-3 border-b border-yellow-700/20" style={{ fontFamily: 'Playfair Display, serif' }}>
//                 🎂 Step 1 — Cake Details
//               </h2>

//               <div className="mb-6">
//                 <label className="block text-xs font-bold tracking-widest uppercase text-[#5C3317] dark:text-yellow-500/80 mb-3">Cake Type *</label>
//                 <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
//                   {CAKE_TYPES.map(type => (
//                     <button key={type} onClick={() => handleSelect('cakeType', type)}
//                       className={`py-2.5 px-3 text-xs font-semibold border cursor-pointer transition-all duration-300
//                         ${form.cakeType === type ? 'bg-[#2C1810] dark:bg-[#1A0F0A] text-[#C9A84C] border-[#C9A84C]' : 'bg-[#FDF6EC] dark:bg-[#1A0F0A]/60 text-[#5C3317] dark:text-yellow-200/70 border-yellow-700/30 hover:border-yellow-500'}`}>
//                       {type}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               <div className="mb-6">
//                 <label className="block text-xs font-bold tracking-widest uppercase text-[#5C3317] dark:text-yellow-500/80 mb-3">Cake Flavor *</label>
//                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
//                   {FLAVORS.map(flavor => (
//                     <button key={flavor} onClick={() => handleSelect('flavor', flavor)}
//                       className={`py-2.5 px-3 text-xs font-semibold border cursor-pointer transition-all duration-300
//                         ${form.flavor === flavor ? 'bg-[#2C1810] dark:bg-[#1A0F0A] text-[#C9A84C] border-[#C9A84C]' : 'bg-[#FDF6EC] dark:bg-[#1A0F0A]/60 text-[#5C3317] dark:text-yellow-200/70 border-yellow-700/30 hover:border-yellow-500'}`}>
//                       {flavor}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               <div className="mb-6">
//                 <label className="block text-xs font-bold tracking-widest uppercase text-[#5C3317] dark:text-yellow-500/80 mb-3">Cake Size *</label>
//                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
//                   {SIZES.map(s => (
//                     <button key={s.label} onClick={() => handleSelect('size', s.label)}
//                       className={`py-3 px-4 border cursor-pointer transition-all duration-300 text-left
//                         ${form.size === s.label ? 'bg-[#2C1810] dark:bg-[#1A0F0A] border-[#C9A84C]' : 'bg-[#FDF6EC] dark:bg-[#1A0F0A]/60 border-yellow-700/30 hover:border-yellow-500'}`}>
//                       <div className={`font-bold text-sm ${form.size === s.label ? 'text-[#C9A84C]' : 'text-[#2C1810] dark:text-[#F5E6C0]'}`}>{s.label}</div>
//                       <div className={`text-xs mt-0.5 ${form.size === s.label ? 'text-white/70' : 'text-[#8B5E3C] dark:text-yellow-200/50'}`}>{s.desc}</div>
//                       <div className={`text-xs font-semibold mt-1 ${form.size === s.label ? 'text-[#C9A84C]' : 'text-[#C9A84C]/70'}`}>{s.price}</div>
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-xs font-bold tracking-widest uppercase text-[#5C3317] dark:text-yellow-500/80 mb-3">Number of Tiers</label>
//                 <div className="flex gap-2 flex-wrap">
//                   {TIERS.map(tier => (
//                     <button key={tier} onClick={() => handleSelect('tiers', tier)}
//                       className={`py-2 px-5 text-xs font-semibold border cursor-pointer transition-all duration-300
//                         ${form.tiers === tier ? 'bg-[#2C1810] dark:bg-[#1A0F0A] text-[#C9A84C] border-[#C9A84C]' : 'bg-[#FDF6EC] dark:bg-[#1A0F0A]/60 text-[#5C3317] dark:text-yellow-200/70 border-yellow-700/30 hover:border-yellow-500'}`}>
//                       {tier}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* STEP 2 */}
//           {step === 2 && (
//             <div>
//               <h2 className="text-xl font-bold text-[#2C1810] dark:text-[#F5E6C0] mb-6 pb-3 border-b border-yellow-700/20" style={{ fontFamily: 'Playfair Display, serif' }}>
//                 ✨ Step 2 — Customization
//               </h2>

//               <div className="bg-[#FDF6EC] dark:bg-[#1A0F0A] border border-yellow-700/20 p-4 mb-6 text-sm">
//                 <div className="text-xs font-bold tracking-widest uppercase text-[#C9A84C] mb-2">Your Selection</div>
//                 <div className="flex flex-wrap gap-3 text-[#2C1810] dark:text-[#F5E6C0]">
//                   <span>🎂 {form.cakeType}</span>
//                   <span>• 🍫 {form.flavor}</span>
//                   <span>• ⚖️ {form.size}</span>
//                   <span>• 🏗 {form.tiers}</span>
//                 </div>
//               </div>

//               <div className="flex flex-col gap-4">
//                 {[
//                   ['message', 'Cake Message / Inscription', 'input', '"Happy Birthday Sara! 🎉"'],
//                   ['theme', 'Theme / Design', 'input', '"Floral", "Unicorn", "Football"'],
//                   ['colors', 'Color Preferences', 'input', '"Pink and Gold", "Blue and White"'],
//                 ].map(([name, label, , ph]) => (
//                   <div key={name}>
//                     <label className="block text-xs font-bold tracking-widest uppercase text-[#5C3317] dark:text-yellow-500/80 mb-2">{label}</label>
//                     <input name={name} value={form[name]} onChange={handleChange} placeholder={ph}
//                       className="w-full px-4 py-3 bg-[#FDF6EC] dark:bg-[#1A0F0A] border border-yellow-700/30 text-[#2C1810] dark:text-[#F5E6C0] text-sm outline-none focus:border-yellow-500 transition-colors" />
//                   </div>
//                 ))}
//                 <div>
//                   <label className="block text-xs font-bold tracking-widest uppercase text-[#5C3317] dark:text-yellow-500/80 mb-2">Special Requests</label>
//                   <textarea name="specialRequests" value={form.specialRequests} onChange={handleChange}
//                     placeholder="Allergies, dietary restrictions, specific decorations, photo on cake..." rows={4}
//                     className="w-full px-4 py-3 bg-[#FDF6EC] dark:bg-[#1A0F0A] border border-yellow-700/30 text-[#2C1810] dark:text-[#F5E6C0] text-sm outline-none focus:border-yellow-500 transition-colors resize-vertical" />
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* STEP 3 */}
//           {step === 3 && (
//             <div>
//               <h2 className="text-xl font-bold text-[#2C1810] dark:text-[#F5E6C0] mb-6 pb-3 border-b border-yellow-700/20" style={{ fontFamily: 'Playfair Display, serif' }}>
//                 🚚 Step 3 — Delivery & Payment
//               </h2>

//               <div className="flex flex-col gap-4">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   {[
//                     ['customerName', 'Full Name *', 'text', 'Ahmed Khan'],
//                     ['customerPhone', 'Phone Number *', 'tel', '0300-1234567'],
//                   ].map(([name, label, type, ph]) => (
//                     <div key={name}>
//                       <label className="block text-xs font-bold tracking-widest uppercase text-[#5C3317] dark:text-yellow-500/80 mb-2">{label}</label>
//                       <input name={name} type={type} value={form[name]} onChange={handleChange} placeholder={ph}
//                         className="w-full px-4 py-3 bg-[#FDF6EC] dark:bg-[#1A0F0A] border border-yellow-700/30 text-[#2C1810] dark:text-[#F5E6C0] text-sm outline-none focus:border-yellow-500 transition-colors" />
//                     </div>
//                   ))}
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-xs font-bold tracking-widest uppercase text-[#5C3317] dark:text-yellow-500/80 mb-2">
//                       Email <span className="text-yellow-600/60 normal-case font-normal">(optional)</span>
//                     </label>
//                     <input name="customerEmail" type="email" value={form.customerEmail} onChange={handleChange}
//                       placeholder="email@example.com"
//                       className="w-full px-4 py-3 bg-[#FDF6EC] dark:bg-[#1A0F0A] border border-yellow-700/30 text-[#2C1810] dark:text-[#F5E6C0] text-sm outline-none focus:border-yellow-500 transition-colors" />
//                   </div>
//                   <div>
//                     <label className="block text-xs font-bold tracking-widest uppercase text-[#5C3317] dark:text-yellow-500/80 mb-2">Delivery Date *</label>
//                     <input name="deliveryDate" type="date" value={form.deliveryDate} onChange={handleChange}
//                       min={new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0]}
//                       className="w-full px-4 py-3 bg-[#FDF6EC] dark:bg-[#1A0F0A] border border-yellow-700/30 text-[#2C1810] dark:text-[#F5E6C0] text-sm outline-none focus:border-yellow-500 transition-colors cursor-pointer" />
//                     <p className="text-xs text-[#8B5E3C] dark:text-yellow-200/40 mt-1">Minimum 3 days in advance</p>
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-xs font-bold tracking-widest uppercase text-[#5C3317] dark:text-yellow-500/80 mb-2">Delivery Address *</label>
//                   <input name="deliveryAddress" value={form.deliveryAddress} onChange={handleChange}
//                     placeholder="House #, Street, Area, City"
//                     className="w-full px-4 py-3 bg-[#FDF6EC] dark:bg-[#1A0F0A] border border-yellow-700/30 text-[#2C1810] dark:text-[#F5E6C0] text-sm outline-none focus:border-yellow-500 transition-colors" />
//                 </div>

//                 <div>
//                   <label className="block text-xs font-bold tracking-widest uppercase text-[#5C3317] dark:text-yellow-500/80 mb-3">Payment Method</label>
//                   <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
//                     {[['cod', '💵 Cash on Delivery'], ['jazzcash', '📱 JazzCash'], ['easypaisa', '🟢 EasyPaisa']].map(([val, label]) => (
//                       <label key={val} className={`flex items-center gap-2 cursor-pointer p-3 border transition-all duration-300
//                         ${form.paymentMethod === val ? 'border-yellow-500 bg-[#FDF6EC] dark:bg-[#1A0F0A]' : 'border-yellow-700/30 bg-white dark:bg-[#1A0F0A]/40 hover:border-yellow-500/50'}`}>
//                         <input type="radio" name="paymentMethod" value={val} checked={form.paymentMethod === val} onChange={handleChange} className="accent-yellow-500" />
//                         <span className="text-xs sm:text-sm font-medium text-[#2C1810] dark:text-[#F5E6C0]">{label}</span>
//                       </label>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Order Summary */}
//                 <div className="bg-[#2C1810] dark:bg-[#1A0F0A] border border-yellow-700/30 p-4 mt-2">
//                   <div className="text-xs font-bold tracking-widest uppercase text-[#C9A84C] mb-3">Order Summary</div>
//                   <div className="flex flex-col gap-1.5 text-sm">
//                     {[
//                       ['Cake Type', form.cakeType],
//                       ['Flavor', form.flavor],
//                       ['Size', form.size],
//                       ['Tiers', form.tiers],
//                       form.message && ['Message', `"${form.message}"`],
//                       form.theme && ['Theme', form.theme],
//                     ].filter(Boolean).map(([key, val]) => (
//                       <div key={key} className="flex justify-between">
//                         <span className="text-white/50">{key}</span>
//                         <span className="text-white font-medium">{val}</span>
//                       </div>
//                     ))}
//                   </div>
//                   <div className="border-t border-yellow-700/20 pt-3 mt-3 text-xs text-[#C9A84C]/70">
//                     💡 Final price will be confirmed via call within 2 hours.
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Buttons */}
//           <div className="flex gap-3 mt-8 pt-6 border-t border-yellow-700/20">
//             {step > 1 && (
//               <button onClick={() => setStep(s => s - 1)}
//                 className="flex-1 bg-transparent border border-yellow-700/30 dark:border-yellow-700/50 text-[#5C3317] dark:text-yellow-200/60 py-3.5 text-sm font-semibold cursor-pointer hover:border-yellow-500 transition-colors">
//                 ← Back
//               </button>
//             )}
//             {step < 3 ? (
//               <button onClick={() => { if (validateStep()) setStep(s => s + 1) }}
//                 className="flex-1 bg-[#C9A84C] text-[#2C1810] border-none py-3.5 text-sm font-bold tracking-widest uppercase cursor-pointer hover:bg-yellow-400 transition-colors">
//                 Next Step →
//               </button>
//             ) : (
//               <button onClick={handleSubmit} disabled={loading}
//                 className={`flex-1 border-none py-3.5 text-sm font-bold tracking-widest uppercase transition-colors
//                   ${loading ? 'bg-yellow-500/50 text-[#2C1810] cursor-not-allowed' : 'bg-[#C9A84C] text-[#2C1810] cursor-pointer hover:bg-yellow-400'}`}>
//                 {loading ? '⏳ Submitting...' : '✓ Submit Order'}
//               </button>
//             )}
//           </div>

//         </div>
//       </div>

//       {/* Toast */}
//       {toast.msg && (
//         <div className={`fixed bottom-6 right-6 px-5 py-3 text-sm font-semibold border-l-4 z-50 shadow-xl
//           ${toast.type === 'error' ? 'bg-red-900 text-red-200 border-red-400' : 'bg-[#2C1810] dark:bg-[#1A0F0A] text-[#C9A84C] border-[#C9A84C]'}`}>
//           {toast.msg}
//         </div>
//       )}
//     </div>
//   )
// }






// 'use client'
// import { useState, useEffect } from 'react'
// import { useRouter } from 'next/navigation'
// import { useSession } from 'next-auth/react'

// const CAKE_TYPES = ['Birthday Cake', 'Wedding Cake', 'Anniversary Cake', 'Baby Shower Cake', 'Engagement Cake', 'Corporate Cake', 'Other']
// const FLAVORS = ['Chocolate', 'Vanilla', 'Red Velvet', 'Butterscotch', 'Lemon', 'Strawberry', 'Black Forest', 'Caramel']
// const SIZES = [
//   { label: '0.5 kg', desc: '4–6 people', price: 'Rs. 800+' },
//   { label: '1 kg', desc: '8–12 people', price: 'Rs. 1,500+' },
//   { label: '2 kg', desc: '15–20 people', price: 'Rs. 2,800+' },
//   { label: '3 kg', desc: '25–30 people', price: 'Rs. 4,000+' },
//   { label: '4 kg+', desc: 'Large Events', price: 'Custom Quote' },
// ]
// const TIERS = ['1 Tier', '2 Tiers', '3 Tiers', '4+ Tiers']

// export default function CustomOrderPage() {
//   const router = useRouter()
//   const { data: session } = useSession()
//   const [step, setStep] = useState(1)
//   const [loading, setLoading] = useState(false)
//   const [toast, setToast] = useState({ msg: '', type: '' })
//   const [screenshotUrl, setScreenshotUrl] = useState('')
//   const [screenshotUploading, setScreenshotUploading] = useState(false)
//   const [screenshotPreview, setScreenshotPreview] = useState('')

//   const [form, setForm] = useState({
//     cakeType: '', flavor: '', size: '', tiers: '1 Tier',
//     message: '', theme: '', colors: '', specialRequests: '',
//     customerName: '', customerPhone: '', customerEmail: '',
//     deliveryDate: '', deliveryAddress: '', paymentMethod: 'cod',
//     userId: '',
//   })

//   useEffect(() => {
//     if (session?.user) {
//       setForm(prev => ({
//         ...prev,
//         customerName: session.user.name || prev.customerName,
//         customerEmail: session.user.email || prev.customerEmail,
//         userId: session.user.id || session.user.email || '',
//       }))
//     }
//   }, [session])

//   function handleChange(e) {
//     setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
//   }

//   function handleSelect(field, value) {
//     setForm(prev => ({ ...prev, [field]: value }))
//   }

//   async function handleScreenshotUpload(file) {
//     setScreenshotUploading(true)
//     setScreenshotPreview(URL.createObjectURL(file))
//     const formData = new FormData()
//     formData.append('screenshot', file)
//     const res = await fetch('/api/upload-payment', { method: 'POST', body: formData })
//     const data = await res.json()
//     if (res.ok) {
//       setScreenshotUrl(data.url)
//     } else {
//       showToast('❌ Screenshot upload failed', 'error')
//     }
//     setScreenshotUploading(false)
//   }

//   function validateStep() {
//     if (step === 1 && (!form.cakeType || !form.flavor || !form.size)) {
//       showToast('⚠ Please select Cake Type, Flavor and Size.', 'error')
//       return false
//     }
//     if (step === 3 && (!form.customerName || !form.customerPhone || !form.deliveryDate || !form.deliveryAddress)) {
//       showToast('⚠ Please fill all required fields.', 'error')
//       return false
//     }
//     // Online payment screenshot check
//     const isOnline = form.paymentMethod === 'jazzcash' || form.paymentMethod === 'easypaisa'
//     if (step === 3 && isOnline && !screenshotUrl) {
//       showToast('⚠ Please upload payment screenshot first!', 'error')
//       return false
//     }
//     return true
//   }

//   function showToast(msg, type = 'success') {
//     setToast({ msg, type })
//     setTimeout(() => setToast({ msg: '', type: '' }), 3500)
//   }

//   async function handleSubmit() {
//     if (!validateStep()) return
//     setLoading(true)
//     try {
//       const isOnline = form.paymentMethod === 'jazzcash' || form.paymentMethod === 'easypaisa'
//       const orderData = {
//         ...form,
//         userId: session?.user?.id || session?.user?.email || form.userId || '',
//         customerEmail: session?.user?.email || form.customerEmail || '',
//         paymentScreenshot: screenshotUrl || '',
//         paymentStatus: isOnline && screenshotUrl ? 'submitted' : 'pending',
//       }
//       const res = await fetch('/api/custom-orders', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(orderData),
//       })
//       if (!res.ok) {
//         const data = await res.json()
//         showToast('❌ ' + (data.error || 'Something went wrong'), 'error')
//         setLoading(false)
//         return
//       }
//       setLoading(false)
//       showToast('🎉 Custom order sent! We\'ll contact you within 2 hours.')
//       setTimeout(() => router.push('/orders'), 3000)
//     } catch (err) {
//       showToast('❌ Something went wrong.', 'error')
//       setLoading(false)
//     }
//   }

//   const isOnline = form.paymentMethod === 'jazzcash' || form.paymentMethod === 'easypaisa'
//   const steps = ['Cake Details', 'Customization', 'Delivery & Payment']

//   return (
//     <div className="pt-[72px] min-h-screen bg-[#FDF6EC] dark:bg-[#1A0F0A] transition-colors duration-300">

//       {/* Header */}
//       <section className="bg-gradient-to-br from-[#2C1810] to-[#5C3317] py-14 px-6 text-center">
//         <span className="block text-[#C9A84C] text-xs font-bold tracking-[4px] uppercase mb-3">Special Orders</span>
//         <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
//           Custom Cake <em className="italic text-[#C9A84C]">Order</em>
//         </h1>
//         <p className="text-white/60 mt-3 text-sm max-w-md mx-auto">Tell us your dream cake and we'll make it reality!</p>
//       </section>

//       {/* Step Indicator */}
//       <div className="bg-white dark:bg-[#2C1810] border-b border-yellow-700/20 px-4 py-4">
//         <div className="max-w-2xl mx-auto flex items-center justify-between">
//           {steps.map((label, i) => {
//             const num = i + 1
//             const active = step === num
//             const done = step > num
//             return (
//               <div key={label} className="flex items-center flex-1">
//                 <div className="flex flex-col items-center flex-1">
//                   <div className={`w-9 h-9 flex items-center justify-center text-sm font-bold transition-all duration-300
//                     ${done ? 'bg-green-500 text-white' : active ? 'bg-[#C9A84C] text-[#2C1810]' : 'bg-[#FDF6EC] dark:bg-[#1A0F0A] text-[#8B5E3C] border border-yellow-700/30'}`}>
//                     {done ? '✓' : num}
//                   </div>
//                   <span className={`text-xs mt-1.5 font-semibold hidden sm:block tracking-wide
//                     ${active ? 'text-[#C9A84C]' : done ? 'text-green-500' : 'text-[#8B5E3C] dark:text-yellow-200/40'}`}>
//                     {label}
//                   </span>
//                 </div>
//                 {i < steps.length - 1 && (
//                   <div className={`h-0.5 flex-1 mx-2 transition-colors duration-300 ${done ? 'bg-green-500' : 'bg-yellow-700/20'}`} />
//                 )}
//               </div>
//             )
//           })}
//         </div>
//       </div>

//       {/* Form */}
//       <div className="max-w-2xl mx-auto px-4 py-10">
//         <div className="bg-white dark:bg-[#2C1810] border border-yellow-700/20 p-6 sm:p-8">

//           {/* STEP 1 */}
//           {step === 1 && (
//             <div>
//               <h2 className="text-xl font-bold text-[#2C1810] dark:text-[#F5E6C0] mb-6 pb-3 border-b border-yellow-700/20" style={{ fontFamily: 'Playfair Display, serif' }}>
//                 🎂 Step 1 — Cake Details
//               </h2>
//               <div className="mb-6">
//                 <label className="block text-xs font-bold tracking-widest uppercase text-[#5C3317] dark:text-yellow-500/80 mb-3">Cake Type *</label>
//                 <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
//                   {CAKE_TYPES.map(type => (
//                     <button key={type} onClick={() => handleSelect('cakeType', type)}
//                       className={`py-2.5 px-3 text-xs font-semibold border cursor-pointer transition-all duration-300
//                         ${form.cakeType === type ? 'bg-[#2C1810] dark:bg-[#1A0F0A] text-[#C9A84C] border-[#C9A84C]' : 'bg-[#FDF6EC] dark:bg-[#1A0F0A]/60 text-[#5C3317] dark:text-yellow-200/70 border-yellow-700/30 hover:border-yellow-500'}`}>
//                       {type}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//               <div className="mb-6">
//                 <label className="block text-xs font-bold tracking-widest uppercase text-[#5C3317] dark:text-yellow-500/80 mb-3">Cake Flavor *</label>
//                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
//                   {FLAVORS.map(flavor => (
//                     <button key={flavor} onClick={() => handleSelect('flavor', flavor)}
//                       className={`py-2.5 px-3 text-xs font-semibold border cursor-pointer transition-all duration-300
//                         ${form.flavor === flavor ? 'bg-[#2C1810] dark:bg-[#1A0F0A] text-[#C9A84C] border-[#C9A84C]' : 'bg-[#FDF6EC] dark:bg-[#1A0F0A]/60 text-[#5C3317] dark:text-yellow-200/70 border-yellow-700/30 hover:border-yellow-500'}`}>
//                       {flavor}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//               <div className="mb-6">
//                 <label className="block text-xs font-bold tracking-widest uppercase text-[#5C3317] dark:text-yellow-500/80 mb-3">Cake Size *</label>
//                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
//                   {SIZES.map(s => (
//                     <button key={s.label} onClick={() => handleSelect('size', s.label)}
//                       className={`py-3 px-4 border cursor-pointer transition-all duration-300 text-left
//                         ${form.size === s.label ? 'bg-[#2C1810] dark:bg-[#1A0F0A] border-[#C9A84C]' : 'bg-[#FDF6EC] dark:bg-[#1A0F0A]/60 border-yellow-700/30 hover:border-yellow-500'}`}>
//                       <div className={`font-bold text-sm ${form.size === s.label ? 'text-[#C9A84C]' : 'text-[#2C1810] dark:text-[#F5E6C0]'}`}>{s.label}</div>
//                       <div className={`text-xs mt-0.5 ${form.size === s.label ? 'text-white/70' : 'text-[#8B5E3C] dark:text-yellow-200/50'}`}>{s.desc}</div>
//                       <div className={`text-xs font-semibold mt-1 ${form.size === s.label ? 'text-[#C9A84C]' : 'text-[#C9A84C]/70'}`}>{s.price}</div>
//                     </button>
//                   ))}
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-xs font-bold tracking-widest uppercase text-[#5C3317] dark:text-yellow-500/80 mb-3">Number of Tiers</label>
//                 <div className="flex gap-2 flex-wrap">
//                   {TIERS.map(tier => (
//                     <button key={tier} onClick={() => handleSelect('tiers', tier)}
//                       className={`py-2 px-5 text-xs font-semibold border cursor-pointer transition-all duration-300
//                         ${form.tiers === tier ? 'bg-[#2C1810] dark:bg-[#1A0F0A] text-[#C9A84C] border-[#C9A84C]' : 'bg-[#FDF6EC] dark:bg-[#1A0F0A]/60 text-[#5C3317] dark:text-yellow-200/70 border-yellow-700/30 hover:border-yellow-500'}`}>
//                       {tier}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* STEP 2 */}
//           {step === 2 && (
//             <div>
//               <h2 className="text-xl font-bold text-[#2C1810] dark:text-[#F5E6C0] mb-6 pb-3 border-b border-yellow-700/20" style={{ fontFamily: 'Playfair Display, serif' }}>
//                 ✨ Step 2 — Customization
//               </h2>
//               <div className="bg-[#FDF6EC] dark:bg-[#1A0F0A] border border-yellow-700/20 p-4 mb-6 text-sm">
//                 <div className="text-xs font-bold tracking-widest uppercase text-[#C9A84C] mb-2">Your Selection</div>
//                 <div className="flex flex-wrap gap-3 text-[#2C1810] dark:text-[#F5E6C0]">
//                   <span>🎂 {form.cakeType}</span><span>• 🍫 {form.flavor}</span>
//                   <span>• ⚖️ {form.size}</span><span>• 🏗 {form.tiers}</span>
//                 </div>
//               </div>
//               <div className="flex flex-col gap-4">
//                 {[
//                   ['message', 'Cake Message / Inscription', '"Happy Birthday Sara! 🎉"'],
//                   ['theme', 'Theme / Design', '"Floral", "Unicorn", "Football"'],
//                   ['colors', 'Color Preferences', '"Pink and Gold", "Blue and White"'],
//                 ].map(([name, label, ph]) => (
//                   <div key={name}>
//                     <label className="block text-xs font-bold tracking-widest uppercase text-[#5C3317] dark:text-yellow-500/80 mb-2">{label}</label>
//                     <input name={name} value={form[name]} onChange={handleChange} placeholder={ph}
//                       className="w-full px-4 py-3 bg-[#FDF6EC] dark:bg-[#1A0F0A] border border-yellow-700/30 text-[#2C1810] dark:text-[#F5E6C0] text-sm outline-none focus:border-yellow-500 transition-colors" />
//                   </div>
//                 ))}
//                 <div>
//                   <label className="block text-xs font-bold tracking-widest uppercase text-[#5C3317] dark:text-yellow-500/80 mb-2">Special Requests</label>
//                   <textarea name="specialRequests" value={form.specialRequests} onChange={handleChange}
//                     placeholder="Allergies, dietary restrictions, photo on cake..." rows={4}
//                     className="w-full px-4 py-3 bg-[#FDF6EC] dark:bg-[#1A0F0A] border border-yellow-700/30 text-[#2C1810] dark:text-[#F5E6C0] text-sm outline-none focus:border-yellow-500 transition-colors resize-vertical" />
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* STEP 3 */}
//           {step === 3 && (
//             <div>
//               <h2 className="text-xl font-bold text-[#2C1810] dark:text-[#F5E6C0] mb-6 pb-3 border-b border-yellow-700/20" style={{ fontFamily: 'Playfair Display, serif' }}>
//                 🚚 Step 3 — Delivery & Payment
//               </h2>
//               <div className="flex flex-col gap-4">

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   {[['customerName', 'Full Name *', 'text', 'Ahmed Khan'], ['customerPhone', 'Phone Number *', 'tel', '0300-1234567']].map(([name, label, type, ph]) => (
//                     <div key={name}>
//                       <label className="block text-xs font-bold tracking-widest uppercase text-[#5C3317] dark:text-yellow-500/80 mb-2">{label}</label>
//                       <input name={name} type={type} value={form[name]} onChange={handleChange} placeholder={ph}
//                         className="w-full px-4 py-3 bg-[#FDF6EC] dark:bg-[#1A0F0A] border border-yellow-700/30 text-[#2C1810] dark:text-[#F5E6C0] text-sm outline-none focus:border-yellow-500 transition-colors" />
//                     </div>
//                   ))}
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-xs font-bold tracking-widest uppercase text-[#5C3317] dark:text-yellow-500/80 mb-2">
//                       Email <span className="text-yellow-600/60 normal-case font-normal">(optional)</span>
//                     </label>
//                     <input name="customerEmail" type="email" value={form.customerEmail} onChange={handleChange} placeholder="email@example.com"
//                       className="w-full px-4 py-3 bg-[#FDF6EC] dark:bg-[#1A0F0A] border border-yellow-700/30 text-[#2C1810] dark:text-[#F5E6C0] text-sm outline-none focus:border-yellow-500 transition-colors" />
//                   </div>
//                   <div>
//                     <label className="block text-xs font-bold tracking-widest uppercase text-[#5C3317] dark:text-yellow-500/80 mb-2">Delivery Date *</label>
//                     <input name="deliveryDate" type="date" value={form.deliveryDate} onChange={handleChange}
//                       min={new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0]}
//                       className="w-full px-4 py-3 bg-[#FDF6EC] dark:bg-[#1A0F0A] border border-yellow-700/30 text-[#2C1810] dark:text-[#F5E6C0] text-sm outline-none focus:border-yellow-500 transition-colors cursor-pointer" />
//                     <p className="text-xs text-[#8B5E3C] dark:text-yellow-200/40 mt-1">Minimum 3 days in advance</p>
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-xs font-bold tracking-widest uppercase text-[#5C3317] dark:text-yellow-500/80 mb-2">Delivery Address *</label>
//                   <input name="deliveryAddress" value={form.deliveryAddress} onChange={handleChange} placeholder="House #, Street, Area, City"
//                     className="w-full px-4 py-3 bg-[#FDF6EC] dark:bg-[#1A0F0A] border border-yellow-700/30 text-[#2C1810] dark:text-[#F5E6C0] text-sm outline-none focus:border-yellow-500 transition-colors" />
//                 </div>

//                 {/* Payment Method */}
//                 <div>
//                   <label className="block text-xs font-bold tracking-widest uppercase text-[#5C3317] dark:text-yellow-500/80 mb-3">Payment Method</label>
//                   <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
//                     {[['cod', '💵 Cash on Delivery'], ['jazzcash', '📱 JazzCash'], ['easypaisa', '🟢 EasyPaisa']].map(([val, label]) => (
//                       <label key={val} className={`flex items-center gap-2 cursor-pointer p-3 border transition-all duration-300
//                         ${form.paymentMethod === val ? 'border-yellow-500 bg-[#FDF6EC] dark:bg-[#1A0F0A]' : 'border-yellow-700/30 bg-white dark:bg-[#1A0F0A]/40 hover:border-yellow-500/50'}`}>
//                         <input type="radio" name="paymentMethod" value={val} checked={form.paymentMethod === val} onChange={handleChange} className="accent-yellow-500" />
//                         <span className="text-xs sm:text-sm font-medium text-[#2C1810] dark:text-[#F5E6C0]">{label}</span>
//                       </label>
//                     ))}
//                   </div>
//                 </div>

//                 {/* ── Online Payment Screenshot ── */}
//                 {isOnline && (
//                   <div className="bg-[#FDF6EC] dark:bg-[#1A0F0A] border border-yellow-500/30 p-4">
//                     <div className="text-xs font-bold tracking-widest uppercase text-[#C9A84C] mb-3">
//                       💳 Payment Details
//                     </div>

//                     {/* Account Info */}
//                     <div className="text-sm text-[#2C1810] dark:text-[#F5E6C0] space-y-1 mb-3">
//                       {form.paymentMethod === 'jazzcash' ? (
//                         <>
//                           <p>📱 <strong>JazzCash Number:</strong> 0300-1234567</p>
//                           <p>👤 <strong>Account Name:</strong> ZN Bakers</p>
//                         </>
//                       ) : (
//                         <>
//                           <p>🟢 <strong>EasyPaisa Number:</strong> 0300-1234567</p>
//                           <p>👤 <strong>Account Name:</strong> ZN Bakers</p>
//                         </>
//                       )}
//                       <p className="text-xs text-[#8B5E3C] dark:text-yellow-200/50 mt-1">
//                         ⚠️ Payment karne ke baad screenshot upload karein
//                       </p>
//                     </div>

//                     {/* Screenshot Upload */}
//                     <div>
//                       <label className="block text-xs font-bold tracking-widest uppercase text-[#5C3317] dark:text-yellow-500/80 mb-2">
//                         Payment Screenshot *
//                       </label>

//                       {screenshotPreview ? (
//                         <div className="relative">
//                           <img src={screenshotPreview} alt="Payment screenshot"
//                             className="w-full max-h-48 object-contain border border-yellow-700/20 bg-white dark:bg-[#2C1810]" />

//                           {/* Uploading overlay */}
//                           {screenshotUploading && (
//                             <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
//                               <div className="text-center text-white">
//                                 <div className="text-3xl mb-2 animate-spin">⏳</div>
//                                 <p className="text-xs font-bold">Uploading...</p>
//                               </div>
//                             </div>
//                           )}

//                           {/* Uploaded badge */}
//                           {screenshotUrl && !screenshotUploading && (
//                             <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1">
//                               ✓ Uploaded
//                             </div>
//                           )}

//                           {/* Change button */}
//                           {!screenshotUploading && (
//                             <label className="absolute bottom-2 right-2 bg-[#C9A84C] text-[#2C1810] text-xs font-bold px-3 py-1.5 cursor-pointer hover:bg-yellow-400 transition-colors">
//                               📷 Change
//                               <input type="file" accept="image/*"
//                                 onChange={e => { if (e.target.files[0]) handleScreenshotUpload(e.target.files[0]) }}
//                                 className="hidden" />
//                             </label>
//                           )}
//                         </div>
//                       ) : (
//                         <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed transition-all duration-300
//                           ${screenshotUploading
//                             ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/10 cursor-not-allowed'
//                             : 'border-yellow-500/40 cursor-pointer hover:border-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/10'
//                           }`}>
//                           {screenshotUploading ? (
//                             <>
//                               <span className="text-2xl mb-2 animate-spin">⏳</span>
//                               <span className="text-xs text-[#8B5E3C] dark:text-yellow-200/60 font-medium">Uploading...</span>
//                             </>
//                           ) : (
//                             <>
//                               <span className="text-3xl mb-2">📸</span>
//                               <span className="text-xs text-[#8B5E3C] dark:text-yellow-200/60 font-medium">Click to upload payment screenshot</span>
//                               <span className="text-xs text-[#8B5E3C]/50 dark:text-yellow-200/30 mt-1">JPG, PNG supported</span>
//                             </>
//                           )}
//                           <input type="file" accept="image/*" disabled={screenshotUploading}
//                             onChange={e => { if (e.target.files[0]) handleScreenshotUpload(e.target.files[0]) }}
//                             className="hidden" />
//                         </label>
//                       )}
//                     </div>
//                   </div>
//                 )}

//                 {/* Order Summary */}
//                 <div className="bg-[#2C1810] dark:bg-[#1A0F0A] border border-yellow-700/30 p-4 mt-2">
//                   <div className="text-xs font-bold tracking-widest uppercase text-[#C9A84C] mb-3">Order Summary</div>
//                   <div className="flex flex-col gap-1.5 text-sm">
//                     {[
//                       ['Cake Type', form.cakeType], ['Flavor', form.flavor],
//                       ['Size', form.size], ['Tiers', form.tiers],
//                       form.message && ['Message', `"${form.message}"`],
//                       form.theme && ['Theme', form.theme],
//                     ].filter(Boolean).map(([key, val]) => (
//                       <div key={key} className="flex justify-between">
//                         <span className="text-white/50">{key}</span>
//                         <span className="text-white font-medium">{val}</span>
//                       </div>
//                     ))}
//                   </div>
//                   <div className="border-t border-yellow-700/20 pt-3 mt-3 text-xs text-[#C9A84C]/70">
//                     💡 Final price will be confirmed via call within 2 hours.
//                   </div>
//                 </div>

//               </div>
//             </div>
//           )}

//           {/* Navigation Buttons */}
//           <div className="flex gap-3 mt-8 pt-6 border-t border-yellow-700/20">
//             {step > 1 && (
//               <button onClick={() => setStep(s => s - 1)}
//                 className="flex-1 bg-transparent border border-yellow-700/30 dark:border-yellow-700/50 text-[#5C3317] dark:text-yellow-200/60 py-3.5 text-sm font-semibold cursor-pointer hover:border-yellow-500 transition-colors">
//                 ← Back
//               </button>
//             )}
//             {step < 3 ? (
//               <button onClick={() => { if (validateStep()) setStep(s => s + 1) }}
//                 className="flex-1 bg-[#C9A84C] text-[#2C1810] border-none py-3.5 text-sm font-bold tracking-widest uppercase cursor-pointer hover:bg-yellow-400 transition-colors">
//                 Next Step →
//               </button>
//             ) : (
//               <button
//                 onClick={handleSubmit}
//                 disabled={loading || screenshotUploading || (isOnline && !screenshotUrl)}
//                 className={`flex-1 border-none py-3.5 text-sm font-bold tracking-widest uppercase transition-colors
//                   ${loading || screenshotUploading || (isOnline && !screenshotUrl)
//                     ? 'bg-yellow-500/50 text-[#2C1810] cursor-not-allowed'
//                     : 'bg-[#C9A84C] text-[#2C1810] cursor-pointer hover:bg-yellow-400'
//                   }`}
//               >
//                 {screenshotUploading
//                   ? '📤 Uploading Screenshot...'
//                   : loading
//                   ? '⏳ Submitting...'
//                   : isOnline && !screenshotUrl
//                   ? '📸 Upload Screenshot First'
//                   : '✓ Submit Order'
//                 }
//               </button>
//             )}
//           </div>

//         </div>
//       </div>

//       {/* Toast */}
//       {toast.msg && (
//         <div className={`fixed bottom-6 right-6 px-5 py-3 text-sm font-semibold border-l-4 z-50 shadow-xl
//           ${toast.type === 'error' ? 'bg-red-900 text-red-200 border-red-400' : 'bg-[#2C1810] dark:bg-[#1A0F0A] text-[#C9A84C] border-[#C9A84C]'}`}>
//           {toast.msg}
//         </div>
//       )}
//     </div>
//   )
// }







'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

const CAKE_TYPES = ['Birthday Cake', 'Wedding Cake', 'Anniversary Cake', 'Baby Shower Cake', 'Engagement Cake', 'Corporate Cake', 'Other']
const FLAVORS = ['Chocolate', 'Vanilla', 'Red Velvet', 'Butterscotch', 'Lemon', 'Strawberry', 'Black Forest', 'Caramel']
const SIZES = [
  { label: '0.5 kg', desc: '4–6 people', price: 'Rs. 800+' },
  { label: '1 kg', desc: '8–12 people', price: 'Rs. 1,500+' },
  { label: '2 kg', desc: '15–20 people', price: 'Rs. 2,800+' },
  { label: '3 kg', desc: '25–30 people', price: 'Rs. 4,000+' },
  { label: '4 kg+', desc: 'Large Events', price: 'Custom Quote' },
]
const TIERS = ['1 Tier', '2 Tiers', '3 Tiers', '4+ Tiers']

export default function CustomOrderPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState({ msg: '', type: '' })

  const [form, setForm] = useState({
    cakeType: '', flavor: '', size: '', tiers: '1 Tier',
    message: '', theme: '', colors: '', specialRequests: '',
    customerName: '', customerPhone: '', customerEmail: '',
    deliveryDate: '', deliveryAddress: '',
    userId: '',
  })

  useEffect(() => {
    if (session?.user) {
      setForm(prev => ({
        ...prev,
        customerName: session.user.name || prev.customerName,
        customerEmail: session.user.email || prev.customerEmail,
        customerPhone: session.user.phone || prev.customerPhone,
        userId: session.user.id || session.user.email || '',
      }))
    }
  }, [session])

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSelect(field, value) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  function validateStep() {
    if (step === 1 && (!form.cakeType || !form.flavor || !form.size)) {
      showToast('⚠ Please select Cake Type, Flavor and Size.', 'error')
      return false
    }
    if (step === 3 && (!form.customerName || !form.customerPhone || !form.deliveryDate || !form.deliveryAddress)) {
      showToast('⚠ Please fill all required fields.', 'error')
      return false
    }
    return true
  }

  function showToast(msg, type = 'success') {
    setToast({ msg, type })
    setTimeout(() => setToast({ msg: '', type: '' }), 3500)
  }

  async function handleSubmit() {
    if (!validateStep()) return
    setLoading(true)
    try {
      const orderData = {
        ...form,
        userId: session?.user?.id || session?.user?.email || form.userId || '',
        customerEmail: session?.user?.email || form.customerEmail || '',
        paymentStatus: 'pending',
      }
      const res = await fetch('/api/custom-orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      })
      if (!res.ok) {
        const data = await res.json()
        showToast('❌ ' + (data.error || 'Something went wrong'), 'error')
        setLoading(false)
        return
      }
      setLoading(false)
      showToast('🎉 Custom order sent! We\'ll contact you within 2 hours.')
      setTimeout(() => router.push('/my-orders'), 3000)
    } catch (err) {
      showToast('❌ Something went wrong.', 'error')
      setLoading(false)
    }
  }

  const steps = ['Cake Details', 'Customization', 'Delivery Info']

  return (
    <div className="pt-[72px] min-h-screen bg-[#FDF6EC] dark:bg-[#1A0F0A] transition-colors duration-300">

      {/* Header */}
      <section className="bg-gradient-to-br from-[#2C1810] to-[#5C3317] py-14 px-6 text-center">
        <span className="block text-[#C9A84C] text-xs font-bold tracking-[4px] uppercase mb-3">Special Orders</span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
          Custom Cake <em className="italic text-[#C9A84C]">Order</em>
        </h1>
        <p className="text-white/60 mt-3 text-sm max-w-md mx-auto">
          Tell us your dream cake and we'll make it reality!
        </p>
      </section>

      {/* Step Indicator */}
      <div className="bg-white dark:bg-[#2C1810] border-b border-yellow-700/20 px-4 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          {steps.map((label, i) => {
            const num = i + 1
            const active = step === num
            const done = step > num
            return (
              <div key={label} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div className={`w-9 h-9 flex items-center justify-center text-sm font-bold transition-all duration-300
                    ${done ? 'bg-green-500 text-white' : active ? 'bg-[#C9A84C] text-[#2C1810]' : 'bg-[#FDF6EC] dark:bg-[#1A0F0A] text-[#8B5E3C] border border-yellow-700/30'}`}>
                    {done ? '✓' : num}
                  </div>
                  <span className={`text-xs mt-1.5 font-semibold hidden sm:block tracking-wide
                    ${active ? 'text-[#C9A84C]' : done ? 'text-green-500' : 'text-[#8B5E3C] dark:text-yellow-200/40'}`}>
                    {label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`h-0.5 flex-1 mx-2 transition-colors duration-300 ${done ? 'bg-green-500' : 'bg-yellow-700/20'}`} />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Form */}
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="bg-white dark:bg-[#2C1810] border border-yellow-700/20 p-6 sm:p-8">

          {/* STEP 1 — Cake Details */}
          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold text-[#2C1810] dark:text-[#F5E6C0] mb-6 pb-3 border-b border-yellow-700/20" style={{ fontFamily: 'Playfair Display, serif' }}>
                🎂 Step 1 — Cake Details
              </h2>

              {/* Cake Type */}
              <div className="mb-6">
                <label className="block text-xs font-bold tracking-widest uppercase text-[#5C3317] dark:text-yellow-500/80 mb-3">Cake Type *</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {CAKE_TYPES.map(type => (
                    <button key={type} onClick={() => handleSelect('cakeType', type)}
                      className={`py-2.5 px-3 text-xs font-semibold border cursor-pointer transition-all duration-300
                        ${form.cakeType === type
                          ? 'bg-[#2C1810] dark:bg-[#1A0F0A] text-[#C9A84C] border-[#C9A84C]'
                          : 'bg-[#FDF6EC] dark:bg-[#1A0F0A]/60 text-[#5C3317] dark:text-yellow-200/70 border-yellow-700/30 hover:border-yellow-500'}`}>
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Flavor */}
              <div className="mb-6">
                <label className="block text-xs font-bold tracking-widest uppercase text-[#5C3317] dark:text-yellow-500/80 mb-3">Cake Flavor *</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {FLAVORS.map(flavor => (
                    <button key={flavor} onClick={() => handleSelect('flavor', flavor)}
                      className={`py-2.5 px-3 text-xs font-semibold border cursor-pointer transition-all duration-300
                        ${form.flavor === flavor
                          ? 'bg-[#2C1810] dark:bg-[#1A0F0A] text-[#C9A84C] border-[#C9A84C]'
                          : 'bg-[#FDF6EC] dark:bg-[#1A0F0A]/60 text-[#5C3317] dark:text-yellow-200/70 border-yellow-700/30 hover:border-yellow-500'}`}>
                      {flavor}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div className="mb-6">
                <label className="block text-xs font-bold tracking-widest uppercase text-[#5C3317] dark:text-yellow-500/80 mb-3">Cake Size *</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {SIZES.map(s => (
                    <button key={s.label} onClick={() => handleSelect('size', s.label)}
                      className={`py-3 px-4 border cursor-pointer transition-all duration-300 text-left
                        ${form.size === s.label
                          ? 'bg-[#2C1810] dark:bg-[#1A0F0A] border-[#C9A84C]'
                          : 'bg-[#FDF6EC] dark:bg-[#1A0F0A]/60 border-yellow-700/30 hover:border-yellow-500'}`}>
                      <div className={`font-bold text-sm ${form.size === s.label ? 'text-[#C9A84C]' : 'text-[#2C1810] dark:text-[#F5E6C0]'}`}>{s.label}</div>
                      <div className={`text-xs mt-0.5 ${form.size === s.label ? 'text-white/70' : 'text-[#8B5E3C] dark:text-yellow-200/50'}`}>{s.desc}</div>
                      <div className={`text-xs font-semibold mt-1 ${form.size === s.label ? 'text-[#C9A84C]' : 'text-[#C9A84C]/70'}`}>{s.price}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tiers */}
              <div>
                <label className="block text-xs font-bold tracking-widest uppercase text-[#5C3317] dark:text-yellow-500/80 mb-3">Number of Tiers</label>
                <div className="flex gap-2 flex-wrap">
                  {TIERS.map(tier => (
                    <button key={tier} onClick={() => handleSelect('tiers', tier)}
                      className={`py-2 px-5 text-xs font-semibold border cursor-pointer transition-all duration-300
                        ${form.tiers === tier
                          ? 'bg-[#2C1810] dark:bg-[#1A0F0A] text-[#C9A84C] border-[#C9A84C]'
                          : 'bg-[#FDF6EC] dark:bg-[#1A0F0A]/60 text-[#5C3317] dark:text-yellow-200/70 border-yellow-700/30 hover:border-yellow-500'}`}>
                      {tier}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2 — Customization */}
          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold text-[#2C1810] dark:text-[#F5E6C0] mb-6 pb-3 border-b border-yellow-700/20" style={{ fontFamily: 'Playfair Display, serif' }}>
                ✨ Step 2 — Customization
              </h2>

              {/* Selection Summary */}
              <div className="bg-[#FDF6EC] dark:bg-[#1A0F0A] border border-yellow-700/20 p-4 mb-6 text-sm">
                <div className="text-xs font-bold tracking-widest uppercase text-[#C9A84C] mb-2">Your Selection</div>
                <div className="flex flex-wrap gap-3 text-[#2C1810] dark:text-[#F5E6C0]">
                  <span>🎂 {form.cakeType}</span>
                  <span>• 🍫 {form.flavor}</span>
                  <span>• ⚖️ {form.size}</span>
                  <span>• 🏗 {form.tiers}</span>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                {[
                  ['message', 'Cake Message / Inscription', '"Happy Birthday Sara! 🎉"'],
                  ['theme', 'Theme / Design', '"Floral", "Unicorn", "Football"'],
                  ['colors', 'Color Preferences', '"Pink and Gold", "Blue and White"'],
                ].map(([name, label, ph]) => (
                  <div key={name}>
                    <label className="block text-xs font-bold tracking-widest uppercase text-[#5C3317] dark:text-yellow-500/80 mb-2">{label}</label>
                    <input name={name} value={form[name]} onChange={handleChange} placeholder={ph}
                      className="w-full px-4 py-3 bg-[#FDF6EC] dark:bg-[#1A0F0A] border border-yellow-700/30 text-[#2C1810] dark:text-[#F5E6C0] text-sm outline-none focus:border-yellow-500 transition-colors" />
                  </div>
                ))}
                <div>
                  <label className="block text-xs font-bold tracking-widest uppercase text-[#5C3317] dark:text-yellow-500/80 mb-2">Special Requests</label>
                  <textarea name="specialRequests" value={form.specialRequests} onChange={handleChange}
                    placeholder="Allergies, dietary restrictions, photo on cake..." rows={4}
                    className="w-full px-4 py-3 bg-[#FDF6EC] dark:bg-[#1A0F0A] border border-yellow-700/30 text-[#2C1810] dark:text-[#F5E6C0] text-sm outline-none focus:border-yellow-500 transition-colors resize-vertical" />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3 — Delivery Info */}
          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold text-[#2C1810] dark:text-[#F5E6C0] mb-6 pb-3 border-b border-yellow-700/20" style={{ fontFamily: 'Playfair Display, serif' }}>
                🚚 Step 3 — Delivery Info
              </h2>

              <div className="flex flex-col gap-4">

                {/* Name + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    ['customerName', 'Full Name *', 'text', 'Ahmed Khan'],
                    ['customerPhone', 'Phone Number *', 'tel', '0300-1234567'],
                  ].map(([name, label, type, ph]) => (
                    <div key={name}>
                      <label className="block text-xs font-bold tracking-widest uppercase text-[#5C3317] dark:text-yellow-500/80 mb-2">{label}</label>
                      <input name={name} type={type} value={form[name]} onChange={handleChange} placeholder={ph}
                        className="w-full px-4 py-3 bg-[#FDF6EC] dark:bg-[#1A0F0A] border border-yellow-700/30 text-[#2C1810] dark:text-[#F5E6C0] text-sm outline-none focus:border-yellow-500 transition-colors" />
                    </div>
                  ))}
                </div>

                {/* Email + Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold tracking-widest uppercase text-[#5C3317] dark:text-yellow-500/80 mb-2">
                      Email <span className="text-yellow-600/60 normal-case font-normal">(optional)</span>
                    </label>
                    <input name="customerEmail" type="email" value={form.customerEmail} onChange={handleChange}
                      placeholder="email@example.com"
                      className="w-full px-4 py-3 bg-[#FDF6EC] dark:bg-[#1A0F0A] border border-yellow-700/30 text-[#2C1810] dark:text-[#F5E6C0] text-sm outline-none focus:border-yellow-500 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold tracking-widest uppercase text-[#5C3317] dark:text-yellow-500/80 mb-2">Delivery Date *</label>
                    <input name="deliveryDate" type="date" value={form.deliveryDate} onChange={handleChange}
                      min={new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0]}
                      className="w-full px-4 py-3 bg-[#FDF6EC] dark:bg-[#1A0F0A] border border-yellow-700/30 text-[#2C1810] dark:text-[#F5E6C0] text-sm outline-none focus:border-yellow-500 transition-colors cursor-pointer" />
                    <p className="text-xs text-[#8B5E3C] dark:text-yellow-200/40 mt-1">Minimum 3 days in advance</p>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-xs font-bold tracking-widest uppercase text-[#5C3317] dark:text-yellow-500/80 mb-2">Delivery Address *</label>
                  <input name="deliveryAddress" value={form.deliveryAddress} onChange={handleChange}
                    placeholder="House #, Street, Area, City"
                    className="w-full px-4 py-3 bg-[#FDF6EC] dark:bg-[#1A0F0A] border border-yellow-700/30 text-[#2C1810] dark:text-[#F5E6C0] text-sm outline-none focus:border-yellow-500 transition-colors" />
                </div>

                {/* ── Payment Info Notice ── */}
                <div className="bg-[#FDF6EC] dark:bg-[#1A0F0A] border border-yellow-500/30 p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl mt-0.5">💡</span>
                    <div>
                      <p className="font-bold text-sm text-[#2C1810] dark:text-[#F5E6C0] mb-1">
                        Payment Information
                      </p>
                      <p className="text-xs text-[#8B5E3C] dark:text-yellow-200/60 leading-relaxed">
                        Custom cake ki exact price admin calculate karega aur aapko <strong className="text-[#C9A84C]">2 ghante ke andar call/WhatsApp</strong> par batai jaegi. Price confirm hone ke baad payment karein.
                      </p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {['💵 Cash on Delivery', '📱 JazzCash', '🟢 EasyPaisa'].map(m => (
                          <span key={m} className="text-xs bg-white dark:bg-[#2C1810] border border-yellow-700/20 px-2.5 py-1 text-[#5C3317] dark:text-yellow-200/60">
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="bg-[#2C1810] dark:bg-[#1A0F0A] border border-yellow-700/30 p-4">
                  <div className="text-xs font-bold tracking-widest uppercase text-[#C9A84C] mb-3">Order Summary</div>
                  <div className="flex flex-col gap-1.5 text-sm">
                    {[
                      ['Cake Type', form.cakeType],
                      ['Flavor', form.flavor],
                      ['Size', form.size],
                      ['Tiers', form.tiers],
                      form.message && ['Message', `"${form.message}"`],
                      form.theme && ['Theme', form.theme],
                      form.colors && ['Colors', form.colors],
                    ].filter(Boolean).map(([key, val]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-white/50">{key}</span>
                        <span className="text-white font-medium text-right max-w-[200px] truncate">{val}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-yellow-700/20 pt-3 mt-3">
                    <div className="flex items-center gap-2 text-xs text-[#C9A84C]/80">
                      <span>⏳</span>
                      <span>Price will be confirmed via call within 2 hours</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-3 mt-8 pt-6 border-t border-yellow-700/20">
            {step > 1 && (
              <button onClick={() => setStep(s => s - 1)}
                className="flex-1 bg-transparent border border-yellow-700/30 dark:border-yellow-700/50 text-[#5C3317] dark:text-yellow-200/60 py-3.5 text-sm font-semibold cursor-pointer hover:border-yellow-500 transition-colors">
                ← Back
              </button>
            )}
            {step < 3 ? (
              <button onClick={() => { if (validateStep()) setStep(s => s + 1) }}
                className="flex-1 bg-[#C9A84C] text-[#2C1810] border-none py-3.5 text-sm font-bold tracking-widest uppercase cursor-pointer hover:bg-yellow-400 transition-colors">
                Next Step →
              </button>
            ) : (
              <button onClick={handleSubmit} disabled={loading}
                className={`flex-1 border-none py-3.5 text-sm font-bold tracking-widest uppercase transition-colors
                  ${loading
                    ? 'bg-yellow-500/50 text-[#2C1810] cursor-not-allowed'
                    : 'bg-[#C9A84C] text-[#2C1810] cursor-pointer hover:bg-yellow-400'}`}>
                {loading ? '⏳ Submitting...' : '✓ Submit Order'}
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Toast */}
      {toast.msg && (
        <div className={`fixed bottom-6 right-6 px-5 py-3 text-sm font-semibold border-l-4 z-50 shadow-xl
          ${toast.type === 'error'
            ? 'bg-red-900 text-red-200 border-red-400'
            : 'bg-[#2C1810] dark:bg-[#1A0F0A] text-[#C9A84C] border-[#C9A84C]'}`}>
          {toast.msg}
        </div>
      )}
    </div>
  )
}
