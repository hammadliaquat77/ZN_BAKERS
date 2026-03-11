'use client'

import { useState } from 'react'
import Link from 'next/link'

const INFO = [
  { icon: '📍', title: 'Our Bakery', lines: ['123 Baker Street, Block 5', 'Gulshan-e-Iqbal, Karachi'] },
  { icon: '📞', title: 'Call Us', lines: ['0300-1234567', '0321-7654321'] },
  { icon: '📧', title: 'Email Us', lines: ['hello@znbakers.pk', 'orders@znbakers.pk'] },
  { icon: '🕐', title: 'Opening Hours', lines: ['Mon–Sat: 8AM – 10PM', 'Sunday: 9AM – 8PM'] },
]

export default function ContactPage() {

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState({ msg: '', type: '' })

  function handleChange(e) {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  async function handleSubmit() {

    if (!form.name || !form.email || !form.message) {
      setToast({ msg: '⚠ Please fill all required fields.', type: 'error' })
      setTimeout(() => setToast({ msg: '', type: '' }), 3000)
      return
    }

    setLoading(true)

    await new Promise(r => setTimeout(r, 1500))

    setLoading(false)

    setForm({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    })

    setToast({ msg: "🎉 Message sent! We'll reply within 24 hours.", type: 'success' })
    setTimeout(() => setToast({ msg: '', type: '' }), 4000)

  }

  return (

    <div className="pt-[72px] min-h-screen bg-[#FDF6EC] dark:bg-[#1A0F0A] transition-colors duration-300">

      {/* HEADER */}

      <section className="bg-gradient-to-br from-[#2C1810] to-[#5C3317] py-16 px-6 text-center">

        <span className="block text-[#C9A84C] text-xs font-bold tracking-[4px] uppercase mb-3">
          Get in Touch
        </span>

        <h1 className="text-4xl font-black text-white">
          We'd Love to <span className="text-[#C9A84C]">Hear from You</span>
        </h1>

        <p className="text-white/60 mt-4 max-w-lg mx-auto">
          Custom cake orders, feedback, or just want to say hello — we're here for you.
        </p>

      </section>


      {/* MAIN */}

      <div className="max-w-6xl mx-auto px-4 py-16">

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8">

          {/* CONTACT FORM */}

          <div className="bg-white dark:bg-[#2C1810] border border-yellow-700/20 p-8">

            <h2 className="text-2xl font-bold mb-6 text-[#2C1810] dark:text-[#F5E6C0]">
              Send us a Message
            </h2>

            <div className="flex flex-col gap-4">

              {/* Name Email */}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full px-4 py-3 border"
                />

                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full px-4 py-3 border"
                />

              </div>


              {/* Phone Subject */}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  className="w-full px-4 py-3 border"
                />

                <select
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border"
                >

                  <option value="">Select Subject</option>
                  <option value="cake">Custom Cake</option>
                  <option value="delivery">Delivery</option>
                  <option value="feedback">Feedback</option>

                </select>

              </div>


              {/* Message */}

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                placeholder="Message"
                className="w-full px-4 py-3 border"
              />

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-[#C9A84C] py-4 font-bold"
              >

                {loading ? "Sending..." : "Send Message"}

              </button>

            </div>

          </div>


          {/* RIGHT SIDE */}

          <div className="flex flex-col gap-5">

            {INFO.map(item => (

              <div
                key={item.title}
                className="bg-white dark:bg-[#2C1810] border border-yellow-700/20 p-5 flex gap-4"
              >

                <div className="text-2xl">{item.icon}</div>

                <div>

                  <div className="text-xs font-bold text-[#C9A84C] mb-2">
                    {item.title}
                  </div>

                  {item.lines.map((line, i) => (
                    <div key={i} className="text-sm">
                      {line}
                    </div>
                  ))}

                </div>

              </div>

            ))}


            {/* SOCIAL LINKS */}

            <div className="bg-[#2C1810] p-5">

              <div className="text-xs font-bold text-[#C9A84C] mb-4">
                Follow Us
              </div>

              <div className="flex gap-3">

                {[
                  { icon: '📘', label: 'Facebook', href: '#' },
                  { icon: '📸', label: 'Instagram', href: '#' },
                  { icon: '💬', label: 'WhatsApp', href: '#' },
                  { icon: '🎵', label: 'TikTok', href: '#' },
                ].map((s) => (

                  <Link
                    key={s.label}
                    href={s.href}
                    className="flex-1 bg-white/10 text-white py-2 text-center flex flex-col items-center gap-1 hover:bg-[#C9A84C] hover:text-black transition"
                  >

                    <span className="text-lg">{s.icon}</span>
                    <span>{s.label}</span>

                  </Link>

                ))}

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* TOAST */}

      {toast.msg && (

        <div className="fixed bottom-6 right-6 bg-black text-white px-5 py-3 shadow-lg">

          {toast.msg}

        </div>

      )}

    </div>

  )

}