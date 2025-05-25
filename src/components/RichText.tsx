import { h } from 'preact';
import type { JSX } from 'preact';

interface RichTextProps {
  children: JSX.Element | JSX.Element[] | string;
  className?: string;
}

export default function RichText({
  children,
  className = '',
}: RichTextProps): JSX.Element {
  return (
    <div className={`prose prose-lg max-w-none ${className}`}>{children}</div>
  );
}

// Add this to your tailwind.config.cjs in the plugins array:
// require('@tailwindcss/typography'),
