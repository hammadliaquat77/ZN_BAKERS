// 'use client'
// import { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import Link from 'next/link'
// import { useTheme } from '@/components/ThemeContext'

// export default function RegisterPage() {
//   const { darkMode } = useTheme()
//   const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' })
//   const [error, setError] = useState('')
//   const [success, setSuccess] = useState(false)
//   const [loading, setLoading] = useState(false)
//   const router = useRouter()

//   async function handleSubmit(e) {
//     e.preventDefault()
//     setError('')
//     if (form.password !== form.confirm) { setError('Passwords do not match'); return }
//     if (form.password.length < 6) { setError('Password must be at least 6 characters'); return }

//     setLoading(true)
//     const res = await fetch('/api/auth/register', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ name: form.name, email: form.email, phone: form.phone, password: form.password }),
//     })
//     const data = await res.json()
//     setLoading(false)
//     if (!res.ok) { setError(data.error); return }
//     setSuccess(true)
//     setTimeout(() => router.push('/login'), 2000)
//   }

//   return (
//     <div className={`min-h-screen flex items-center justify-center p-5 mt-16 transition-colors duration-300 ${darkMode ? 'bg-gradient-to-br from-[#0F0705] to-[#2C1810]' : 'bg-gradient-to-br from-[#FDFBF6] to-[#FFF5E5]'}`}>
//       <div className={`w-full max-w-md p-8 rounded-md transition-colors duration-300 ${darkMode ? 'bg-[#1B0D06] text-white' : 'bg-[#FDF6EC] text-[#2C1810]'}`}>
        
//         <div className="text-center mb-6">
//           <Link href="/" className={`font-black text-2xl ${darkMode ? 'text-yellow-500' : 'text-[#C9A84C]'} font-serif no-underline`}>
//             ZN<span className={`${darkMode ? 'text-white' : 'text-[#2C1810]'}`}>Bakers</span>
//           </Link>
//           <p className={`mt-2 text-sm transition-colors duration-300 ${darkMode ? 'text-white/60' : 'text-[#8B5E3C]'}`}>
//             Create your account to start ordering.
//           </p>
//         </div>

//         {error && <div className="mb-4 p-3 text-sm font-medium border-l-4 border-red-500 bg-red-100 text-red-700 rounded transition-colors duration-300">{error}</div>}
//         {success && <div className="mb-4 p-3 text-sm font-medium border-l-4 border-green-500 bg-green-100 text-green-700 rounded transition-colors duration-300">✓ Account created! Redirecting to login...</div>}

//         <form onSubmit={handleSubmit}>
//           {[
//             ['name', 'Full Name', 'text', 'Ahmed Khan'],
//             ['email', 'Email Address', 'email', 'ahmed@example.com'],
//             ['phone', 'Phone Number', 'tel', '0300-1234567'],
//             ['password', 'Password', 'password', 'Min 6 characters'],
//             ['confirm', 'Confirm Password', 'password', 'Repeat password'],
//           ].map(([name, label, type, ph]) => (
//             <div key={name} className="mb-4">
//               <label className={`block mb-1 text-xs font-semibold uppercase tracking-wider transition-colors duration-300 ${darkMode ? 'text-white/60' : 'text-[#5C3317]'}`}>{label}</label>
//               <input
//                 type={type}
//                 value={form[name]}
//                 onChange={e => setForm(p => ({ ...p, [name]: e.target.value }))}
//                 placeholder={ph}
//                 required={name !== 'phone'}
//                 className={`w-full p-3 rounded border transition-colors duration-300 focus:outline-none ${darkMode ? 'bg-[#2C1810] border-yellow-700/30 text-white' : 'bg-white border-yellow-200 text-[#2C1810]'}`}
//               />
//             </div>
//           ))}

//           <button
//             type="submit"
//             disabled={loading || success}
//             className={`w-full py-3 mt-2 font-bold text-xs tracking-widest uppercase rounded transition-all duration-300 ${darkMode ? 'bg-yellow-500 text-[#2C1810] hover:bg-yellow-400' : 'bg-[#2C1810] text-yellow-500 hover:bg-[#5C3317]'} ${loading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
//           >
//             {loading ? 'Creating Account...' : 'Create Account'}
//           </button>
//         </form>

//         <p className={`text-center mt-4 text-sm transition-colors duration-300 ${darkMode ? 'text-white/60' : 'text-[#8B5E3C]'}`}>
//           Already have an account? <Link href="/login" className={`${darkMode ? 'text-yellow-500' : 'text-[#C9A84C]'} font-semibold`}>Sign In</Link>
//         </p>

//       </div>
//     </div>
//   )
// }







'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useTheme } from '@/components/ThemeContext'

