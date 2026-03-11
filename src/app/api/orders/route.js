import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Order from '@/models/Order'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'

// GET orders (admin = all, user = their own)
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Login required' }, { status: 401 })

    await connectDB()

    let orders
    if (session.user.role === 'admin') {
      orders = await Order.find({}).populate('items.product').sort({ createdAt: -1 })
    } else {
      orders = await Order.find({ user: session.user.id }).populate('items.product').sort({ createdAt: -1 })
    }

    return NextResponse.json({ orders })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

// POST new order
export async function POST(request) {
  try {

    const session = await getServerSession(authOptions)
    if (!session)
      return NextResponse.json({ error: 'Login required' }, { status: 401 })

    await connectDB()
    const data = await request.json();

    // ✅ YEH ADD KARO
    const isOnline =
      data.paymentMethod === 'jazzcash' ||
      data.paymentMethod === 'easypaisa';

    if (!data.items || data.items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
    }

    if (!data.customerPhone) {
      return NextResponse.json({ error: 'Phone number required' }, { status: 400 })
    }

    if (isOnline && !data.paymentScreenshot) {
      return NextResponse.json(
        { error: 'Payment screenshot required' },
        { status: 400 }
      )
    }

    const order = await Order.create({
      ...data,
      user: session?.user?.id || null,
      paymentScreenshot: data.paymentScreenshot || '',
      paymentStatus: isOnline && data.paymentScreenshot
        ? 'submitted'   // screenshot upload kiya — submitted
        : 'pending',    // COD ya screenshot nahi
    })



    return NextResponse.json({ order, message: 'Order placed successfully!' }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
