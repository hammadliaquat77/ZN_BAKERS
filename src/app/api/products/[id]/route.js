// import { NextResponse } from 'next/server'
// import connectDB from '@/lib/mongodb'
// import Product from '@/models/Product'
// import { getServerSession } from 'next-auth'
// import { authOptions } from '../../auth/[...nextauth]/route'

// export async function GET(request, { params }) {
//   try {
//     await connectDB()
//     const product = await Product.findById(params.id)
//     if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 })
//     return NextResponse.json({ product })
//   } catch (err) {
//     return NextResponse.json({ error: err.message }, { status: 500 })
//   }
// }

// export async function PUT(request, { params }) {
//   try {
//     const session = await getServerSession(authOptions)
//     if (!session || session.user.role !== 'admin')
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

//     await connectDB()
//     const data = await request.json()
//     const product = await Product.findByIdAndUpdate(params.id, data, { new: true })
//     return NextResponse.json({ product })
//   } catch (err) {
//     return NextResponse.json({ error: err.message }, { status: 500 })
//   }
// }

// export async function DELETE(request, { params }) {
//   try {
//     const session = await getServerSession(authOptions)
//     if (!session || session.user.role !== 'admin')
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

//     await connectDB()
//     await Product.findByIdAndDelete(params.id)
//     return NextResponse.json({ message: 'Product deleted' })
//   } catch (err) {
//     return NextResponse.json({ error: err.message }, { status: 500 })
//   }
// }












import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Product from '@/models/Product'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'




export async function GET(request, { params }) {
  try {
    await connectDB()
    const product = await Product.findById(params.id)
    if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    return NextResponse.json({ product })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function PUT(request, { params }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'admin')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    await connectDB()
    const data = await request.json()
    const product = await Product.findByIdAndUpdate(params.id, data, { new: true })
    return NextResponse.json({ product })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'admin')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    await connectDB()
    await Product.findByIdAndDelete(params.id)
    return NextResponse.json({ message: 'Product deleted' })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
