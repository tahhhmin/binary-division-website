// app/api/news/delete/route.ts
import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/connectDB'
import News from '@/models/news.model'

export async function DELETE(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Missing news ID' },
        { status: 400 }
      )
    }

    const deleted = await News.findByIdAndDelete(id)

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'News not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'News deleted successfully',
    })
  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : 'Failed to delete news',
      },
      { status: 500 }
    )
  }
}