export default function RegisterPage() {
  const { darkMode } = useTheme()
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const router = useRouter()

  // 🔹 Phone number formatting like 0300-1234567
  function formatPhoneNumber(value) {
    const digits = value.replace(/\D/g, '').substring(0, 11)
    if (digits.length > 4) {
      return `${digits.slice(0, 4)}-${digits.slice(4)}`
    }
    return digits
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    // 🔹 Format phone
    const digits = form.phone.replace(/\D/g, '')
    if (digits.length < 11) {
      setError('Phone number must be 11 digits')
      return
    }

    if (form.password !== form.confirm) {
      setError('Passwords do not match')
      return
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        phone: digits,
        password: form.password
      }),
    })
    const data = await res.json()
    setLoading(false)
    if (!res.ok) { setError(data.error); return }
    setSuccess(true)
    setTimeout(() => router.push('/login'), 2000)
  }

  return (
    <div className={`min-h-screen flex items-center justify-center p-5 mt-16 transition-colors duration-300 ${darkMode ? 'bg-gradient-to-br from-[#0F0705] to-[#2C1810]' : 'bg-gradient-to-br from-[#FDFBF6] to-[#FFF5E5]'}`}>
      <div className={`w-full max-w-md p-8 rounded-md transition-colors duration-300 ${darkMode ? 'bg-[#1B0D06] text-white' : 'bg-[#FDF6EC] text-[#2C1810]'}`}>
        
        <div className="text-center mb-6">
          <Link href="/" className={`font-black text-2xl ${darkMode ? 'text-yellow-500' : 'text-[#C9A84C]'} font-serif no-underline`}>
            ZN<span className={`${darkMode ? 'text-white' : 'text-[#2C1810]'}`}>Bakers</span>
          </Link>
          <p className={`mt-2 text-sm transition-colors duration-300 ${darkMode ? 'text-white/60' : 'text-[#8B5E3C]'}`}>
            Create your account to start ordering.
          </p>
        </div>

        {error && <div className="mb-4 p-3 text-sm font-medium border-l-4 border-red-500 bg-red-100 text-red-700 rounded transition-colors duration-300">{error}</div>}
        {success && <div className="mb-4 p-3 text-sm font-medium border-l-4 border-green-500 bg-green-100 text-green-700 rounded transition-colors duration-300">✓ Account created! Redirecting to login...</div>}

        <form onSubmit={handleSubmit}>

          {/* Form Fields */}
          {[
            ['name', 'Full Name', 'text', 'Ahmed Khan'],
            ['email', 'Email Address', 'email', 'ahmed@example.com'],
            ['phone', 'Phone Number', 'tel', '0300-1234567'],
          ].map(([name, label, type, ph]) => (
            <div key={name} className="mb-4">
              <label className={`block mb-1 text-xs font-semibold uppercase tracking-wider transition-colors duration-300 ${darkMode ? 'text-white/60' : 'text-[#5C3317]'}`}>{label}</label>
              <input
                type={type}
                value={form[name]}
                onChange={e => {
                  if (name === 'phone') {
                    const formatted = formatPhoneNumber(e.target.value)
                    setForm(p => ({ ...p, [name]: formatted }))
                  } else {
                    setForm(p => ({ ...p, [name]: e.target.value }))
                  }
                }}
                placeholder={ph}
                required
                className={`w-full p-3 rounded border transition-colors duration-300 focus:outline-none ${darkMode ? 'bg-[#2C1810] border-yellow-700/30 text-white' : 'bg-white border-yellow-200 text-[#2C1810]'}`}
              />
            </div>
          ))}

          {/* Password Field */}
          {[
            ['password', 'Password', showPassword],
            ['confirm', 'Confirm Password', showConfirm]
          ].map(([name, label, show], i) => (
            <div key={name} className="mb-4 relative">
              <label className={`block mb-1 text-xs font-semibold uppercase tracking-wider transition-colors duration-300 ${darkMode ? 'text-white/60' : 'text-[#5C3317]'}`}>{label}</label>
              <input
                type={show ? 'text' : 'password'}
                value={form[name]}
                onChange={e => setForm(p => ({ ...p, [name]: e.target.value }))}
                placeholder={name === 'password' ? 'Min 6 characters' : 'Repeat password'}
                required
                className={`w-full p-3 rounded border transition-colors duration-300 focus:outline-none ${darkMode ? 'bg-[#2C1810] border-yellow-700/30 text-white' : 'bg-white border-yellow-200 text-[#2C1810]'}`}
              />
              <span
                onClick={() => i === 0 ? setShowPassword(!showPassword) : setShowConfirm(!showConfirm)}
                className="absolute right-3 top-3 pt-6 text-sm cursor-pointer select-none text-[#C9A84C]"
              >
                {show ? 'Hide' : 'Show'}
              </span>
            </div>
          ))}

          <button
            type="submit"
            disabled={loading || success}
            className={`w-full py-3 mt-2 font-bold text-xs tracking-widest uppercase rounded transition-all duration-300 ${darkMode ? 'bg-yellow-500 text-[#2C1810] hover:bg-yellow-400' : 'bg-[#2C1810] text-yellow-500 hover:bg-[#5C3317]'} ${loading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p className={`text-center mt-4 text-sm transition-colors duration-300 ${darkMode ? 'text-white/60' : 'text-[#8B5E3C]'}`}>
          Already have an account? <Link href="/login" className={`${darkMode ? 'text-yellow-500' : 'text-[#C9A84C]'} font-semibold`}>Sign In</Link>
        </p>

      </div>
    </div>
  )
}