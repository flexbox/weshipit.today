import { useState } from 'react';
import { Avatar } from '../avatar/avatar';

interface AvatarAvengerProps {
  email: string;
  username: string;
  githubUrl: string;
  emailhover: string;
}

export function AvatarAvenger({
  email,
  emailhover,
  githubUrl,
  username,
}: AvatarAvengerProps) {
  const [isShown, setIsShown] = useState(false);
  return (
    <div className="flex flex-col items-center">
      <div
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
      >
        <div className="size-32 rounded-full bg-gradient-to-b from-gray-200 to-gray-400 p-0.5">
          <Avatar
            className="rounded-full"
            email={isShown ? emailhover : email}
            size={128}
            name={username}
          />
        </div>
      </div>
      <a className="mt-2 text-gray-600 hover:text-gray-400" href={githubUrl}>
        {username}
      </a>
    </div>
  );
}
