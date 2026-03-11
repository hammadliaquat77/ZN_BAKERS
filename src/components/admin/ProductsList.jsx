
// import { useState } from 'react'

// export default function ProductsList({ products, onDelete, onEdit }) {
//   const [editingId, setEditingId] = useState(null)
//   const [editForm, setEditForm] = useState({})

//   function startEdit(product) {
//     setEditingId(product._id)
//     setEditForm({
//       name: product.name,
//       description: product.description,
//       price: product.price,
//       category: product.category,
//       emoji: product.emoji,
//       badge: product.badge || '',
//       unit: product.unit,
//       inStock: product.inStock,
//       featured: product.featured,
//     })
//   }

//   function cancelEdit() {
//     setEditingId(null)
//     setEditForm({})
//   }

//   function handleEditChange(e) {
//     const { name, value, type, checked } = e.target
//     setEditForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
//   }

//   function handleSave(id) {
//     onEdit(id, { ...editForm, price: Number(editForm.price) })
//     setEditingId(null)
//     setEditForm({})
//   }

//   return (
//     <div>
//       {products.length === 0 ? (
//         <div className="text-center py-12 text-[#8B5E3C] dark:text-yellow-300 bg-white dark:bg-[#2C1810] border border-yellow-700/20">
//           🎂 No products found.
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//           {products.map(p => (
//             <div
//               key={p._id}
//               className="bg-white dark:bg-[#2C1810] border border-yellow-700/20 overflow-hidden hover:shadow-md dark:hover:shadow-lg transition-all duration-300"
//             >
//               {editingId !== p._id ? (
//                 /* ── Normal View ── */
//                 <div className="p-4 flex gap-3 items-start">
//                   {/* Emoji + Stock Badge */}
//                   <div className="relative flex-shrink-0">
//                     <div className="text-4xl">{p.emoji}</div>
//                     <span className={`absolute -bottom-1 -right-1 text-[0.55rem] font-bold px-1.5 py-0.5 leading-none
//                       ${p.inStock
//                         ? 'bg-green-500 text-white'
//                         : 'bg-red-500 text-white'
//                       }`}
//                     >
//                       {p.inStock ? '✓' : '✕'}
//                     </span>
//                   </div>

//                   <div className="flex-1 min-w-0">
//                     <div
//                       className="font-semibold text-[#2C1810] dark:text-yellow-200 mb-1 truncate"
//                       style={{ fontFamily: 'Playfair Display, serif' }}
//                     >
//                       {p.name}
//                     </div>

//                     <div className="text-xs text-[#8B5E3C] dark:text-yellow-400 mb-1 capitalize">
//                       {p.category}
//                     </div>

//                     <div
//                       className="text-sm font-bold text-[#5C3317] dark:text-yellow-300 mb-2"
//                       style={{ fontFamily: 'Playfair Display, serif' }}
//                     >
//                       Rs. {p.price?.toLocaleString()}
//                       <span className="text-xs font-normal ml-1">/ {p.unit}</span>
//                     </div>

//                     <div className="flex flex-wrap gap-1.5 mb-3">
//                       {/* Stock Status Badge */}
//                       <span className={`text-xs font-bold px-2 py-0.5
//                         ${p.inStock
//                           ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
//                           : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300'
//                         }`}
//                       >
//                         {p.inStock ? '🟢 Available' : '🔴 Unavailable'}
//                       </span>

//                       {/* Product Badge */}
//                       {p.badge && (
//                         <span className="inline-block bg-yellow-100 dark:bg-yellow-700/30 text-yellow-700 dark:text-yellow-300 text-xs font-semibold px-2 py-0.5">
//                           {p.badge}
//                         </span>
//                       )}
//                     </div>

//                     <div className="flex gap-2">
//                       <button
//                         onClick={() => startEdit(p)}
//                         className="flex-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border-none px-3 py-1.5 text-xs font-semibold cursor-pointer hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
//                       >
//                         ✏️ Edit
//                       </button>
//                       <button
//                         onClick={() => onDelete(p._id)}
//                         className="flex-1 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 border-none px-3 py-1.5 text-xs font-semibold cursor-pointer hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
//                       >
//                         🗑 Delete
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 /* ── Edit Form ── */
//                 <div className="p-4">
//                   <div className="text-xs font-bold tracking-widest uppercase text-yellow-600 dark:text-yellow-400 mb-3 pb-2 border-b border-yellow-700/20">
//                     ✏️ Editing Product
//                   </div>

