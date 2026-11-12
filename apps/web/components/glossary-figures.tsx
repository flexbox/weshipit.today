import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';

/**
 * Interactive Anatomy figures shown on a glossary term page, keyed by term
 * slug. Each one is its own chunk, so other terms never load it.
 */
const FIGURES: Record<string, ComponentType> = {
  bridge: dynamic(() =>
    import('./anatomy/bridge/bridge-figure').then(
      (mod) => mod.BridgeAnatomyFigure,
    ),
  ),
  'continuous-native-generation': dynamic(() =>
    import('./anatomy/cng/cng-figure').then((mod) => mod.CngAnatomyFigure),
  ),
  'dev-menu': dynamic(() =>
    import('./anatomy/dev-menu/dev-menu-figure').then(
      (mod) => mod.DevMenuAnatomyFigure,
    ),
  ),
  expo: dynamic(() =>
    import('./anatomy/expo/expo-figure').then((mod) => mod.ExpoAnatomyFigure),
  ),
  'fast-refresh': dynamic(() =>
    import('./anatomy/fast-refresh/fast-refresh-figure').then(
      (mod) => mod.FastRefreshAnatomyFigure,
    ),
  ),
  hermes: dynamic(() =>
    import('./anatomy/hermes/hermes-figure').then(
      (mod) => mod.HermesAnatomyFigure,
    ),
  ),
  jsi: dynamic(() =>
    import('./anatomy/jsi/jsi-figure').then((mod) => mod.JsiAnatomyFigure),
  ),
  metro: dynamic(() =>
    import('./anatomy/metro/metro-figure').then(
      (mod) => mod.MetroAnatomyFigure,
    ),
  ),
  'over-the-air-update': dynamic(() =>
    import('./anatomy/ota/ota-figure').then((mod) => mod.OtaAnatomyFigure),
  ),
  reanimated: dynamic(() =>
    import('./anatomy/reanimated/reanimated-figure').then(
      (mod) => mod.ReanimatedAnatomyFigure,
    ),
  ),
  flatlist: dynamic(() =>
    import('./anatomy/flatlist/flatlist-figure').then(
      (mod) => mod.FlatListAnatomyFigure,
    ),
  ),
  flexbox: dynamic(() =>
    import('./anatomy/flexbox/flexbox-figure').then(
      (mod) => mod.FlexboxAnatomyFigure,
    ),
  ),
  turbomodules: dynamic(() =>
    import('./anatomy/turbomodules/turbomodules-figure').then(
      (mod) => mod.TurboModulesAnatomyFigure,
    ),
  ),
  'safe-area': dynamic(() =>
    import('./anatomy/safe-area/safe-area-figure').then(
      (mod) => mod.SafeAreaAnatomyFigure,
    ),
  ),
  keys: dynamic(() =>
    import('./anatomy/keys/keys-figure').then((mod) => mod.KeysAnatomyFigure),
  ),
  'react-navigation': dynamic(() =>
    import('./anatomy/react-navigation/react-navigation-figure').then(
      (mod) => mod.ReactNavigationAnatomyFigure,
    ),
  ),
  'expo-router': dynamic(() =>
    import('./anatomy/expo-router/expo-router-figure').then(
      (mod) => mod.ExpoRouterAnatomyFigure,
    ),
  ),
  'props-and-state': dynamic(() =>
    import('./anatomy/props-and-state/props-and-state-figure').then(
      (mod) => mod.PropsStateAnatomyFigure,
    ),
  ),
  jsx: dynamic(() =>
    import('./anatomy/jsx/jsx-figure').then((mod) => mod.JsxAnatomyFigure),
  ),
  'platform-specific-code': dynamic(() =>
    import(
      './anatomy/platform-specific-code/platform-specific-code-figure'
    ).then((mod) => mod.PlatformAnatomyFigure),
  ),
  'ui-thread-main-thread': dynamic(() =>
    import('./anatomy/ui-thread/ui-thread-figure').then(
      (mod) => mod.UiThreadAnatomyFigure,
    ),
  ),
  codegen: dynamic(() =>
    import('./anatomy/codegen/codegen-figure').then(
      (mod) => mod.CodegenAnatomyFigure,
    ),
  ),
  'fabric-renderer': dynamic(() =>
    import('./anatomy/fabric/fabric-figure').then(
      (mod) => mod.FabricAnatomyFigure,
    ),
  ),
  'javascript-bundle': dynamic(() =>
    import('./anatomy/javascript-bundle/javascript-bundle-figure').then(
      (mod) => mod.BundleAnatomyFigure,
    ),
  ),
  'development-build': dynamic(() =>
    import('./anatomy/development-build/development-build-figure').then(
      (mod) => mod.DevBuildAnatomyFigure,
    ),
  ),
  'core-components': dynamic(() =>
    import('./anatomy/core-components/core-components-figure').then(
      (mod) => mod.CoreComponentsAnatomyFigure,
    ),
  ),
  'host-platform': dynamic(() =>
    import('./anatomy/host-platform/host-platform-figure').then(
      (mod) => mod.HostPlatformAnatomyFigure,
    ),
  ),
  'javascript-thread': dynamic(() =>
    import('./anatomy/javascript-thread/javascript-thread-figure').then(
      (mod) => mod.JsThreadAnatomyFigure,
    ),
  ),
  refs: dynamic(() =>
    import('./anatomy/refs/refs-figure').then((mod) => mod.RefsAnatomyFigure),
  ),
  stylesheet: dynamic(() =>
    import('./anatomy/stylesheet/stylesheet-figure').then(
      (mod) => mod.StyleSheetAnatomyFigure,
    ),
  ),
  yoga: dynamic(() =>
    import('./anatomy/yoga/yoga-figure').then((mod) => mod.YogaAnatomyFigure),
  ),
  'javascript-runtime': dynamic(() =>
    import('./anatomy/javascript-runtime/javascript-runtime-figure').then(
      (mod) => mod.RuntimeAnatomyFigure,
    ),
  ),
  worklet: dynamic(() =>
    import('./anatomy/worklet/worklet-figure').then(
      (mod) => mod.WorkletAnatomyFigure,
    ),
  ),
  'animated-component': dynamic(() =>
    import('./anatomy/animated-component/animated-component-figure').then(
      (mod) => mod.AnimatedAnatomyFigure,
    ),
  ),
  'react-elements': dynamic(() =>
    import('./anatomy/react-elements/react-elements-figure').then(
      (mod) => mod.ElementsAnatomyFigure,
    ),
  ),
  'view-component': dynamic(() =>
    import('./anatomy/view-component/view-component-figure').then(
      (mod) => mod.ViewAnatomyFigure,
    ),
  ),
  'native-module': dynamic(() =>
    import('./anatomy/native-module/native-module-figure').then(
      (mod) => mod.NativeModuleAnatomyFigure,
    ),
  ),
  'communication-layer': dynamic(() =>
    import('./anatomy/communication-layer/communication-layer-figure').then(
      (mod) => mod.CommunicationAnatomyFigure,
    ),
  ),
  eas: dynamic(() =>
    import('./anatomy/eas/eas-figure').then((mod) => mod.EasAnatomyFigure),
  ),
  'legacy-vs-new-architecture': dynamic(() =>
    import(
      './anatomy/legacy-vs-new-architecture/legacy-vs-new-architecture-figure'
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
