import React from 'react';
import Typed from 'react-typed';

const pitch = [
  'I build mobile applications for iOS',
  'I build mobile applications for Android',
  'I craft scalable and clean design systems',
  'You should hire me for your next success',
  'I can turn your casual visitors into customers…',
  '… then ambassadors of your product',
];

export default function Typewriter() {
  return (
    <Typed
      strings={pitch}
      typeSpeed={40}
      loop={true}
      smartBackspace={true}
      backDelay={1000}
    />
  );
}
