import TypeScriptLogo from './typescript-logo';
import AndroidLogo from './android-logo';
import ReactNativeLogo from './react-native-logo';
import IosLogo from './ios-logo';
import StorybookLogo from './storybook-logo';
import ExpoLogo from './expo-logo';
import TanstackLogo from './tanstack-logo';

export function AvengerStack() {
  return (
    <div className="m-auto mt-12 max-w-3xl text-center">
      <div className="grid grid-flow-col grid-rows-3 gap-2 md:grid-rows-2 md:gap-4">
        <div>
          <TypeScriptLogo />
          <p className="px-8 py-2 font-bold">Typescript</p>
        </div>
        <div>
          <AndroidLogo />
          <p className="px-8 py-2 font-bold">Android</p>
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
          <StorybookLogo />
          <p className="px-8 py-2 font-bold">Storybook</p>
        </div>
        <div>
          <ExpoLogo />
          <p className="px-8 py-2 font-bold">Expo</p>
        </div>
        <div>
          <img
            className="m-auto h-12"
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg"
            alt="Logo of GraphQL in svg format"
          />
          <p className="px-8 py-2 font-bold">GraphQL</p>
        </div>
        <div>
          <TanstackLogo />
          <p className="px-8 py-2 font-bold">TanStack</p>
        </div>
      </div>
    </div>
  );
}
