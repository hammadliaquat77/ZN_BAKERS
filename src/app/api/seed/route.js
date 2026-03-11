// import { NextResponse } from 'next/server'
// import connectDB from '@/lib/mongodb'
// import Product from '@/models/Product'
// import User from '@/models/User'

// const sampleProducts = [
//   { name: 'Chocolate Truffle Cake', description: 'Rich dark chocolate ganache with velvety truffle layers.', price: 1800, category: 'cake', emoji: '🎂', badge: 'Bestseller', unit: 'kg', featured: true },
//   { name: 'Strawberry Cream Cake', description: 'Light vanilla sponge layered with fresh strawberries and whipped cream.', price: 1600, category: 'cake', emoji: '🍓', badge: 'New', unit: 'kg', featured: true },
//   { name: 'Red Velvet Cake', description: 'Classic red velvet with creamy cheese frosting.', price: 2000, category: 'cake', emoji: '🎂', badge: '', unit: 'kg', featured: false },
//   { name: 'Sourdough Loaf', description: 'Classic slow-fermented sourdough with crispy crust and airy crumb.', price: 450, category: 'bread', emoji: '🍞', badge: '', unit: 'loaf', featured: true },
//   { name: 'Garlic Herb Bread', description: 'Soft bread infused with garlic and aromatic herbs.', price: 350, category: 'bread', emoji: '🥖', badge: '', unit: 'loaf', featured: false },
//   { name: 'Caramel Flan', description: 'Silky smooth custard with golden caramel sauce.', price: 650, category: 'dessert', emoji: '🍮', badge: '', unit: 'piece', featured: true },
//   { name: 'Matcha Cheesecake', description: 'Creamy Japanese-style cheesecake with premium matcha swirl.', price: 1200, category: 'dessert', emoji: '🍰', badge: 'New', unit: 'whole', featured: false },
//   { name: 'Butter Croissant', description: 'Flaky, golden layers of buttery pastry. Baked fresh every morning.', price: 220, category: 'pastry', emoji: '🥐', badge: '', unit: 'piece', featured: true },
//   { name: 'Cinnamon Roll', description: 'Soft, fluffy rolls swirled with cinnamon and topped with cream cheese glaze.', price: 280, category: 'pastry', emoji: '🌀', badge: 'Popular', unit: 'piece', featured: false },
// ]

// export async function GET() {
//   try {
//     await connectDB()

//     // Clear and seed products
//     await Product.deleteMany({})
//     await Product.insertMany(sampleProducts)

//     // Create admin user if not exists
//     const adminExists = await User.findOne({ email: process.env.ADMIN_EMAIL || 'admin@znbakers.pk' })
//     if (!adminExists) {
//       await User.create({
//         name: 'ZN Admin',
//         email: process.env.ADMIN_EMAIL || 'admin@znbakers.pk',
//         password: process.env.ADMIN_PASSWORD || 'Admin@123456',
//         role: 'admin',
//       })
//     }

//     return NextResponse.json({
//       message: '✅ Database seeded successfully!',
//       productsAdded: sampleProducts.length,
//       adminEmail: process.env.ADMIN_EMAIL || 'admin@znbakers.pk',
//     })
//   } catch (err) {
//     return NextResponse.json({ error: err.message }, { status: 500 })
//   }
// }










import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'

export async function GET() {
  try {
    await connectDB()

    // Sirf admin create karo agar exist nahi karta
    const adminExists = await User.findOne({
      email: process.env.ADMIN_EMAIL || 'admin@znbakers.pk'
    })

    if (!adminExists) {
      await User.create({
        name: 'ZN Admin',
        email: process.env.ADMIN_EMAIL || 'admin@znbakers.pk',
        password: process.env.ADMIN_PASSWORD || 'Admin@123456',
        role: 'admin',
      })
    }

    return NextResponse.json({
      message: '✅ Admin account ready!',
      adminEmail: process.env.ADMIN_EMAIL || 'admin@znbakers.pk',
      note: adminExists ? 'Admin already existed' : 'Admin created successfully',
    })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}