import React from 'react';
import md5 from 'md5';

interface AvatarProps {
  size: number;
  email: string;
  name?: string;
  className?: string;
}

/**
 * Avatar component that uses Gravatar to display user avatars
 * Falls back to a colored initial-based avatar if Gravatar fails
 */
export function Avatar({ className, email, name, size }: AvatarProps) {
  const hash = md5(email.trim().toLowerCase());

  const getInitials = (): string => {
    if (name) {
      return name
        .split(' ')
        .map((part) => part.charAt(0))
        .join('')
        .toUpperCase()
        .substring(0, 2);
    }

    const username = email.split('@')[0];
    return username.substring(0, 2).toUpperCase();
  };

  const simpleHash = (str: string): number => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  };

  // Get a color based on the email hash
  const getColor = (email: string): string => {
    const hash = simpleHash(email.trim().toLowerCase());
    const hue = hash % 360;
    return `hsl(${hue}, 70%, 60%)`;
  };

  const initials = getInitials();
  const bgColor = getColor(email);

  return (
    <img
      src={`https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`}
      alt={`Avatar for ${email}`}
      className={className}
      width={size}
      height={size}
      onError={(e) => {
        // If image fails to load, replace with initials-based avatar
        const target = e.target as HTMLImageElement;
        const div = document.createElement('div');

        Object.assign(div.style, {
          alignItems: 'center',
          backgroundColor: bgColor,
          borderRadius: '50%',
          color: 'white',
          display: 'flex',
          fontSize: `${size / 2.5}px`,
          fontWeight: 'bold',
          height: `${size}px`,
          justifyContent: 'center',
          width: `${size}px`,
        });

        div.className = className || '';
        div.title = email;
        div.textContent = initials;

        target.parentNode?.replaceChild(div, target);
      }}
    />
  );
}

export default Avatar;
