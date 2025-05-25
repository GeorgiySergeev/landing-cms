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
  authorAvatar,
}: ArticleHeaderProps): JSX.Element {
  const formattedDate = new Date(publishDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="mb-12 w-full">
      {/* Category badge */}
      {category && (
        <div className="mb-4">
          <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800">
            {category}
          </span>
        </div>
      )}

      {/* Title */}
      <h1 className="font-cairo mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
        {title}
      </h1>

      {/* Subtitle if present */}
      {subtitle && <p className="mb-6 text-xl text-gray-600">{subtitle}</p>}

      {/* Author and metadata row */}
      <div className="mb-8 flex items-center space-x-4">
        {authorAvatar && (
          <img
            src={authorAvatar}
            alt={authorName || 'Author'}
            className="h-12 w-12 rounded-full object-cover"
          />
        )}
        <div>
          {authorName && (
            <p className="font-medium text-gray-900">{authorName}</p>
          )}
          <div className="flex items-center space-x-2 text-sm text-gray-500">
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
        <div className="mb-8 overflow-hidden rounded-lg">
          <img
            src={coverImage}
            alt={title}
            className="h-auto w-full object-cover"
          />
        </div>
      )}
    </div>
  );
}
