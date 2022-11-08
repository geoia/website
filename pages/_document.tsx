import { Html, Head, Main, NextScript } from 'next/document';
// import theme, { poppins } from '../src/theme';

export default function Document() {
  return (
    <Html>
      <Head>
        {/* <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        /> */}


        <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <meta name="viewport" content="width=device-width, initial-scale=0.9" />
        <title>GeoIA</title>
        <link rel="icon" href="/imgLogo.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
