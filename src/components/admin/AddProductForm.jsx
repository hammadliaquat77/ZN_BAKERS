// 'use client'
// import { useState } from 'react'

// export default function AddProductForm({ onAdd }) {
//   const [form, setForm] = useState({
//     name: '', description: '', price: '', category: 'cake',
//     unit: 'piece', emoji: '🎂', badge: '', featured: false, inStock: true,
//   })
//   const [imageFile, setImageFile] = useState(null)
//   const [imagePreview, setImagePreview] = useState('')
//   const [uploading, setUploading] = useState(false)
//   const [loading, setLoading] = useState(false)

//   function handleChange(e) {
//     const { name, value, type, checked } = e.target
//     setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
//   }

//   function handleImageChange(e) {
//     const file = e.target.files[0]
//     if (!file) return
//     setImageFile(file)
//     setImagePreview(URL.createObjectURL(file))
//   }

//   async function handleSubmit() {
//     if (!form.name || !form.price) {
//       alert('Name aur Price required hai!')
//       return
//     }

//     setLoading(true)
//     let imageUrl = ''
//     let imagePublicId = ''

//     // Image upload karo agar file select ki hai
//     if (imageFile) {
//       setUploading(true)
//       const formData = new FormData()
//       formData.append('file', imageFile)

//       const uploadRes = await fetch('/api/upload', {
//         method: 'POST',
//         body: formData,
//       })
//       const uploadData = await uploadRes.json()

//       if (uploadRes.ok) {
//         imageUrl = uploadData.url
//         imagePublicId = uploadData.public_id
//       } else {
//         alert('Image upload failed: ' + uploadData.error)
//         setLoading(false)
//         setUploading(false)
//         return
//       }
//       setUploading(false)
//     }

//     await onAdd({
//       ...form,
//       price: Number(form.price),
//       image: imageUrl,
//       imagePublicId,
//     })

//     // Reset
//     setForm({
//       name: '', description: '', price: '', category: 'cake',
//       unit: 'piece', emoji: '🎂', badge: '', featured: false, inStock: true,
//     })
//     setImageFile(null)
//     setImagePreview('')
//     setLoading(false)
//   }

//   return (
//     <div className="bg-white dark:bg-[#2C1810] border border-yellow-700/20 p-6 max-w-2xl">
//       <h3
//         className="text-lg font-bold text-[#2C1810] dark:text-[#F5E6C0] mb-5 pb-3 border-b border-yellow-700/20"
//         style={{ fontFamily: 'Playfair Display, serif' }}
//       >
//         ➕ Add New Product
//       </h3>

//       <div className="flex flex-col gap-4">

//         {/* Image Upload */}
//         <div>
//           <label className="block text-xs font-bold tracking-widest uppercase text-[#5C3317] dark:text-yellow-500/80 mb-2">
//             Product Image
//           </label>

//           <div className="flex gap-4 items-start">
//             {/* Preview */}
//             <div className="w-24 h-24 bg-[#FDF6EC] dark:bg-[#1A0F0A] border-2 border-dashed border-yellow-700/30 flex items-center justify-center flex-shrink-0 overflow-hidden">
//               {imagePreview ? (
//                 <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
//               ) : (
//                 <span className="text-4xl">{form.emoji}</span>
//               )}
//             </div>

