import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Order from '@/models/Order'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'

export async function GET(request, { params }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    await connectDB()
    const order = await Order.findById(params.id).populate('items.product')
    if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 })

    // Only admin or the order owner can view
    if (session.user.role !== 'admin' && order.user?.toString() !== session.user.id)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    return NextResponse.json({ order })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function PATCH(request, { params }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'admin')
      return NextResponse.json({ error: 'Admin only' }, { status: 401 })

    await connectDB()
    const { status, paymentStatus } = await request.json()
    const update = {}
    if (status) update.status = status
    if (paymentStatus) update.paymentStatus = paymentStatus

    const order = await Order.findByIdAndUpdate(params.id, update, { new: true })
    return NextResponse.json({ order, message: 'Order updated' })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}




export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'admin')
      return NextResponse.json({ error: 'Admin only' }, { status: 401 })

    await connectDB()
    await Order.findByIdAndDelete(params.id)
    return NextResponse.json({ message: 'Order deleted' })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
