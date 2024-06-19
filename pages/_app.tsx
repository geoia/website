import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import { GoogleAnalytics } from '@next/third-parties/google';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../theme';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>EcoGis - Mapeando a biodiversidade do Pantanal</title>

        <meta property="og:title" content="EcoGis - Mapeando a biodiversidade do Pantanal" />
        <meta
          property="og:description"
          content="Projeto de pesquisa e extensão do laboratório Geomática e Inteligência Artificial em parceria com o Laboratório de Engenharia de Software, da Universidade Federal de Mato Grosso do Sul, para monitoramento e gestão dos biomas do Brasil, principalmente do pantanal, por meio da ferramenta WebGis"
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="EcoGis" />
        <meta property="og:locale" content="pt_BR" />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_BASE_URL || 'https://ecogis.app'}/images/screenshot_og.png`}
        />
        <meta
          property="og:image:secure_url"
          content={`${process.env.NEXT_PUBLIC_BASE_URL || 'https://ecogis.app'}/images/screenshot.png`}
        />
        <meta
          property="og:url"
          content={process.env.NEXT_PUBLIC_BASE_URL || `https://ecogis.app`}
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GTAG || ''} />
    </>
  );
}

export default MyApp;
