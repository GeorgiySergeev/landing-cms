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
  className = ""
}: AuthorBioProps): JSX.Element {
  return (
    <div className={`border-t border-b border-gray-200 py-8 my-12 ${className}`}>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Avatar */}
        {avatar && (
          <img 
            src={avatar} 
            alt={name} 
            className="w-20 h-20 rounded-full object-cover"
          />
        )}
        
        {/* Bio content */}
        <div className="flex-1 text-center md:text-left">
          {name && (
            <h3 className="text-xl font-bold text-gray-900 mb-2">{name}</h3>
          )}
          
          {bio && (
            <p className="text-gray-600 mb-4">{bio}</p>
          )}
          
          {/* Social links */}
          {socialLinks.length > 0 && (
            <div className="flex space-x-4 justify-center md:justify-start">
              {socialLinks.map((link, index) => (
                <a 
                  key={index} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-800 transition"
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