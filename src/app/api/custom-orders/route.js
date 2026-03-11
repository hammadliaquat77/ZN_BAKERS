// import { NextResponse } from 'next/server'
// import { getServerSession } from 'next-auth'
// import { authOptions } from '@/app/api/auth/[...nextauth]/route'
// import connectDB from '@/lib/mongodb'
// import CustomOrder from '@/models/CustomOrder'

// // GET — Admin sab orders dekhe
// export async function GET() {
//   try {
//     const session = await getServerSession(authOptions)
//     if (!session || session.user.role !== 'admin')
//       return NextResponse.json({ error: 'Admin only' }, { status: 401 })

//     await connectDB()
//     const orders = await CustomOrder.find().sort({ createdAt: -1 })
//     return NextResponse.json({ orders })
//   } catch (err) {
//     return NextResponse.json({ error: err.message }, { status: 500 })
//   }
// }

// // POST — Customer custom order submit kare
// export async function POST(req) {
//   try {
//     await connectDB()
//     const body = await req.json()
//     const order = await CustomOrder.create(body)
//     return NextResponse.json({ order }, { status: 201 })
//   } catch (err) {
//     return NextResponse.json({ error: err.message }, { status: 500 })
//   }
// }








import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import connectDB from '@/lib/mongodb'
import CustomOrder from '@/models/CustomOrder'

// GET — Admin sab orders dekhe
export async function GET() {
  try {
   const session = await getServerSession(authOptions)
    if (!session)
      return NextResponse.json({ error: 'Login required' }, { status: 401 });

    await connectDB()
    
    const query = session.user.role === 'admin'
  ? {}
  : {
      $or: [
        { userId: session.user.id },
        { userId: session.user.email },
        { customerEmail: session.user.email },
        { customerName: session.user.name },
      ]
    }

    const orders = await CustomOrder.find(query).sort({ createdAt: -1 })
    return NextResponse.json({ orders })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

// POST — Customer custom order submit kare
export async function POST(req) {
  try {
    await connectDB()
    const body = await req.json()
    const order = await CustomOrder.create(body)
    return NextResponse.json({ order }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}