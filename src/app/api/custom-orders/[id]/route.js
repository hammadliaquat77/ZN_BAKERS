import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import connectDB from '@/lib/mongodb'
import CustomOrder from '@/models/CustomOrder'

// PATCH — Status + quoted price update
export async function PATCH(request, { params }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'admin')
      return NextResponse.json({ error: 'Admin only' }, { status: 401 })

    await connectDB()
    const body = await request.json()
    const order = await CustomOrder.findByIdAndUpdate(params.id, body, { new: true })
    return NextResponse.json({ order })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

// DELETE
export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'admin')
      return NextResponse.json({ error: 'Admin only' }, { status: 401 })

    await connectDB()
    await CustomOrder.findByIdAndDelete(params.id)
    return NextResponse.json({ message: 'Deleted' })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}