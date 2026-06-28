import React from 'react';
import AndroidLogo from '~/components/Stack/svg/AndroidLogo';
import ExpoLogo from '~/components/Stack/svg/ExpoLogo';
import IosLogo from '~/components/Stack/svg/IosLogo';
import ReactNativeLogo from '~/components/Stack/svg/ReactNativeLogo';
import TypeScriptLogo from '~/components/Stack/svg/TypeScriptLogo';
import ReactQueryLogo from '~/components/Stack/svg/ReactQueryLogo';

export default function BootcampStack() {
  return (
    <div className="grid grid-flow-col grid-rows-2 gap-4">
      <div>
        <TypeScriptLogo />
        <p className="px-8 py-2 font-bold">TypeScript</p>
      </div>
      <div>
        <ExpoLogo />
        <p className="px-8 py-2 font-bold">Expo</p>
      </div>
      <div>
        <ReactNativeLogo />
        <p className="px-8 py-2 font-bold">React Native</p>
      </div>
      <div>
        <IosLogo />
        <p className="px-8 py-2 font-bold">iOS</p>
      </div>
      <div>
        <ReactQueryLogo />
        <p className="px-8 py-2 font-bold">TanStack Query</p>
      </div>
      <div>
        <AndroidLogo />
        <p className="px-8 py-2 font-bold">Android</p>
      </div>
    </div>
  );
}