//                   <div className="flex flex-col gap-2.5">

//                     {/* Emoji + Name */}
//                     <div className="flex gap-2">
//                       <input
//                         name="emoji"
//                         value={editForm.emoji}
//                         onChange={handleEditChange}
//                         className="w-14 px-2 py-2 bg-[#FDF6EC] dark:bg-[#1A0F0A] border border-yellow-700/30 text-center text-lg outline-none focus:border-yellow-500"
//                       />
//                       <input
//                         name="name"
//                         value={editForm.name}
//                         onChange={handleEditChange}
//                         placeholder="Product Name"
//                         className="flex-1 px-3 py-2 bg-[#FDF6EC] dark:bg-[#1A0F0A] border border-yellow-700/30 text-[#2C1810] dark:text-[#F5E6C0] text-sm outline-none focus:border-yellow-500"
//                       />
//                     </div>

//                     {/* Description */}
//                     <textarea
//                       name="description"
//                       value={editForm.description}
//                       onChange={handleEditChange}
//                       placeholder="Description"
//                       rows={2}
//                       className="w-full px-3 py-2 bg-[#FDF6EC] dark:bg-[#1A0F0A] border border-yellow-700/30 text-[#2C1810] dark:text-[#F5E6C0] text-sm outline-none focus:border-yellow-500 resize-none"
//                     />

//                     {/* Price + Unit */}
//                     <div className="flex gap-2">
//                       <input
//                         name="price"
//                         type="number"
//                         value={editForm.price}
//                         onChange={handleEditChange}
//                         placeholder="Price"
//                         className="flex-1 px-3 py-2 bg-[#FDF6EC] dark:bg-[#1A0F0A] border border-yellow-700/30 text-[#2C1810] dark:text-[#F5E6C0] text-sm outline-none focus:border-yellow-500"
//                       />
//                       <select
//                         name="unit"
//                         value={editForm.unit}
//                         onChange={handleEditChange}
//                         className="flex-1 px-2 py-2 bg-[#FDF6EC] dark:bg-[#1A0F0A] border border-yellow-700/30 text-[#2C1810] dark:text-[#F5E6C0] text-sm outline-none focus:border-yellow-500"
//                       >
//                         {['piece', 'kg', 'loaf', 'whole'].map(u => (
//                           <option key={u} value={u}>{u}</option>
//                         ))}
//                       </select>
//                     </div>

//                     {/* Category */}
//                     <select
//                       name="category"
//                       value={editForm.category}
//                       onChange={handleEditChange}
//                       className="w-full px-3 py-2 bg-[#FDF6EC] dark:bg-[#1A0F0A] border border-yellow-700/30 text-[#2C1810] dark:text-[#F5E6C0] text-sm outline-none focus:border-yellow-500 capitalize"
//                     >
//                       {['cake', 'bread', 'dessert', 'pastry'].map(c => (
//                         <option key={c} value={c}>{c}</option>
//                       ))}
//                     </select>

//                     {/* Badge */}
//                     <input
//                       name="badge"
//                       value={editForm.badge}
//                       onChange={handleEditChange}
//                       placeholder="Badge (e.g. Bestseller, New)"
//                       className="w-full px-3 py-2 bg-[#FDF6EC] dark:bg-[#1A0F0A] border border-yellow-700/30 text-[#2C1810] dark:text-[#F5E6C0] text-sm outline-none focus:border-yellow-500"
//                     />

//                     {/* inStock + Featured — Toggle Style */}
//                     <div className="flex gap-3">
//                       {/* inStock Toggle */}
//                       <button
//                         type="button"
//                         onClick={() => setEditForm(prev => ({ ...prev, inStock: !prev.inStock }))}
//                         className={`flex-1 py-2 text-xs font-bold border-none cursor-pointer transition-all duration-300
//                           ${editForm.inStock
//                             ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300'
//                             : 'bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-300'
//                           }`}
//                       >
//                         {editForm.inStock ? '🟢 Available' : '🔴 Unavailable'}
//                       </button>

