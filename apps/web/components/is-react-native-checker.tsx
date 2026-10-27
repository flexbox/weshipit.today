import { Badge, Button, Card, Text } from '@weshipit/ui';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
  ClipboardEvent,
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import type { Framework } from '../utils/is-react-native/detect-framework';
import type { AndroidAppInspection } from '../utils/is-react-native/inspect-android-app';
import { parseStoreUrl } from '../utils/is-react-native/parse-store-url';

export const EXAMPLES = [
  { id: 'com.planet.centerparcs', label: 'Center Parcs' },
  { id: 'com.discord', label: 'Discord' },
  { id: 'com.spotify.music', label: 'Spotify' },
];

const FRAMEWORK_LABELS: Record<Framework, string> = {
  capacitor: 'Capacitor (web app in a native shell)',
  cordova: 'Cordova (web app in a native shell)',
  flutter: 'Flutter',
  native: 'Native Android (Kotlin or Java)',
  nativescript: 'NativeScript',
  'react-native': 'React Native',
  unity: 'Unity',
  xamarin: '.NET MAUI / Xamarin',
};

const MAX_EVIDENCE = 6;

type Outcome =
  | { message: string; status: 'error' }
  | { result: AndroidAppInspection; status: 'done' };

type State = { status: 'idle' } | { status: 'loading' } | Outcome;

async function requestCheck(packageId: string): Promise<Outcome> {
  try {
    const response = await fetch(
      `/api/is-react-native?id=${encodeURIComponent(packageId)}`,
    );
    if (response.status === 404) {
      return {
        message: `We could not get a copy of "${packageId}". Check the link: paid and region-locked apps cannot be inspected.`,
        status: 'error',
      };
    }
    if (!response.ok) {
      return {
        message: 'We could not inspect this app right now. Try again.',
        status: 'error',
      };
    }
    return { result: await response.json(), status: 'done' };
  } catch {
    return {
      message: 'Network error. Check your connection and try again.',
      status: 'error',
    };
  }
}

// Results stay for the whole visit: checking an app again is instant.
const results = new Map<string, AndroidAppInspection>();

interface IsReactNativeCheckerProps {
  /** Apps checked at build time, shown without a request. */
  initialResults: AndroidAppInspection[];
}

export function IsReactNativeChecker({
  initialResults,
}: IsReactNativeCheckerProps) {
  const router = useRouter();
  const [input, setInput] = useState('');
  const [state, setState] = useState<State>({ status: 'idle' });
  const lastChecked = useRef<string | null>(null);

  const check = useCallback(
    async (packageId: string) => {
      lastChecked.current = packageId;
      setInput(`https://play.google.com/store/apps/details?id=${packageId}`);
      router.replace({ query: { id: packageId } }, undefined, {
        scroll: false,
        shallow: true,
      });

      const known =
        results.get(packageId) ??
        initialResults.find((result) => result.packageId === packageId);
      if (known) {
        return setState({ result: known, status: 'done' });
      }

      setState({ status: 'loading' });
      const outcome = await requestCheck(packageId);
      if (outcome.status === 'done') {
        results.set(packageId, outcome.result);
      }
      // Ignore the answer if another app was checked in the meantime.
      if (lastChecked.current === packageId) {
        setState(outcome);
      }
    },
    [initialResults, router],
  );

  // Shared links and the popular apps list (`?id=com.example`) run the check
  // on load and whenever the id in the URL changes.
  useEffect(() => {
    if (!router.isReady) return;
    const id = router.query.id;
    if (typeof id !== 'string' || id === lastChecked.current) return;
    const parsed = parseStoreUrl(id);
    if ('packageId' in parsed) check(parsed.packageId);
  }, [router.isReady, router.query.id, check]);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const parsed = parseStoreUrl(input);

    if ('error' in parsed) {
      lastChecked.current = null;
      return setState({
        message:
          parsed.error === 'ios-not-supported'
            ? 'App Store links are not supported yet. Paste the Google Play link of the same app.'
            : 'Paste a Google Play link, like https://play.google.com/store/apps/details?id=com.discord',
        status: 'error',
      });
    }
    check(parsed.packageId);
  }

  // A pasted Google Play link is checked right away, no click needed.
  function handlePaste(event: ClipboardEvent<HTMLInputElement>) {
    const parsed = parseStoreUrl(event.clipboardData.getData('text'));
    if ('packageId' in parsed) {
      event.preventDefault();
      check(parsed.packageId);
    }
  }

  return (
    <div className="max-w-3xl">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="store-url" className="sr-only">
          Google Play link
        </label>
        <input
          id="store-url"
          type="text"
          inputMode="url"
          autoComplete="off"
          spellCheck={false}
          required
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onPaste={handlePaste}
          placeholder="https://play.google.com/store/apps/details?id=…"
          className="min-w-0 flex-1 rounded-md border-0 bg-white px-4 py-3 text-base text-gray-900 shadow-xs ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:bg-white/5 dark:text-white dark:ring-white/10"
        />
        <Button
          size="xl"
          disabled={state.status === 'loading'}
          className="justify-center"
        >
          {state.status === 'loading' ? 'Checking…' : 'Check the app'}
        </Button>
      </form>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <Text as="span" variant="p2" className="text-gray-500">
          Try:
        </Text>
        {EXAMPLES.map((example) => (
          <button
            key={example.id}
            type="button"
            onClick={() => check(example.id)}
            className="rounded-full px-3 py-1 text-sm text-gray-600 ring-1 ring-inset ring-gray-300 transition-colors hover:bg-gray-50 dark:text-gray-300 dark:ring-white/10 dark:hover:bg-white/10"
          >
            {example.label}
          </button>
        ))}
      </div>

      <div aria-live="polite" className="mt-8">
        {state.status === 'loading' && (
          <Card size="lg" className="animate-pulse text-center">
            <Text as="p" variant="p1">
              Opening the APK and looking for React Native libraries…
            </Text>
          </Card>
        )}

        {state.status === 'error' && (
          <Card size="lg" className="text-center">
            <Text
              as="p"
              variant="p1"
              className="text-red-600 dark:text-red-400"
            >
              {state.message}
            </Text>
          </Card>
        )}

        {state.status === 'done' && <Result result={state.result} />}
      </div>
    </div>
  );
}

