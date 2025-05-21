import { h } from 'preact';
import type { JSX } from 'preact';
import { useState } from 'preact/hooks';

interface ArticleHeaderProps {
  title: string;
  subtitle?: string;
  category?: string;
  publishDate: string | Date;
  readTime?: number;
  coverImage?: string;
  authorName?: string;
  authorAvatar?: string;
}

export default function ArticleHeader({ 
  title,
  subtitle,
  category,
  publishDate,
  readTime,
  coverImage,
  authorName,
  authorAvatar
}: ArticleHeaderProps): JSX.Element {
  const formattedDate = new Date(publishDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  return (
    <div className="w-full mb-12">
      {/* Category badge */}
      {category && (
        <div className="mb-4">
          <span className="inline-block px-3 py-1 text-sm font-medium bg-gray-100 text-gray-800 rounded-full">
            {category}
          </span>
        </div>
      )}
      
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-cairo">
        {title}
      </h1>
      
      {/* Subtitle if present */}
      {subtitle && (
        <p className="text-xl text-gray-600 mb-6">
          {subtitle}
        </p>
      )}
      
      {/* Author and metadata row */}
      <div className="flex items-center space-x-4 mb-8">
        {authorAvatar && (
          <img 
            src={authorAvatar} 
            alt={authorName || "Author"} 
            className="w-12 h-12 rounded-full object-cover"
          />
        )}
        <div>
          {authorName && <p className="font-medium text-gray-900">{authorName}</p>}
          <div className="flex items-center text-sm text-gray-500 space-x-2">
            <span>{formattedDate}</span>
            {readTime && (
              <>
                <span>•</span>
                <span>{readTime} min read</span>
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Cover image */}
      {coverImage && (
        <div className="rounded-lg overflow-hidden mb-8">
          <img 
            src={coverImage} 
            alt={title} 
            className="w-full h-auto object-cover"
          />
        </div>
      )}
    </div>
  );
} 