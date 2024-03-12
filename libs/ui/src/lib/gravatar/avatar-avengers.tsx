import { useState } from 'react';
import Gravatar from 'react-gravatar';

interface AvatarAvengerProps {
  email: string;
  emailhover: string;
  username: string;
  githubUrl: string;
}

export function AvatarAvenger(props: AvatarAvengerProps) {
  const [isShown, setIsShown] = useState(false);
  const { email, emailhover, username, githubUrl } = props;
  return (
    <div className=" mb-8 flex h-48 w-full flex-row justify-around">
      <div className="text-center">
        <div
          className="text-center"
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
        >
          {!isShown ? (
            <Gravatar
              email={email}
              size={128}
              className="mb-4 size-36 rounded-full bg-gradient-to-b from-gray-200 to-gray-400 p-0.5"
            />
          ) : (
            <Gravatar
              email={emailhover}
              size={128}
              className="mb-4 size-36 rounded-full bg-gradient-to-b from-gray-200 to-gray-400 p-0.5"
            />
          )}
        </div>
        <a className="text-gray-600 hover:text-gray-400" href={githubUrl}>
          {username}
        </a>
      </div>
    </div>
  );
}
