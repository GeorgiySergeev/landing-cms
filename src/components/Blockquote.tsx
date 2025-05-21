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
  className = ""
}: BlockquoteProps): JSX.Element {
  return (
    <blockquote className={`border-l-4 border-gray-800 pl-6 py-6 my-8 ${className}`}>
      <p className="text-xl md:text-2xl font-medium text-gray-800 italic mb-4">
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