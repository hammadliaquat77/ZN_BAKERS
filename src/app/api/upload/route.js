
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
// import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { authOptions } from '@/lib/authOptions'
import cloudinary from '@/lib/cloudinary'

async function uploadToCloudinary(buffer) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder: 'zn-bakers/products',
        transformation: [
          { width: 800, height: 800, crop: 'fill', gravity: 'center' },
          { quality: 'auto', fetch_format: 'auto' }
        ]
      },
      (error, result) => {
        if (error) reject(error)
        else resolve(result)
      }
    ).end(buffer)
  })
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'admin')
      return NextResponse.json({ error: 'Admin only' }, { status: 401 })

    const formData = await request.formData()
    const files = formData.getAll('files')

    if (!files || files.length === 0)
      return NextResponse.json({ error: 'No files provided' }, { status: 400 })

    // Sab files upload karo parallel
    const results = await Promise.all(
      files.map(async (file) => {
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const result = await uploadToCloudinary(buffer)
        return {
          url: result.secure_url,
          publicId: result.public_id,  // ← consistent key name
        }
      })
    )

    return NextResponse.json({ images: results })

  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}







