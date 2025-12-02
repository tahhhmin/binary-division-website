// models/news.model.ts
import mongoose, { Document, Model, Schema } from 'mongoose';

// TypeScript interface for News document
export interface INews {
  date: Date;
  title: string;
  imageLink: string;
  description: string;
  links: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

// Interface for News document with Mongoose Document properties
export interface INewsDocument extends INews, Document {}

// Interface for News Model with any static methods
export interface INewsModel extends Model<INewsDocument> {
  // Add any static methods here if needed
  // Example: findByTitle(title: string): Promise<INewsDocument[]>;
}

// Create the News schema
const newsSchema = new Schema<INewsDocument>(
  {
    date: {
      type: Date,
      required: [true, 'Date is required'],
      default: Date.now,
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxLength: [200, 'Title cannot be more than 200 characters'],
    },
    imageLink: {
      type: String,
      required: [true, 'Image link is required'],
      trim: true,
      validate: {
        validator: function(v: string) {
          // Basic URL validation
          return /^(https?:\/\/)/.test(v);
        },
        message: 'Please provide a valid image URL',
      },
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxLength: [2000, 'Description cannot be more than 2000 characters'],
    },
    links: {
      type: [String],
      default: [],
      validate: {
        validator: function(links: string[]) {
          // Validate each link in the array
          return links.every(link => /^(https?:\/\/)/.test(link));
        },
        message: 'All links must be valid URLs',
      },
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Add indexes for better query performance
newsSchema.index({ date: -1 }); // Sort by date descending
newsSchema.index({ title: 'text' }); // Enable text search on title
newsSchema.index({ createdAt: -1 }); // Sort by creation date

// Add any instance methods
newsSchema.methods.getSummary = function(): string {
  return `${this.title} - ${this.description.substring(0, 100)}...`;
};

// Add any static methods
newsSchema.statics.findRecent = function(limit: number = 10) {
  return this.find({})
    .sort({ date: -1 })
    .limit(limit)
    .exec();
};

newsSchema.statics.findByDateRange = function(startDate: Date, endDate: Date) {
  return this.find({
    date: {
      $gte: startDate,
      $lte: endDate,
    },
  })
    .sort({ date: -1 })
    .exec();
};

// Create and export the model
const News: INewsModel = mongoose.models.News || mongoose.model<INewsDocument, INewsModel>('News', newsSchema);

export default News;