import React from 'react';
import Gravatar from 'react-gravatar';

export default function Avatar() {
  return (
    // @ts-ignore
    <Gravatar
      email="dleuliette@gmail.com"
      size={128}
      className="size-28 rounded-full bg-gradient-to-b from-gray-200 to-gray-400 p-0.5"
    />
  );
}
