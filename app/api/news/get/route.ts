// Force dynamic rendering to avoid static generation errors
export const dynamic = "force-dynamic";
export const revalidate = 60;

import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/connectDB';
import News from '@/models/news.model';

// Type definitions
interface NewsDocument {
  _id: any;
  date?: Date | string;
  createdAt?: Date | string;
  title?: string;
  description?: string;
  imageLink?: string;
  thumbnail?: string;
  links?: string[];
}

interface FormattedNewsItem {
  id: string;
  date: string;
  title: string;
  description: string;
  thumbnail?: string;
  link?: string;
  links: string[];
}

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export async function GET(request: NextRequest) {
  try {
    // Connect to database
    await connectDB();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // Single news item fetch
    if (id) {
      try {
        const newsItem = await News.findById(id).lean() as NewsDocument | null;
        
        if (!newsItem) {
          return NextResponse.json(
            { 
              success: false, 
              error: 'News item not found',
              data: null 
            }, 
            { status: 404 }
          );
        }

        const formattedItem: FormattedNewsItem = {
          id: newsItem._id.toString(),
          date: formatDate(newsItem.date || newsItem.createdAt),
          title: newsItem.title || 'Untitled',
          description: newsItem.description || '',
          thumbnail: newsItem.imageLink || newsItem.thumbnail || undefined,
          links: Array.isArray(newsItem.links) ? newsItem.links : [],
        };

        return NextResponse.json({
          success: true,
          data: formattedItem,
        });
      } catch (error) {
        console.error('Error fetching single news item:', error);
        return NextResponse.json(
          { 
            success: false, 
            error: 'Invalid news ID format',
            data: null 
          }, 
          { status: 400 }
        );
      }
    }

    // Paginated list fetch
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '10', 10)));
    const sortBy = searchParams.get('sortBy') || 'date';
    const order = searchParams.get('order') || 'desc';

    const skip = (page - 1) * limit;
    const sortOrder = order === 'asc' ? 1 : -1;
    
    // Build sort object with fallback
    const sortObject: Record<string, 1 | -1> = {};
    if (sortBy === 'date') {
      sortObject.date = sortOrder;
      sortObject.createdAt = sortOrder; // Fallback sort
    } else if (sortBy === 'title') {
      sortObject.title = sortOrder;
    } else {
      sortObject.createdAt = sortOrder; // Default sort
    }

    // Fetch news items and total count in parallel
    const [newsItems, totalCount] = await Promise.all([
      News.find({})
        .sort(sortObject)
        .limit(limit)
        .skip(skip)
        .lean() as Promise<NewsDocument[]>,
      News.countDocuments(),
    ]);

    // Format news items with proper fallbacks
    const formattedNews: FormattedNewsItem[] = newsItems.map((item) => ({
      id: item._id.toString(),
      date: formatDate(item.date || item.createdAt),
      title: item.title || 'Untitled',
      description: item.description || '',
      thumbnail: item.imageLink || item.thumbnail || undefined,
      link: Array.isArray(item.links) && item.links.length > 0 ? item.links[0] : undefined,
      links: Array.isArray(item.links) ? item.links : [],
    }));

    const totalPages = Math.ceil(totalCount / limit);

    const pagination: PaginationInfo = {
      currentPage: page,
      totalPages,
      totalItems: totalCount,
      itemsPerPage: limit,
      hasNext: page < totalPages,
      hasPrevious: page > 1,
    };

    return NextResponse.json({
      success: true,
      data: formattedNews,
      pagination,
    });

  } catch (error) {
    console.error('Error fetching news:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch news',
        message: errorMessage,
        data: [],
        pagination: {
          currentPage: 1,
          totalPages: 0,
          totalItems: 0,
          itemsPerPage: 10,
          hasNext: false,
          hasPrevious: false,
        },
      },
      { status: 500 }
    );
  }
}

// Helper function to format date
function formatDate(date: Date | string | undefined): string {
  if (!date) {
    return formatCurrentDate();
  }

  try {
    const d = new Date(date);
    
    if (isNaN(d.getTime())) {
      return formatCurrentDate();
    }

    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
                    'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

    const month = months[d.getMonth()];
    const day = d.getDate();
    const year = d.getFullYear();

    return `${month} ${day}, ${year}`;
  } catch (error) {
    console.error('Error formatting date:', error);
    return formatCurrentDate();
  }
}

// Helper function to get current formatted date
function formatCurrentDate(): string {
  return new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).toUpperCase();
}