//                       {/* Featured Toggle */}
//                       <button
//                         type="button"
//                         onClick={() => setEditForm(prev => ({ ...prev, featured: !prev.featured }))}
//                         className={`flex-1 py-2 text-xs font-bold border-none cursor-pointer transition-all duration-300
//                           ${editForm.featured
//                             ? 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-400'
//                             : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
//                           }`}
//                       >
//                         {editForm.featured ? '⭐ Featured' : '☆ Not Featured'}
//                       </button>
//                     </div>

//                     {/* Save + Cancel */}
//                     <div className="flex gap-2 mt-1">
//                       <button
//                         onClick={() => handleSave(p._id)}
//                         className="flex-1 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 border-none py-2 text-xs font-bold cursor-pointer hover:bg-green-200 dark:hover:bg-green-800 transition-colors tracking-wide uppercase"
//                       >
//                         ✓ Save
//                       </button>
//                       <button
//                         onClick={cancelEdit}
//                         className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-none py-2 text-xs font-bold cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors tracking-wide uppercase"
//                       >
//                         ✕ Cancel
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }




import { useState } from 'react'

const CATEGORY_COLORS = {
  cake: 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300',
  bread: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300',
  dessert: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
  pastry: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
}

const GRADIENTS = {
  cake: 'from-[#F5E6C0] to-[#E8C97A]',
  bread: 'from-[#EDD9A3] to-[#C9954C]',
  dessert: 'from-[#F9E4D4] to-[#E8A87C]',
  pastry: 'from-[#F0E6D3] to-[#D4A57A]',
}