//             {/* Upload Button */}
//             <div className="flex-1">
//               <label className="flex flex-col items-center justify-center w-full h-24 bg-[#FDF6EC] dark:bg-[#1A0F0A] border-2 border-dashed border-yellow-700/30 cursor-pointer hover:border-yellow-500 transition-colors">
//                 <span className="text-2xl mb-1">📷</span>
//                 <span className="text-xs text-[#8B5E3C] dark:text-yellow-200/60 font-medium">
//                   {imageFile ? imageFile.name : 'Click to upload image'}
//                 </span>
//                 <span className="text-xs text-[#8B5E3C]/60 dark:text-yellow-200/30 mt-0.5">
//                   JPG, PNG, WEBP (max 5MB)
//                 </span>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageChange}
//                   className="hidden"
//                 />
//               </label>
//               {imageFile && (
//                 <button
//                   onClick={() => { setImageFile(null); setImagePreview('') }}
//                   className="mt-1 text-xs text-red-500 cursor-pointer bg-transparent border-none hover:text-red-700"
//                 >
//                   ✕ Remove image
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Emoji + Name */}
//         <div className="flex gap-3">
//           <div>
//             <label className="block text-xs font-bold tracking-widest uppercase text-[#5C3317] dark:text-yellow-500/80 mb-2">Emoji</label>
//             <input
//               name="emoji"
//               value={form.emoji}
//               onChange={handleChange}
//               className="w-16 px-2 py-3 bg-[#FDF6EC] dark:bg-[#1A0F0A] border border-yellow-700/30 text-center text-xl outline-none focus:border-yellow-500"
//             />
//           </div>
//           <div className="flex-1">
//             <label className="block text-xs font-bold tracking-widest uppercase text-[#5C3317] dark:text-yellow-500/80 mb-2">Product Name *</label>
//             <input
//               name="name"
//               value={form.name}
//               onChange={handleChange}
//               placeholder="e.g. Chocolate Fudge Cake"
//               className="w-full px-4 py-3 bg-[#FDF6EC] dark:bg-[#1A0F0A] border border-yellow-700/30 text-[#2C1810] dark:text-[#F5E6C0] text-sm outline-none focus:border-yellow-500"
//             />
//           </div>
//         </div>

//         {/* Description */}
//         <div>
//           <label className="block text-xs font-bold tracking-widest uppercase text-[#5C3317] dark:text-yellow-500/80 mb-2">Description</label>
//           <textarea
//             name="description"
//             value={form.description}
//             onChange={handleChange}
//             placeholder="Describe the product..."
//             rows={3}
//             className="w-full px-4 py-3 bg-[#FDF6EC] dark:bg-[#1A0F0A] border border-yellow-700/30 text-[#2C1810] dark:text-[#F5E6C0] text-sm outline-none focus:border-yellow-500 resize-none"
//           />
//         </div>

//         {/* Price + Unit */}
//         <div className="grid grid-cols-2 gap-3">
//           <div>
//             <label className="block text-xs font-bold tracking-widest uppercase text-[#5C3317] dark:text-yellow-500/80 mb-2">Price (Rs.) *</label>
//             <input
//               name="price"
//               type="number"
//               value={form.price}
//               onChange={handleChange}
//               placeholder="1500"
//               className="w-full px-4 py-3 bg-[#FDF6EC] dark:bg-[#1A0F0A] border border-yellow-700/30 text-[#2C1810] dark:text-[#F5E6C0] text-sm outline-none focus:border-yellow-500"
//             />
//           </div>
//           <div>
//             <label className="block text-xs font-bold tracking-widest uppercase text-[#5C3317] dark:text-yellow-500/80 mb-2">Unit</label>
//             <select
//               name="unit"
//               value={form.unit}
//               onChange={handleChange}
//               className="w-full px-4 py-3 bg-[#FDF6EC] dark:bg-[#1A0F0A] border border-yellow-700/30 text-[#2C1810] dark:text-[#F5E6C0] text-sm outline-none focus:border-yellow-500"
//             >
//               {['piece', 'kg', 'loaf', 'whole'].map(u => (
//                 <option key={u} value={u}>{u}</option>
//               ))}
//             </select>
//           </div>
//         </div>

