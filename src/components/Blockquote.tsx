import { h } from 'preact';
import type { JSX } from 'preact';

interface BlockquoteProps {
  quote: string;
  author?: string;
  position?: string;
  className?: string;
}

export default function Blockquote({
  quote,
  author,
  position,
  className = '',
}: BlockquoteProps): JSX.Element {
  return (
    <blockquote
      className={`my-8 border-l-4 border-gray-800 py-6 pl-6 ${className}`}
    >
      <p className="mb-4 text-xl font-medium text-gray-800 italic md:text-2xl">
        "{quote}"
      </p>
      {(author || position) && (
        <footer className="text-sm text-gray-600">
          {author && <span className="font-bold">{author}</span>}
          {author && position && <span>, </span>}
          {position && <span>{position}</span>}
        </footer>
      )}
    </blockquote>
  );
}
