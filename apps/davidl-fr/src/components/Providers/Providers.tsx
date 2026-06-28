import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import { useTernaryDarkMode } from 'usehooks-ts';
import GlobalStyles from '~/components/GlobalStyles';
import { light, dark } from '~/components/Theme';

interface Props {
  children?: React.ReactNode;
}

const Providers = ({ children }: Props) => {
  const { ternaryDarkMode, setTernaryDarkMode } = useTernaryDarkMode();
  const [theme, setTheme] = React.useState(light);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    const getSystemPreference = () => {
      return (
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      );
    };

    const handleSystemThemeChange = (e: any) => {
      if (ternaryDarkMode === 'system') {
        setTheme(e.matches ? dark : light);
      }
    };

    const systemPreferenceQuery = window.matchMedia(
      '(prefers-color-scheme: dark)',
    );
    systemPreferenceQuery.addEventListener('change', handleSystemThemeChange);

    const determineTheme = () => {
      switch (ternaryDarkMode) {
        case 'light':
          return light;
        case 'dark':
          return dark;
        case 'system':
          return getSystemPreference() ? dark : light;
        default:
          return light;
      }
    };

    setTheme(determineTheme());

    setMounted(true);

    // Clean up the event listener
    return () => {
      systemPreferenceQuery.removeEventListener(
        'change',
        handleSystemThemeChange,
      );
    };
  }, [ternaryDarkMode]);

  const body = (
    <ThemeProvider theme={theme}>
      <GlobalStyles.ResetStyles />
      {children}
    </ThemeProvider>
  );

  // Prevents SSR flash for mismatched dark mode
  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{body}</div>;
  }

  return body;
};

export default Providers;