//         {/* Category + Badge */}
//         <div className="grid grid-cols-2 gap-3">
//           <div>
//             <label className="block text-xs font-bold tracking-widest uppercase text-[#5C3317] dark:text-yellow-500/80 mb-2">Category</label>
//             <select
//               name="category"
//               value={form.category}
//               onChange={handleChange}
//               className="w-full px-4 py-3 bg-[#FDF6EC] dark:bg-[#1A0F0A] border border-yellow-700/30 text-[#2C1810] dark:text-[#F5E6C0] text-sm outline-none focus:border-yellow-500"
//             >
//               {['cake', 'bread', 'dessert', 'pastry'].map(c => (
//                 <option key={c} value={c}>{c}</option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block text-xs font-bold tracking-widest uppercase text-[#5C3317] dark:text-yellow-500/80 mb-2">Badge</label>
//             <input
//               name="badge"
//               value={form.badge}
//               onChange={handleChange}
//               placeholder="Bestseller, New, Hot"
//               className="w-full px-4 py-3 bg-[#FDF6EC] dark:bg-[#1A0F0A] border border-yellow-700/30 text-[#2C1810] dark:text-[#F5E6C0] text-sm outline-none focus:border-yellow-500"
//             />
//           </div>
//         </div>

//         {/* Toggles */}
//         <div className="flex gap-3">
//           <button
//             type="button"
//             onClick={() => setForm(prev => ({ ...prev, inStock: !prev.inStock }))}
//             className={`flex-1 py-2.5 text-xs font-bold border-none cursor-pointer transition-all duration-300
//               ${form.inStock ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300' : 'bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-300'}`}
//           >
//             {form.inStock ? '🟢 In Stock' : '🔴 Out of Stock'}
//           </button>
//           <button
//             type="button"
//             onClick={() => setForm(prev => ({ ...prev, featured: !prev.featured }))}
//             className={`flex-1 py-2.5 text-xs font-bold border-none cursor-pointer transition-all duration-300
//               ${form.featured ? 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-400' : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'}`}
//           >
//             {form.featured ? '⭐ Featured' : '☆ Not Featured'}
//           </button>
//         </div>

//         {/* Submit */}
//         <button
//           onClick={handleSubmit}
//           disabled={loading}
//           className={`w-full py-4 text-sm font-bold tracking-widest uppercase border-none transition-all duration-300
//             ${loading ? 'bg-yellow-500/50 text-[#2C1810] cursor-not-allowed' : 'bg-[#C9A84C] text-[#2C1810] cursor-pointer hover:bg-yellow-400'}`}
//         >
//           {uploading ? '📤 Uploading Image...' : loading ? '⏳ Adding...' : '➕ Add Product'}
//         </button>

//       </div>
//     </div>
//   )
// }












'use client'
import { useState } from 'react'

