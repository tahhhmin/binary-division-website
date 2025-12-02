// app/api/news/create/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/connectDB';
import News, { INews } from '@/models/news.model';

export async function POST(request: NextRequest) {
  try {
    // Connect to database
    await connectDB();
    
    // Parse request body
    const body: INews = await request.json();
    
    // Validate required fields
    if (!body.title || !body.imageLink || !body.description) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields: title, imageLink, and description are required' 
        },
        { status: 400 }
      );
    }
    
    // Create new news document
    const news = await News.create({
      date: body.date ? new Date(body.date) : new Date(),
      title: body.title,
      imageLink: body.imageLink,
      description: body.description,
      links: body.links || [],
    });
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'News created successfully',
        data: news 
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Error creating news:', error);
    
    // Handle mongoose validation errors
    if (error instanceof Error && error.name === 'ValidationError') {
      return NextResponse.json(
        { 
          success: false, 
          error: error.message 
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to create news' 
      },
      { status: 500 }
    );
  }
}

// GET method to fetch all news
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit');
    const page = searchParams.get('page') || '1';
    const pageSize = limit ? parseInt(limit) : 10;
    const skip = (parseInt(page) - 1) * pageSize;
    
    const [news, total] = await Promise.all([
      News.find({})
        .sort({ date: -1, createdAt: -1 })
        .limit(pageSize)
        .skip(skip)
        .lean(),
      News.countDocuments({})
    ]);
    
    return NextResponse.json({
      success: true,
      data: news,
      pagination: {
        total,
        page: parseInt(page),
        pageSize,
        totalPages: Math.ceil(total / pageSize)
      }
    });
    
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch news' 
      },
      { status: 500 }
    );
  }
}