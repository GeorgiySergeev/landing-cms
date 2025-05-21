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
  language = "javascript", 
  filename,
  className = ""
}: CodeBlockProps): JSX.Element {
  return (
    <div className={`my-8 rounded-lg overflow-hidden ${className}`}>
      {/* Optional filename header */}
      {filename && (
        <div className="bg-gray-800 px-4 py-2 text-sm text-gray-200 flex items-center justify-between">
          <span>{filename}</span>
          <span className="text-xs uppercase tracking-wide text-gray-400">{language}</span>
        </div>
      )}
      
      {/* Code section */}
      <pre className="bg-gray-900 p-4 text-sm text-gray-100 overflow-x-auto">
        <code className={`language-${language}`}>
          {code}
        </code>
      </pre>
    </div>
  );
} 