export default function AddProductForm({ onAdd }) {
  const [form, setForm] = useState({
    name: '', description: '', price: '', category: 'cake',
    unit: 'piece', emoji: '🎂', badge: '', featured: false, inStock: true,
  })
  const [imageFiles, setImageFiles] = useState([])
  const [imagePreviews, setImagePreviews] = useState([])
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  function handleImageChange(e) {
    const files = Array.from(e.target.files)
    if (!files.length) return

    // Max 5 images
    const selected = files.slice(0, 5)
    setImageFiles(selected)
    setImagePreviews(selected.map(f => URL.createObjectURL(f)))
  }

  function removeImage(index) {
    setImageFiles(prev => prev.filter((_, i) => i !== index))
    setImagePreviews(prev => prev.filter((_, i) => i !== index))
  }


  async function handleSubmit() {
  if (!form.name || !form.price) {
    alert('Name aur Price required hai!')
    return
  }

  setLoading(true)
  let imageUrl = ''
  let imagePublicId = ''
  let extraImages = []

  if (imageFiles.length > 0) {
    setUploading(true)

    const formData = new FormData()
    imageFiles.forEach(file => formData.append('files', file))

    const uploadRes = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })
    const uploadData = await uploadRes.json()

    if (!uploadRes.ok || !uploadData.images?.length) {
      alert('Upload failed: ' + (uploadData.error || 'Unknown error'))
      setLoading(false)
      setUploading(false)
      return
    }

    // Pehli image main image
    imageUrl = uploadData.images[0].url
    imagePublicId = uploadData.images[0].publicId

    // Baaki sab extra images
    extraImages = uploadData.images.slice(1).map(img => ({
      url: img.url,
      publicId: img.publicId,
    }))

    setUploading(false)
  }

  await onAdd({
    ...form,
    price: Number(form.price),
    image: imageUrl,
    imagePublicId,
    images: extraImages,
  })

  // Reset
  setForm({
    name: '', description: '', price: '', category: 'cake',
    unit: 'piece', emoji: '🎂', badge: '', featured: false, inStock: true,
  })
  setImageFiles([])
  setImagePreviews([])
  setLoading(false)
}

  return (
    <div className="bg-white dark:bg-[#2C1810] border border-yellow-700/20 p-6 max-w-2xl">
      <h3
        className="text-lg font-bold text-[#2C1810] dark:text-[#F5E6C0] mb-5 pb-3 border-b border-yellow-700/20"
        style={{ fontFamily: 'Playfair Display, serif' }}
      >
        ➕ Add New Product
      </h3>

      <div className="flex flex-col gap-4">

        {/* ── Image Upload ── */}
        <div>
          <label className="block text-xs font-bold tracking-widest uppercase text-[#5C3317] dark:text-yellow-500/80 mb-2">
            Product Images <span className="text-yellow-600/60 normal-case font-normal">(max 5)</span>
          </label>

          {/* Upload Area */}
          <label className="flex flex-col items-center justify-center w-full h-24 bg-[#FDF6EC] dark:bg-[#1A0F0A] border-2 border-dashed border-yellow-700/30 cursor-pointer hover:border-yellow-500 transition-colors mb-3">
            <span className="text-2xl mb-1">📷</span>
            <span className="text-xs text-[#8B5E3C] dark:text-yellow-200/60 font-medium">
              Click to select images
            </span>
            <span className="text-xs text-[#8B5E3C]/60 dark:text-yellow-200/30 mt-0.5">
              JPG, PNG, WEBP — First image will be main image
            </span>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="hidden"
            />
          </label>

          {/* Previews Grid */}
          {imagePreviews.length > 0 && (
            <div className="grid grid-cols-5 gap-2">
              {imagePreviews.map((src, i) => (
                <div key={i} className="relative group aspect-square">
                  <img
                    src={src}
                    alt={`preview ${i + 1}`}
                    className="w-full h-full object-cover border-2 border-yellow-700/20"
                  />

                  {/* Main Badge */}
                  {i === 0 && (
                    <div className="absolute top-0 left-0 bg-[#C9A84C] text-[#2C1810] text-[0.5rem] font-bold px-1.5 py-0.5 leading-none">
                      MAIN
                    </div>
                  )}

                  {/* Remove Button */}
                  <button
                    onClick={() => removeImage(i)}
                    className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center cursor-pointer border-none opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ✕
                  </button>
                </div>
              ))}

              {/* Add More — agar 5 se kam hain */}
              {imagePreviews.length < 5 && (
                <label className="aspect-square border-2 border-dashed border-yellow-700/30 flex items-center justify-center cursor-pointer hover:border-yellow-500 transition-colors">
                  <span className="text-2xl text-[#8B5E3C] dark:text-yellow-200/40">+</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={e => {
                      const newFiles = Array.from(e.target.files)
                      const combined = [...imageFiles, ...newFiles].slice(0, 5)
                      setImageFiles(combined)
                      setImagePreviews(combined.map(f =>
                        f instanceof File ? URL.createObjectURL(f) : f
                      ))
                    }}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          )}

          {/* No image selected */}
          {imagePreviews.length === 0 && (
            <div className="flex items-center gap-2 text-xs text-[#8B5E3C] dark:text-yellow-200/40">
              <span className="text-3xl">{form.emoji}</span>
              <span>No image selected — emoji will be used as placeholder</span>
            </div>
          )}
        </div>

        {/* Emoji + Name */}
        <div className="flex gap-3">
          <div>
            <label className="block text-xs font-bold tracking-widest uppercase text-[#5C3317] dark:text-yellow-500/80 mb-2">Emoji</label>
            <input
              name="emoji"
              value={form.emoji}
              onChange={handleChange}
              className="w-16 px-2 py-3 bg-[#FDF6EC] dark:bg-[#1A0F0A] border border-yellow-700/30 text-center text-xl outline-none focus:border-yellow-500"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs font-bold tracking-widest uppercase text-[#5C3317] dark:text-yellow-500/80 mb-2">Product Name *</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Chocolate Fudge Cake"
              className="w-full px-4 py-3 bg-[#FDF6EC] dark:bg-[#1A0F0A] border border-yellow-700/30 text-[#2C1810] dark:text-[#F5E6C0] text-sm outline-none focus:border-yellow-500"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-bold tracking-widest uppercase text-[#5C3317] dark:text-yellow-500/80 mb-2">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Describe the product..."
            rows={3}
            className="w-full px-4 py-3 bg-[#FDF6EC] dark:bg-[#1A0F0A] border border-yellow-700/30 text-[#2C1810] dark:text-[#F5E6C0] text-sm outline-none focus:border-yellow-500 resize-none"
          />
        </div>

        {/* Price + Unit */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold tracking-widest uppercase text-[#5C3317] dark:text-yellow-500/80 mb-2">Price (Rs.) *</label>
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              placeholder="1500"
              className="w-full px-4 py-3 bg-[#FDF6EC] dark:bg-[#1A0F0A] border border-yellow-700/30 text-[#2C1810] dark:text-[#F5E6C0] text-sm outline-none focus:border-yellow-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold tracking-widest uppercase text-[#5C3317] dark:text-yellow-500/80 mb-2">Unit</label>
            <select
              name="unit"
              value={form.unit}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#FDF6EC] dark:bg-[#1A0F0A] border border-yellow-700/30 text-[#2C1810] dark:text-[#F5E6C0] text-sm outline-none focus:border-yellow-500"
            >
              {['piece', 'kg', 'loaf', 'whole'].map(u => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Category + Badge */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold tracking-widest uppercase text-[#5C3317] dark:text-yellow-500/80 mb-2">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#FDF6EC] dark:bg-[#1A0F0A] border border-yellow-700/30 text-[#2C1810] dark:text-[#F5E6C0] text-sm outline-none focus:border-yellow-500"
            >
              {[ 'cake', 'bread', 'dessert', 'pastry', 'juice', 'cookies & biscuits', 'savory snacks', 'fast food', 'beverages', 'cupcakes', 'brownies' ].map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold tracking-widest uppercase text-[#5C3317] dark:text-yellow-500/80 mb-2">Badge</label>
            <input
              name="badge"
              value={form.badge}
              onChange={handleChange}
              placeholder="Bestseller, New, Hot"
              className="w-full px-4 py-3 bg-[#FDF6EC] dark:bg-[#1A0F0A] border border-yellow-700/30 text-[#2C1810] dark:text-[#F5E6C0] text-sm outline-none focus:border-yellow-500"
            />
          </div>
        </div>

        {/* Toggles */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setForm(prev => ({ ...prev, inStock: !prev.inStock }))}
            className={`flex-1 py-2.5 text-xs font-bold border-none cursor-pointer transition-all duration-300
              ${form.inStock
                ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300'
                : 'bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-300'
              }`}
          >
            {form.inStock ? '🟢 In Stock' : '🔴 Out of Stock'}
          </button>
          <button
            type="button"
            onClick={() => setForm(prev => ({ ...prev, featured: !prev.featured }))}
            className={`flex-1 py-2.5 text-xs font-bold border-none cursor-pointer transition-all duration-300
              ${form.featured
                ? 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-400'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
              }`}
          >
            {form.featured ? '⭐ Featured' : '☆ Not Featured'}
          </button>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full py-4 text-sm font-bold tracking-widest uppercase border-none transition-all duration-300
            ${loading
              ? 'bg-yellow-500/50 text-[#2C1810] cursor-not-allowed'
              : 'bg-[#C9A84C] text-[#2C1810] cursor-pointer hover:bg-yellow-400'
            }`}
        >
          {uploading ? '📤 Uploading Images...' : loading ? '⏳ Adding Product...' : '➕ Add Product'}
        </button>

      </div>
    </div>
  )
}