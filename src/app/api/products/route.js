import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Product from '@/models/Product'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'

// GET all products (public)
export async function GET(request) {
  try {
    await connectDB()
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const filter = category && category !== 'all' ? { category } : {}
    const products = await Product.find(filter).sort({ createdAt: -1 })
    return NextResponse.json({ products })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

// POST new product (admin only)
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'admin')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    await connectDB()
    const data = await request.json()
    const product = await Product.create(data)
    return NextResponse.json({ product }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
