import { h } from 'preact';
import type { JSX } from 'preact';

interface Article {
  title: string;
  url: string;
  thumbnail?: string;
  category?: string;
  excerpt?: string;
  date?: string;
  readTime?: number;
}

interface RelatedArticlesProps {
  articles?: Article[];
  title?: string;
  className?: string;
}

export default function RelatedArticles({
  articles = [],
  title = 'Related Articles',
  className = '',
}: RelatedArticlesProps): JSX.Element {
  return (
    <div className={`my-12 ${className}`}>
      <h2 className="font-cairo mb-6 text-2xl font-bold text-gray-900">
        {title}
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article, index) => (
          <article
            key={index}
            className="overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-md"
          >
            {/* Article thumbnail */}
            {article.thumbnail && (
              <a href={article.url} className="block">
                <img
                  src={article.thumbnail}
                  alt={article.title}
                  className="h-48 w-full object-cover"
                />
              </a>
            )}

            <div className="p-4">
              {/* Category if present */}
              {article.category && (
                <div className="mb-2">
                  <span className="text-xs font-medium tracking-wider text-gray-600 uppercase">
                    {article.category}
                  </span>
                </div>
              )}

              {/* Title */}
              <h3 className="mb-2 line-clamp-2 text-lg font-bold">
                <a
                  href={article.url}
                  className="text-gray-900 hover:text-gray-700"
                >
                  {article.title}
                </a>
              </h3>

              {/* Excerpt */}
              {article.excerpt && (
                <p className="mb-3 line-clamp-3 text-sm text-gray-600">
                  {article.excerpt}
                </p>
              )}

              {/* Metadata */}
              <div className="flex items-center text-xs text-gray-500">
                {article.date && <span>{article.date}</span>}
                {article.date && article.readTime && (
                  <span className="mx-2">•</span>
                )}
                {article.readTime && <span>{article.readTime} min read</span>}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