export default function ProductsList({ products, onDelete, onEdit }) {
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({})
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [uploading, setUploading] = useState(false)

  function startEdit(product) {
    setEditingId(product._id)
    setEditForm({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      emoji: product.emoji,
      badge: product.badge || '',
      unit: product.unit,
      inStock: product.inStock,
      featured: product.featured,
    })
    setImageFile(null)
    setImagePreview(product.image || '')
  }

  function cancelEdit() {
    setEditingId(null)
    setEditForm({})
    setImageFile(null)
    setImagePreview('')
  }

  function handleEditChange(e) {
    const { name, value, type, checked } = e.target
    setEditForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  function handleImageChange(e) {
    const file = e.target.files[0]
    if (!file) return
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  async function handleSave(id) {
    let imageUrl = imagePreview || ''
    let imagePublicId = editForm.imagePublicId || ''

    if (imageFile) {
      setUploading(true)
      const formData = new FormData()
      formData.append('files', imageFile)
      const uploadRes = await fetch('/api/upload', { method: 'POST', body: formData })
      const uploadData = await uploadRes.json()
      if (uploadRes.ok && uploadData.images?.length > 0) {
        imageUrl = uploadData.images[0].url
        imagePublicId = uploadData.images[0].publicId
      } else {
        alert('Image upload failed!')
        setUploading(false)
        return
      }
      setUploading(false)
    }

    onEdit(id, { ...editForm, price: Number(editForm.price), image: imageUrl, imagePublicId })
    cancelEdit()
  }

  if (products.length === 0) return (
    <div className="text-center py-16 bg-white dark:bg-[#2C1810] border border-yellow-700/20">
      <div className="text-5xl mb-3">🎂</div>
      <p className="text-[#8B5E3C] dark:text-yellow-300 font-medium">No products found.</p>
    </div>
  )

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {products.map(p => (
        <div key={p._id} className="bg-white dark:bg-[#2C1810] border border-yellow-700/20 overflow-hidden transition-all duration-300 hover:shadow-lg">

          {editingId !== p._id ? (

            /* ── NORMAL VIEW ── */
            <>
              {/* Image Area */}
              <div className={`relative h-44 bg-gradient-to-br ${GRADIENTS[p.category] || GRADIENTS.cake} overflow-hidden`}>
                {p.image ? (
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-6xl">
                    {p.emoji}
                  </div>
                )}

                {/* Dark overlay on hover */}
                <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-all duration-300" />

                {/* Top Left — Stock */}
                <div className={`absolute top-3 left-3 flex items-center gap-1 text-xs font-bold px-2.5 py-1 backdrop-blur-sm
                  ${p.inStock ? 'bg-green-500/90 text-white' : 'bg-red-500/90 text-white'}`}>
                  {p.inStock ? '● Live' : '● Off'}
                </div>

                {/* Top Right — Badge */}
                {p.badge && (
                  <div className="absolute top-3 right-3 bg-[#2C1810]/80 text-[#C9A84C] text-[0.6rem] font-bold uppercase tracking-wide px-2 py-1 backdrop-blur-sm">
                    {p.badge}
                  </div>
                )}

                {/* Bottom — Photo count */}
                {(() => {
                  const total = (p.image ? 1 : 0) + (p.images?.length || 0)
                  return total > 1 ? (
                    <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-0.5 font-semibold backdrop-blur-sm flex items-center gap-1">
                      📷 {total}
                    </div>
                  ) : null
                })()}

                {/* Featured star */}
                {p.featured && (
                  <div className="absolute bottom-3 left-3 bg-yellow-500/90 text-[#2C1810] text-xs font-bold px-2 py-0.5">
                    ⭐ Featured
                  </div>
                )}
              </div>

              {/* Info Area */}
              <div className="p-4">
                {/* Category chip */}
                <span className={`inline-block text-[0.65rem] font-bold uppercase tracking-widest px-2 py-0.5 mb-2 ${CATEGORY_COLORS[p.category]}`}>
                  {p.category}
                </span>

                {/* Name */}
                <h3
                  className="font-bold text-[#2C1810] dark:text-[#F5E6C0] text-base leading-tight mb-1 line-clamp-1"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  {p.name}
                </h3>

                {/* Description */}
                <p className="text-xs text-[#8B5E3C] dark:text-yellow-200/50 leading-relaxed mb-3 line-clamp-2">
                  {p.description}
                </p>

                {/* Price + Unit */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span
                      className="text-lg font-black text-[#C9A84C]"
                      style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                      Rs. {p.price?.toLocaleString()}
                    </span>
                    <span className="text-xs text-[#8B5E3C] dark:text-yellow-200/40 ml-1">
                      / {p.unit}
                    </span>
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1
                    ${p.inStock
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                      : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300'
                    }`}
                  >
                    {p.inStock ? '🟢 Available' : '🔴 Unavailable'}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => startEdit(p)}
                    className="flex items-center justify-center gap-1.5 bg-[#2C1810] dark:bg-[#1A0F0A] text-[#C9A84C] border-none py-2.5 text-xs font-bold cursor-pointer hover:bg-[#1A0F0A] transition-colors tracking-wide"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => onDelete(p._id)}
                    className="flex items-center justify-center gap-1.5 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-300 border-none py-2.5 text-xs font-bold cursor-pointer hover:bg-red-600 hover:text-white transition-colors tracking-wide"
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>
            </>

          ) : (

            /* ── EDIT FORM ── */
            <div className="p-4">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-yellow-700/20">
                <span className="text-xs font-black tracking-widest uppercase text-yellow-600 dark:text-yellow-400">
                  ✏️ Edit Product
                </span>
                <button onClick={cancelEdit} className="text-xs text-[#8B5E3C] dark:text-yellow-200/40 hover:text-red-500 cursor-pointer bg-transparent border-none">
                  ✕ Cancel
                </button>
              </div>

              <div className="flex flex-col gap-3">

                {/* Image Preview */}
                <div className="relative h-32 bg-gradient-to-br from-[#F5E6C0] to-[#E8C97A] overflow-hidden">
                  {imagePreview ? (
                    <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl">{editForm.emoji}</div>
                  )}
                  <label className="absolute inset-0 flex items-end justify-center pb-2 cursor-pointer bg-black/0 hover:bg-black/30 transition-all duration-300 group">
                    <span className="text-white text-xs font-bold bg-black/50 px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      📷 Change Image
                    </span>
                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  </label>
                </div>

                {/* Emoji + Name */}
                <div className="flex gap-2">
                  <input
                    name="emoji"
                    value={editForm.emoji}
                    onChange={handleEditChange}
                    className="w-12 px-1 py-2.5 bg-[#FDF6EC] dark:bg-[#1A0F0A] border border-yellow-700/30 text-center text-lg outline-none focus:border-yellow-500"
                  />
                  <input
                    name="name"
                    value={editForm.name}
                    onChange={handleEditChange}
                    placeholder="Product Name"
                    className="flex-1 px-3 py-2.5 bg-[#FDF6EC] dark:bg-[#1A0F0A] border border-yellow-700/30 text-[#2C1810] dark:text-[#F5E6C0] text-sm outline-none focus:border-yellow-500"
                  />
                </div>

                {/* Description */}
                <textarea
                  name="description"
                  value={editForm.description}
                  onChange={handleEditChange}
                  placeholder="Description"
                  rows={2}
                  className="w-full px-3 py-2.5 bg-[#FDF6EC] dark:bg-[#1A0F0A] border border-yellow-700/30 text-[#2C1810] dark:text-[#F5E6C0] text-sm outline-none focus:border-yellow-500 resize-none"
                />

                {/* Price + Unit */}
                <div className="grid grid-cols-2 gap-2">
                  <input
                    name="price"
                    type="number"
                    value={editForm.price}
                    onChange={handleEditChange}
                    placeholder="Price"
                    className="px-3 py-2.5 bg-[#FDF6EC] dark:bg-[#1A0F0A] border border-yellow-700/30 text-[#2C1810] dark:text-[#F5E6C0] text-sm outline-none focus:border-yellow-500"
                  />
                  <select
                    name="unit"
                    value={editForm.unit}
                    onChange={handleEditChange}
                    className="px-2 py-2.5 bg-[#FDF6EC] dark:bg-[#1A0F0A] border border-yellow-700/30 text-[#2C1810] dark:text-[#F5E6C0] text-sm outline-none focus:border-yellow-500"
                  >
                    {['piece', 'kg', 'loaf', 'whole'].map(u => (
                      <option key={u} value={u}>{u}</option>
                    ))}
                  </select>
                </div>

                {/* Category */}
                <select
                  name="category"
                  value={editForm.category}
                  onChange={handleEditChange}
                  className="w-full px-3 py-2.5 bg-[#FDF6EC] dark:bg-[#1A0F0A] border border-yellow-700/30 text-[#2C1810] dark:text-[#F5E6C0] text-sm outline-none focus:border-yellow-500 capitalize"
                >
                  {['cake', 'bread', 'dessert', 'pastry'].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>

                {/* Badge */}
                <input
                  name="badge"
                  value={editForm.badge}
                  onChange={handleEditChange}
                  placeholder="Badge (Bestseller, New...)"
                  className="w-full px-3 py-2.5 bg-[#FDF6EC] dark:bg-[#1A0F0A] border border-yellow-700/30 text-[#2C1810] dark:text-[#F5E6C0] text-sm outline-none focus:border-yellow-500"
                />

                {/* Toggles */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setEditForm(prev => ({ ...prev, inStock: !prev.inStock }))}
                    className={`py-2.5 text-xs font-bold border-none cursor-pointer transition-all duration-300
                      ${editForm.inStock
                        ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300'
                        : 'bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-300'
                      }`}
                  >
                    {editForm.inStock ? '🟢 Available' : '🔴 Off'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditForm(prev => ({ ...prev, featured: !prev.featured }))}
                    className={`py-2.5 text-xs font-bold border-none cursor-pointer transition-all duration-300
                      ${editForm.featured
                        ? 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-400'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                      }`}
                  >
                    {editForm.featured ? '⭐ Featured' : '☆ Normal'}
                  </button>
                </div>

                {/* Save Button */}
                <button
                  onClick={() => handleSave(p._id)}
                  disabled={uploading}
                  className={`w-full py-3 text-sm font-bold border-none transition-colors tracking-widest uppercase
                    ${uploading
                      ? 'bg-yellow-300 text-[#2C1810] cursor-not-allowed'
                      : 'bg-[#C9A84C] text-[#2C1810] cursor-pointer hover:bg-yellow-400'
                    }`}
                >
                  {uploading ? '📤 Uploading...' : '✓ Save Changes'}
                </button>

              </div>
            </div>

          )}
        </div>
      ))}
    </div>
  )
}