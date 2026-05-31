import { ReactNode } from 'react';

interface MobileFrameProps {
  children: ReactNode;
  width?: number;
}

export function MobileFrame({ children, width = 320 }: MobileFrameProps) {
  return (
    <div
      className="mx-auto overflow-hidden rounded-[3rem] border-[10px] border-gray-900 bg-gray-900 shadow-xl"
      style={{ width }}
    >
      <div className="relative h-7 bg-gray-900">
        <div className="absolute left-1/2 top-1.5 h-5 w-24 -translate-x-1/2 rounded-full bg-black" />
      </div>
      <div className="bg-white">{children}</div>
    </div>
  );
}
