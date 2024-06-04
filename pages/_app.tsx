import type { ReactElement, ReactNode } from 'react';
import '../src/CSS/LoginPage.css'
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import nProgress from 'nprogress';
import 'nprogress/nprogress.css';
import ThemeProvider from 'src/theme/ThemeProvider';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from 'src/createEmotionCache';
import { SidebarProvider } from 'src/contexts/SidebarContext';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { Provider } from 'react-redux'
import { store } from '@/redux/store';
import NoSSR from 'react-no-ssr';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'




const clientSideEmotionCache = createEmotionCache();

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface TokyoAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
}



function TokyoApp(props: TokyoAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => page);

  Router.events.on('routeChangeStart', nProgress.start);
  Router.events.on('routeChangeError', nProgress.done);
  Router.events.on('routeChangeComplete', nProgress.done);

  return (
    <NoSSR>
    <CacheProvider value={emotionCache}>
      <Head>
        <title>GLA Mathura</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <Provider store={store}>
        <SidebarProvider>
          <ThemeProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <CssBaseline />
              {getLayout(<Component {...pageProps} suppressHydrationWarning={true} />)}
            </LocalizationProvider>
          </ThemeProvider>
        </SidebarProvider>
      </Provider>
    </CacheProvider>
    </NoSSR>
  );
}

export default TokyoApp;
