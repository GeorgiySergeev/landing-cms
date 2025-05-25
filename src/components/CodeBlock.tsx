import { h } from 'preact';
import type { JSX } from 'preact';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
}

export default function CodeBlock({
  code,
  language = 'javascript',
  filename,
  className = '',
}: CodeBlockProps): JSX.Element {
  return (
    <div className={`my-8 overflow-hidden rounded-lg ${className}`}>
      {/* Optional filename header */}
      {filename && (
        <div className="flex items-center justify-between bg-gray-800 px-4 py-2 text-sm text-gray-200">
          <span>{filename}</span>
          <span className="text-xs tracking-wide text-gray-400 uppercase">
            {language}
          </span>
        </div>
      )}

      {/* Code section */}
      <pre className="overflow-x-auto bg-gray-900 p-4 text-sm text-gray-100">
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
}
