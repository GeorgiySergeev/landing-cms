import { h } from 'preact';
import type { JSX } from 'preact';
import { useState } from 'preact/hooks';

interface CTAButtonProps {
  text?: string;
  color?: 'blue' | 'green' | 'yellow' | 'red';
  onClick?: (e: JSX.TargetedMouseEvent<HTMLButtonElement>) => void;
  href?: string;
}

type ColorClasses = {
  [key in 'blue' | 'green' | 'yellow' | 'red']: string;
};

export default function CTAButton({
  text = 'Click Here',
  color = 'blue',
  onClick,
  href,
}: CTAButtonProps): JSX.Element {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const colorClasses: ColorClasses = {
    blue: 'bg-blue-500 hover:bg-blue-600 text-white',
    green: 'bg-green-500 hover:bg-green-600 text-white',
    yellow: 'bg-yellow-400 hover:bg-yellow-500 text-gray-900',
    red: 'bg-red-500 hover:bg-red-600 text-white',
  };

  const classes = `py-3 px-6 font-bold rounded-lg transition-colors ${colorClasses[color] || colorClasses.blue}`;

  const handleClick = (e: JSX.TargetedMouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(e);
    }
    if (href) {
      window.location.href = href;
    }
  };

  return (
    <button
      class={classes}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {text}
      {isHovered && <span class="ml-2">→</span>}
    </button>
  );
}
