import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';

/**
 * Interactive Anatomy figures shown on a glossary term page, keyed by term
 * slug. Each one is its own chunk, so other terms never load it.
 */
const FIGURES: Record<string, ComponentType> = {
  bridge: dynamic(() =>
    import('./bridge-anatomy/bridge-figure').then(
      (mod) => mod.BridgeAnatomyFigure,
    ),
  ),
  'continuous-native-generation': dynamic(() =>
    import('./cng-anatomy/cng-figure').then((mod) => mod.CngAnatomyFigure),
  ),
  'dev-menu': dynamic(() =>
    import('./dev-menu-anatomy/dev-menu-figure').then(
      (mod) => mod.DevMenuAnatomyFigure,
    ),
  ),
  expo: dynamic(() =>
    import('./expo-anatomy/expo-figure').then((mod) => mod.ExpoAnatomyFigure),
  ),
  'fast-refresh': dynamic(() =>
    import('./fast-refresh-anatomy/fast-refresh-figure').then(
      (mod) => mod.FastRefreshAnatomyFigure,
    ),
  ),
  hermes: dynamic(() =>
    import('./hermes-anatomy/hermes-figure').then(
      (mod) => mod.HermesAnatomyFigure,
    ),
  ),
  jsi: dynamic(() =>
    import('./jsi-anatomy/jsi-figure').then((mod) => mod.JsiAnatomyFigure),
  ),
  metro: dynamic(() =>
    import('./metro-anatomy/metro-figure').then(
      (mod) => mod.MetroAnatomyFigure,
    ),
  ),
  'over-the-air-update': dynamic(() =>
    import('./ota-anatomy/ota-figure').then((mod) => mod.OtaAnatomyFigure),
  ),
  reanimated: dynamic(() =>
    import('./reanimated-anatomy/reanimated-figure').then(
      (mod) => mod.ReanimatedAnatomyFigure,
    ),
  ),
  flatlist: dynamic(() =>
    import('./flatlist-anatomy/flatlist-figure').then(
      (mod) => mod.FlatListAnatomyFigure,
    ),
  ),
  flexbox: dynamic(() =>
    import('./flexbox-anatomy/flexbox-figure').then(
      (mod) => mod.FlexboxAnatomyFigure,
    ),
  ),
  turbomodules: dynamic(() =>
    import('./turbomodules-anatomy/turbomodules-figure').then(
      (mod) => mod.TurboModulesAnatomyFigure,
    ),
  ),
  'safe-area': dynamic(() =>
    import('./safe-area-anatomy/safe-area-figure').then(
      (mod) => mod.SafeAreaAnatomyFigure,
    ),
  ),
  keys: dynamic(() =>
    import('./keys-anatomy/keys-figure').then((mod) => mod.KeysAnatomyFigure),
  ),
  'react-navigation': dynamic(() =>
    import('./react-navigation-anatomy/react-navigation-figure').then(
      (mod) => mod.ReactNavigationAnatomyFigure,
    ),
  ),
  'expo-router': dynamic(() =>
    import('./expo-router-anatomy/expo-router-figure').then(
      (mod) => mod.ExpoRouterAnatomyFigure,
    ),
  ),
  'props-and-state': dynamic(() =>
    import('./props-and-state-anatomy/props-and-state-figure').then(
      (mod) => mod.PropsStateAnatomyFigure,
    ),
  ),
  jsx: dynamic(() =>
    import('./jsx-anatomy/jsx-figure').then((mod) => mod.JsxAnatomyFigure),
  ),
  'platform-specific-code': dynamic(() =>
    import(
      './platform-specific-code-anatomy/platform-specific-code-figure'
    ).then((mod) => mod.PlatformAnatomyFigure),
  ),
  'ui-thread-main-thread': dynamic(() =>
    import('./ui-thread-anatomy/ui-thread-figure').then(
      (mod) => mod.UiThreadAnatomyFigure,
    ),
  ),
  codegen: dynamic(() =>
    import('./codegen-anatomy/codegen-figure').then(
      (mod) => mod.CodegenAnatomyFigure,
    ),
  ),
  'fabric-renderer': dynamic(() =>
    import('./fabric-anatomy/fabric-figure').then(
      (mod) => mod.FabricAnatomyFigure,
    ),
  ),
  'javascript-bundle': dynamic(() =>
    import('./javascript-bundle-anatomy/javascript-bundle-figure').then(
      (mod) => mod.BundleAnatomyFigure,
    ),
  ),
  'development-build': dynamic(() =>
    import('./development-build-anatomy/development-build-figure').then(
      (mod) => mod.DevBuildAnatomyFigure,
    ),
  ),
  'core-components': dynamic(() =>
    import('./core-components-anatomy/core-components-figure').then(
      (mod) => mod.CoreComponentsAnatomyFigure,
    ),
  ),
  'host-platform': dynamic(() =>
    import('./host-platform-anatomy/host-platform-figure').then(
      (mod) => mod.HostPlatformAnatomyFigure,
    ),
  ),
  'javascript-thread': dynamic(() =>
    import('./javascript-thread-anatomy/javascript-thread-figure').then(
      (mod) => mod.JsThreadAnatomyFigure,
    ),
  ),
  refs: dynamic(() =>
    import('./refs-anatomy/refs-figure').then((mod) => mod.RefsAnatomyFigure),
  ),
  stylesheet: dynamic(() =>
    import('./stylesheet-anatomy/stylesheet-figure').then(
      (mod) => mod.StyleSheetAnatomyFigure,
    ),
  ),
  yoga: dynamic(() =>
    import('./yoga-anatomy/yoga-figure').then((mod) => mod.YogaAnatomyFigure),
  ),
  'javascript-runtime': dynamic(() =>
    import('./javascript-runtime-anatomy/javascript-runtime-figure').then(
      (mod) => mod.RuntimeAnatomyFigure,
    ),
  ),
  worklet: dynamic(() =>
    import('./worklet-anatomy/worklet-figure').then(
      (mod) => mod.WorkletAnatomyFigure,
    ),
  ),
  'animated-component': dynamic(() =>
    import('./animated-component-anatomy/animated-component-figure').then(
      (mod) => mod.AnimatedAnatomyFigure,
    ),
  ),
  'react-elements': dynamic(() =>
    import('./react-elements-anatomy/react-elements-figure').then(
      (mod) => mod.ElementsAnatomyFigure,
    ),
  ),
  'view-component': dynamic(() =>
    import('./view-component-anatomy/view-component-figure').then(
      (mod) => mod.ViewAnatomyFigure,
    ),
  ),
  'native-module': dynamic(() =>
    import('./native-module-anatomy/native-module-figure').then(
      (mod) => mod.NativeModuleAnatomyFigure,
    ),
  ),
  'communication-layer': dynamic(() =>
    import('./communication-layer-anatomy/communication-layer-figure').then(
      (mod) => mod.CommunicationAnatomyFigure,
    ),
  ),
  eas: dynamic(() =>
    import('./eas-anatomy/eas-figure').then((mod) => mod.EasAnatomyFigure),
  ),
  'legacy-vs-new-architecture': dynamic(() =>
    import(
      './legacy-vs-new-architecture-anatomy/legacy-vs-new-architecture-figure'
    ).then((mod) => mod.ArchitectureAnatomyFigure),
  ),
};

export function GlossaryFigure({
  className,
  slug,
}: {
  slug: string;
  className?: string;
}) {
  const Figure = FIGURES[slug];
  return Figure ? (
    <div className={className}>
      <Figure />
    </div>
  ) : null;
}
