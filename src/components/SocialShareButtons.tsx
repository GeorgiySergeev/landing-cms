import {
  Facebook,
  Twitter,
  Mail,
  MessageCircle,
  Linkedin,
  Share2,
  Copy,
} from 'lucide-preact';
import { useState } from 'preact/hooks';

interface SocialShareButtonsProps {
  title?: string;
  url?: string;
  className?: string;
  platforms?: (
    | 'facebook'
    | 'twitter'
    | 'email'
    | 'whatsapp'
    | 'linkedin'
    | 'copy'
  )[];
}

export default function SocialShareButtons({
  title = 'Check this out!',
  url = typeof window !== 'undefined' ? window.location.href : '',
  className = '',
  platforms = ['facebook', 'twitter', 'email', 'whatsapp'],
}: SocialShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=Check this out: ${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle} ${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  };

  const handleShare = (platform: keyof typeof shareUrls) => {
    const shareUrl = shareUrls[platform];

    if (platform === 'email') {
      window.location.href = shareUrl;
    } else {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: url,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    }
  };

  const iconProps = { size: 20 };

  const platformConfig = {
    facebook: {
      icon: <Facebook {...iconProps} />,
      handler: () => handleShare('facebook'),
      label: 'Share on Facebook',
    },
    twitter: {
      icon: <Twitter {...iconProps} />,
      handler: () => handleShare('twitter'),
      label: 'Share on Twitter',
    },
    email: {
      icon: <Mail {...iconProps} />,
      handler: () => handleShare('email'),
      label: 'Share via Email',
    },
    whatsapp: {
      icon: <MessageCircle {...iconProps} />,
      handler: () => handleShare('whatsapp'),
      label: 'Share on WhatsApp',
    },
    linkedin: {
      icon: <Linkedin {...iconProps} />,
      handler: () => handleShare('linkedin'),
      label: 'Share on LinkedIn',
    },
    copy: {
      icon: <Copy {...iconProps} />,
      handler: handleCopy,
      label: copied ? 'Copied!' : 'Copy Link',
    },
  };

  return (
    <div className={`social-share ${className}`}>
      <div className="share-label">Share this story:</div>
      <div className="share-buttons">
        {platforms.map(platform => {
          const config = platformConfig[platform];
          return (
            <button
              key={platform}
              className={`share-button ${platform} ${copied && platform === 'copy' ? 'copied' : ''}`}
              onClick={config.handler}
              aria-label={config.label}
              title={config.label}
            >
              {config.icon}
            </button>
          );
        })}
        {/* Native Share API support for mobile */}{' '}
        {typeof window !== 'undefined' &&
          typeof navigator !== 'undefined' &&
          'share' in navigator && (
            <button
              className="share-button native"
              onClick={handleNativeShare}
              aria-label="Share"
              title="Share"
            >
              <Share2 {...iconProps} />
            </button>
          )}
      </div>
    </div>
  );
}
