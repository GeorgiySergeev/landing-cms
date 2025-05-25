import { h } from 'preact';
import type { JSX } from 'preact';

interface TestimonialProps {
  quote: string;
  author: string;
  role?: string;
  avatarUrl?: string | null;
  theme?: 'light' | 'dark' | 'primary';
}

export default function Testimonial({
  quote,
  author,
  role = '',
  avatarUrl = null,
  theme = 'light',
}: TestimonialProps): JSX.Element {
  const themeClasses: Record<string, string> = {
    light: 'bg-white text-gray-800 border border-gray-200',
    dark: 'bg-gray-800 text-white',
    primary: 'bg-blue-100 text-blue-900 border border-blue-200',
  };

  return (
    <div
      class={`rounded-lg p-6 shadow-sm ${themeClasses[theme] || themeClasses.light}`}
    >
      <div class="mb-4 flex items-start">
        <div class="mr-2 text-2xl">"</div>
        <p class="text-lg">{quote}</p>
        <div class="ml-2 text-2xl">"</div>
      </div>

      <div class="mt-4 flex items-center">
        {avatarUrl && (
          <div class="mr-4">
            <img
              src={avatarUrl}
              alt={`${author} avatar`}
              class="h-12 w-12 rounded-full object-cover"
            />
          </div>
        )}
        <div>
          <div class="font-bold">{author}</div>
          {role && <div class="text-sm opacity-75">{role}</div>}
        </div>
      </div>
    </div>
  );
}
