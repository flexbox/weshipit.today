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
    <div className=" mb-8 flex h-48 w-full flex-row justify-around">
      <div className="text-center">
        <div
          className="text-center"
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
        >
          {!isShown ? (
            <div className="mb-4 size-36 rounded-full bg-gradient-to-b from-gray-200 to-gray-400 p-0.5">
              <Avatar email={email} size={128} name={username} />
            </div>
          ) : (
            <div className="mb-4 size-36 rounded-full bg-gradient-to-b from-gray-200 to-gray-400 p-0.5">
              <Avatar email={emailhover} size={128} name={username} />
            </div>
          )}
        </div>
        <a className="text-gray-600 hover:text-gray-400" href={githubUrl}>
          {username}
        </a>
      </div>
    </div>
  );
}
