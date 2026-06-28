import Link from 'next/link';
import React from 'react';

export default function PatternList({ patterns }) {
  return (
    <ul>
      {patterns.map((pattern) => (
        <li key={`pattern-${pattern.uid}`} className="py-2">
          <Link
            href="/snippets/[uid]"
            as={`/snippets/${pattern.uid}`}
            className="font-semibold hover:text-blue-500"
          >
            {pattern.data.title[0].text}
          </Link>
        </li>
      ))}
    </ul>
  );
}
