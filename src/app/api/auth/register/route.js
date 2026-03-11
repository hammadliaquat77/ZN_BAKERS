// import { NextResponse } from 'next/server'
// import connectDB from '@/lib/mongodb'
// import User from '@/models/User'

// export async function POST(request) {
//   try {
//     await connectDB()
//     const { name, email, password, phone } = await request.json()

//     if (!name || !email || !password)
//       return NextResponse.json({ error: 'Name, email and password are required' }, { status: 400 })

//     const existing = await User.findOne({ email })
//     if (existing)
//       return NextResponse.json({ error: 'Email already registered' }, { status: 400 })

//     // Admin account already exists check
//     const adminExists = await User.findOne({ role: 'admin' })
//     if (adminExists)
//       return NextResponse.json({ error: 'Admin account already exists. Please contact administrator.' }, { status: 400 })


//     const user = await User.create({ name, email, password, phone })

//     return NextResponse.json({
//       message: 'Account created successfully',
//       user: { id: user._id, name: user.name, email: user.email },
//     }, { status: 201 })
//   } catch (err) {
//     return NextResponse.json({ error: err.message }, { status: 500 })
//   }
// }






import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'

export async function POST(request) {
  try {
    await connectDB()
    const { name, email, password, phone } = await request.json()

    if (!name || !email || !password)
      return NextResponse.json({ error: 'Name, email and password are required' }, { status: 400 })

    const existing = await User.findOne({ email })
    if (existing)
      return NextResponse.json({ error: 'Email already registered' }, { status: 400 })

    // role hamesha 'user' — koi bhi admin nahi ban sakta register se
    const user = await User.create({ name, email, password, phone, role: 'user' })

    return NextResponse.json({
      message: 'Account created successfully',
      user: { id: user._id, name: user.name, email: user.email },
    }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}