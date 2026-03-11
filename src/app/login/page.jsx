// 'use client'
// import { useState } from 'react'
// import { signIn } from 'next-auth/react'
// import { useRouter } from 'next/navigation'
// import Link from 'next/link'

// export default function LoginPage() {
//   const [form, setForm] = useState({ email: '', password: '' })
//   const [error, setError] = useState('')
//   const [loading, setLoading] = useState(false)
//   const router = useRouter()

//   async function handleSubmit(e) {
//     e.preventDefault()
//     setLoading(true)
//     setError('')
//     const res = await signIn('credentials', { ...form, redirect: false })
//     setLoading(false)
//     if (res?.error) { setError('Invalid email or password'); return }
//     router.push('/')
//   }

//   return (
//     <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #2C1810, #5C3317)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5%' }}>
//       <div style={{ background: '#FDF6EC', padding: '3rem', width: '100%', maxWidth: 420 }}>
//         <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
//           <Link href="/" style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', fontWeight: 900, color: '#C9A84C', textDecoration: 'none' }}>ZN<span style={{ color: '#2C1810' }}>Bakers</span></Link>
//           <p style={{ fontSize: '0.85rem', color: '#8B5E3C', marginTop: '0.5rem' }}>Welcome back! Sign in to your account.</p>
//         </div>

//         {error && <div style={{ background: '#FEE2E2', color: '#B91C1C', padding: '12px 16px', marginBottom: '1.5rem', fontSize: '0.85rem', borderLeft: '3px solid #EF4444' }}>{error}</div>}

//         <form onSubmit={handleSubmit}>
//           {[['email', 'Email Address', 'email', 'you@example.com'], ['password', 'Password', 'password', '••••••••']].map(([name, label, type, ph]) => (
//             <div key={name} style={{ marginBottom: '1.2rem' }}>
//               <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#5C3317', marginBottom: '0.5rem' }}>{label}</label>
//               <input type={type} value={form[name]} onChange={e => setForm(p => ({ ...p, [name]: e.target.value }))} placeholder={ph} required style={{ width: '100%', padding: '12px 16px', background: 'white', border: '1px solid rgba(201,168,76,0.3)', color: '#2C1810', fontFamily: 'Jost, sans-serif', fontSize: '0.9rem', outline: 'none' }} />
//             </div>
//           ))}
//           <button type="submit" disabled={loading} style={{ width: '100%', background: '#2C1810', color: '#C9A84C', border: 'none', padding: '16px', fontFamily: 'Jost, sans-serif', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', cursor: 'pointer', marginTop: '0.5rem', opacity: loading ? 0.7 : 1 }}>
//             {loading ? 'Signing In...' : 'Sign In'}
//           </button>
//         </form>

//         <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem', color: '#8B5E3C' }}>
//           Don't have an account? <Link href="/register" style={{ color: '#C9A84C', fontWeight: 600 }}>Sign Up</Link>
//         </p>
//       </div>
//     </div>
//   )
// }



'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useTheme } from '@/components/ThemeContext'

export default function LoginPage() {
  const { darkMode } = useTheme()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await signIn('credentials', { ...form, redirect: false })
    setLoading(false)
    if (res?.error) { setError('Invalid email or password'); return }
    router.push('/')
  }

  return (
    <div className={`min-h-screen flex items-center justify-center p-5 transition-colors duration-300 ${darkMode ? 'bg-gradient-to-br from-[#0F0705] to-[#2C1810]' : 'bg-gradient-to-br from-[#FDFBF6] to-[#FFF5E5]'}`}>
      <div className={`w-full max-w-md p-8 rounded-md transition-colors duration-300 ${darkMode ? 'bg-[#1B0D06] text-white' : 'bg-[#FDF6EC] text-[#2C1810]'}`}>
        
        <div className="text-center mb-6">
          <Link href="/" className={`font-black text-2xl font-serif no-underline transition-colors duration-300 ${darkMode ? 'text-yellow-500' : 'text-[#C9A84C]'}`}>
            ZN<span className={`${darkMode ? 'text-white' : 'text-[#2C1810]'}`}>Bakers</span>
          </Link>
          <p className={`mt-2 text-sm transition-colors duration-300 ${darkMode ? 'text-white/60' : 'text-[#8B5E3C]'}`}>
            Welcome back! Sign in to your account.
          </p>
        </div>

        {error && <div className="mb-4 p-3 text-sm font-medium border-l-4 border-red-500 bg-red-100 text-red-700 rounded transition-colors duration-300">{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="mb-4">
            <label className={`block mb-1 text-xs font-semibold uppercase tracking-wider transition-colors duration-300 ${darkMode ? 'text-white/60' : 'text-[#5C3317]'}`}>
              Email Address
            </label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
              placeholder="you@example.com"
              required
              className={`w-full p-3 rounded border transition-colors duration-300 focus:outline-none ${darkMode ? 'bg-[#2C1810] border-yellow-700/30 text-white' : 'bg-white border-yellow-200 text-[#2C1810]'}`}
            />
          </div>

          {/* Password Field with Show/Hide */}
          <div className="mb-4 relative">
            <label className={`block mb-1 text-xs font-semibold uppercase tracking-wider transition-colors duration-300 ${darkMode ? 'text-white/60' : 'text-[#5C3317]'}`}>
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={form.password}
              onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
              placeholder="••••••••"
              required
              className={`w-full p-3 rounded border transition-colors duration-300 focus:outline-none ${darkMode ? 'bg-[#2C1810] border-yellow-700/30 text-white' : 'bg-white border-yellow-200 text-[#2C1810]'}`}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 pt-6 text-sm cursor-pointer select-none text-[#C9A84C]"
            >
              {showPassword ? 'Hide' : 'Show'}
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 mt-2 font-bold text-xs tracking-widest uppercase rounded transition-all duration-300 ${darkMode ? 'bg-yellow-500 text-[#2C1810] hover:bg-yellow-400' : 'bg-[#2C1810] text-yellow-500 hover:bg-[#5C3317]'} ${loading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <p className={`text-center mt-4 text-sm transition-colors duration-300 ${darkMode ? 'text-white/60' : 'text-[#8B5E3C]'}`}>
          Don't have an account? <Link href="/register" className={`${darkMode ? 'text-yellow-500' : 'text-[#C9A84C]'} font-semibold`}>Sign Up</Link>
        </p>
      </div>
    </div>
  )
}