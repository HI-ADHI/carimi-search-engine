import Document, { Html, Head, Main, NextScript } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="description" content="Carimi search engine - fast, simple, and ethical" />
          <meta name="keywords" content="search engine, carimi, google, bing, web search" />
          <meta name="author" content="Carimi" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://carimi-search.com" />
          <meta property="og:title" content="Carimi - Search, Simplified. Powered by Ethical Intelligence." />
          <meta property="og:description" content="Carimi search engine - fast, simple, and ethical" />
          <meta property="og:image" content="https://carimi-search.com/og-image.jpg" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@carimi_search" />
          <meta name="twitter:title" content="Carimi - Search, Simplified. Powered by Ethical Intelligence." />
          <meta name="twitter:description" content="Carimi search engine - fast, simple, and ethical" />
          <meta name="twitter:image" content="https://carimi-search.com/og-image.jpg" />
          <link rel="canonical" href="https://carimi-search.com" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body className={inter.className}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}