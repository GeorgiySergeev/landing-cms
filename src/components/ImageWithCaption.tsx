import { h } from 'preact';
import type { JSX } from 'preact';

interface ImageWithCaptionProps {
  src: string;
  alt?: string;
  caption?: string;
  credit?: string;
  className?: string;
}

export default function ImageWithCaption({
  src,
  alt,
  caption,
  credit,
  className = '',
}: ImageWithCaptionProps): JSX.Element {
  return (
    <figure className={`my-8 ${className}`}>
      <div className="overflow-hidden rounded-lg">
        <img
          src={src}
          alt={alt || caption || 'Blog image'}
          className="h-auto w-full"
        />
      </div>

      {(caption || credit) && (
        <figcaption className="mt-2 text-sm text-gray-600 italic">
          {caption && <span>{caption}</span>}
          {caption && credit && <span> — </span>}
          {credit && <span className="text-gray-500">{credit}</span>}
        </figcaption>
      )}
    </figure>
  );
}
