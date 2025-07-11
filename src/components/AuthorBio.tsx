import { h } from 'preact';
import type { JSX } from 'preact';

interface SocialLink {
  platform: string;
  url: string;
}

interface AuthorBioProps {
  name: string;
  avatar?: string;
  bio?: string;
  socialLinks?: SocialLink[];
  className?: string;
}

export default function AuthorBio({
  name,
  avatar,
  bio,
  socialLinks = [],
  className = '',
}: AuthorBioProps): JSX.Element {
  return (
    <div
      className={`my-12 border-t border-b border-gray-200 py-8 ${className}`}
    >
      <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
        {/* Avatar */}
        {avatar && (
          <img
            src={avatar}
            alt={name}
            className="h-20 w-20 rounded-full object-cover"
          />
        )}

        {/* Bio content */}
        <div className="flex-1 text-center md:text-left">
          {name && (
            <h3 className="mb-2 text-xl font-bold text-gray-900">{name}</h3>
          )}

          {bio && <p className="mb-4 text-gray-600">{bio}</p>}

          {/* Social links */}
          {socialLinks.length > 0 && (
            <div className="flex justify-center space-x-4 md:justify-start">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 transition hover:text-gray-800"
                  aria-label={`${name} on ${link.platform}`}
                >
                  {/* Use your preferred icon system here */}
                  {link.platform}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
