
// import { NextResponse } from 'next/server'
// import connectDB from '@/lib/mongodb'
// import User from '@/models/User'
// import mongoose from 'mongoose'

// export async function GET() {
//   try {
//     await connectDB()

//     const dbName = mongoose.connection.db?.databaseName || 'unknown'
//     console.log('Connected to DB:', dbName)

//     const adminEmail = process.env.ADMIN_EMAIL
//     const adminPassword = process.env.ADMIN_PASSWORD

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
//       database: dbName,
//     })
//   } catch (err) {
//     return NextResponse.json({ error: err.message }, { status: 500 })
//   }
// }









import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'
import mongoose from 'mongoose'

export async function GET(request) {

  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not allowed' }, { status: 403 })
  }

  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  
  if (secret !== process.env.SEED_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    await connectDB()

    const adminEmail = process.env.ADMIN_EMAIL
    const adminPassword = process.env.ADMIN_PASSWORD

    if (!adminEmail || !adminPassword) {
      return NextResponse.json(
        { error: 'Credentials not set in env' },
        { status: 500 }
      )
    }

    const dbName = mongoose.connection.db?.databaseName || 'unknown'
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