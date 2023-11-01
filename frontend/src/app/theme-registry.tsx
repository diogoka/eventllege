'use client';
import { useState } from 'react';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { useServerInsertedHTML } from 'next/navigation';
import { GlobalStyles, alpha } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

declare module '@mui/material/styles' {
  interface Theme {
    app: {
      name: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    app?: {
      name?: string;
    };
  }
}

let theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: `
      `,
    },
    MuiInput: {
      styleOverrides: {
        root: {
          borderRadius: 5,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: '18px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '18px',
          height: '48px',
          padding: 0,
          borderRadius: 5,
          textTransform: 'none',
        },
      },
    },
  },
  palette: {
    primary: {
      light: alpha('#3875CB', .1),
      main: '#141D4F',
      dark: '#070F3D',
      contrastText: '#fff',
    },
    error: {
      light: '#f14c4c',
      main: '#D00000',
      dark: '#970303',
      contrastText: '#fff',
    },
  },
  app: {
    name: 'Eventllege'
  }
});

theme = createTheme(theme, {
  // Custom colors created with augmentColor go here
  palette: {
    lightblue: theme.palette.augmentColor({
      color: {
        light: '#accbf6',
        main: alpha('#3875CB', .1),
        dark: '#1053b1',
        contrastText: '#fff',
      },
      name: 'lightblue',
    }),
  }
});

theme.typography.h1 = {
  fontSize: '24px',
}
theme.typography.h2 = {
  fontSize: '18px',
}

export default function ThemeRegistry(props: any) {
  const { options, children } = props;

  const [{ cache, flush }] = useState(() => {
    const cache = createCache(options);
    cache.compat = true;
    const prevInsert = cache.insert;
    let inserted: string[] = [];
    cache.insert = (...args) => {
      const serialized = args[1];
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };
    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };
    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) {
      return null;
    }
    let styles = '';
    for (const name of names) {
      styles += cache.inserted[name];
    }
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(' ')}`}
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
    );
  });

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles styles={{ 'input': { padding: 0 } }} />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
