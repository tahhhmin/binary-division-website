// app/api/news/update/route.ts
import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/connectDB'
import News from '@/models/news.model'

export async function PUT(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.json()
    const { id, title, imageLink, description, date, links } = body

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Missing news ID' },
        { status: 400 }
      )
    }

    const updateData: any = {}

    if (title) updateData.title = title
    if (imageLink) updateData.imageLink = imageLink
    if (description) updateData.description = description
    if (links) updateData.links = links
    if (date) updateData.date = new Date(date)

    const updated = await News.findByIdAndUpdate(id, updateData, {
      new: true,
    })

    if (!updated) {
      return NextResponse.json(
        { success: false, error: 'News not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'News updated successfully',
      data: updated,
    })
  } catch (error) {
    console.error('Update error:', error)
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : 'Failed to update news',
      },
      { status: 500 }
    )
  }
}