function Result({ result }: { result: AndroidAppInspection }) {
  const [copied, setCopied] = useState(false);
  const appName = result.name ?? result.packageId;

  async function copyLink() {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Card
      size="lg"
      variant={result.isReactNative ? 'gradient-blue' : undefined}
      className="flex flex-col gap-6"
    >
      <div className="flex items-center gap-4">
        {result.icon && (
          <Image
            src={result.icon}
            alt=""
            width={64}
            height={64}
            // Already a 128 px icon on a CDN: skip the optimizer round trip.
            unoptimized
            className="rounded-2xl"
          />
        )}
        <div className="min-w-0">
          <Text as="h2" variant="h5" className="truncate">
            {appName}
          </Text>
          <Text as="p" variant="p2" className="truncate font-mono opacity-80">
            {result.packageId}
          </Text>
        </div>
      </div>

      <div>
        <Text as="p" variant="h2">
          {result.isReactNative ? 'Yes ✅' : 'No ❌'}
        </Text>
        <Text as="p" variant="p1" className="mt-2">
          {result.isReactNative
            ? `${appName} is built with React Native.`
            : `${appName} is not built with React Native. Detected: ${
                FRAMEWORK_LABELS[result.framework]
              }.`}
        </Text>
      </div>

      {result.isReactNative && (
        <div className="flex flex-wrap gap-2">
          <Badge variant={result.expo ? 'green' : 'gray'}>
            {result.expo ? 'Uses Expo' : 'No Expo modules'}
          </Badge>
          <Badge variant={result.hermes ? 'green' : 'gray'}>
            {result.hermes ? 'Hermes engine' : 'JavaScriptCore engine'}
          </Badge>
        </div>
      )}

      {result.evidence.length > 0 && (
        <div>
          <Text as="p" variant="c2" className="uppercase tracking-wide">
            Found in the APK
          </Text>
          <ul className="mt-2 space-y-1 font-mono text-sm opacity-90">
            {result.evidence.slice(0, MAX_EVIDENCE).map((file) => (
              <li key={file} className="truncate">
                {file}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <Button variant="outline" size="lg" onClick={copyLink}>
          {copied ? 'Link copied' : 'Copy link to this result'}
        </Button>
      </div>
    </Card>
  );
}
