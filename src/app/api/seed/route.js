
// import { NextResponse } from 'next/server'
// import connectDB from '@/lib/mongodb'
// import User from '@/models/User'

// export async function GET() {
//   try {
//     await connectDB()

//     // Sirf admin create karo agar exist nahi karta
//     const adminExists = await User.findOne({
//       email: process.env.ADMIN_EMAIL || 'admin@znbakers.pk'
//     })

//     if (!adminExists) {
//       await User.create({
//         name: 'ZN Admin',
//         email: process.env.ADMIN_EMAIL || 'admin@znbakers.pk',
//         password: process.env.ADMIN_PASSWORD || 'Admin@123456',
//         role: 'admin',
//       })
//     }

//     return NextResponse.json({
//       message: '✅ Admin account ready!',
//       adminEmail: process.env.ADMIN_EMAIL || 'admin@znbakers.pk',
//       note: adminExists ? 'Admin already existed' : 'Admin created successfully',
//     })
//   } catch (err) {
//     return NextResponse.json({ error: err.message }, { status: 500 })
//   }
// }









// import { NextResponse } from 'next/server'
// import connectDB from '@/lib/mongodb'
// import User from '@/models/User'

// export async function GET() {
//   try {
//     await connectDB()

//     const adminEmail = process.env.ADMIN_EMAIL || 'admin@znbakers.pk'
//     const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123456'

//     // Pehle delete karo — phir fresh create karo
//     await User.deleteOne({ email: adminEmail })

//     const admin = await User.create({
//       name: 'ZN Admin',
//       email: adminEmail,
//       password: adminPassword,
//       role: 'admin',
//     })

//     return NextResponse.json({
//       message: '✅ Admin created successfully!',
//       adminEmail: admin.email,
//       adminId: admin._id,
//     })
//   } catch (err) {
//     return NextResponse.json({ error: err.message }, { status: 500 })
//   }
// }







import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'
import mongoose from 'mongoose'

export async function GET() {
  try {
    await connectDB()

    const dbName = mongoose.connection.db?.databaseName || 'unknown'
    console.log('Connected to DB:', dbName)

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@znbakers.pk'
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123456'

    await User.deleteOne({ email: adminEmail })

    const admin = await User.create({
      name: 'ZN Admin',
      email: adminEmail,
      password: adminPassword,
      role: 'admin',
    })

    return NextResponse.json({
      message: '✅ Admin created successfully!',
      adminEmail: admin.email,
      adminId: admin._id,
      database: dbName,
    })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}