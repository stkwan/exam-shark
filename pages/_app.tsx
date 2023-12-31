// Import React-Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// Import bootstrap
import 'bootstrap/dist/css/bootstrap.css';

// Import global styles (can only be used in _app.tsx file)
import '@/styles/globals.css';

// Import styles for React-Bootstrap Container component for pages
import styles from '@/styles/App.module.css';


import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import Head from 'next/head';

import { Container } from 'react-bootstrap';

// Save reference to Inter font to wrap App
const inter = Inter({ subsets: ['latin'] });

// The App component wraps our entire application
// Elements that wrap Component are displayed on every page
// Component pages are passed in with props and rendered

import NavBar from '@/components/navbar';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={inter.className}>
      <Head>
        <title>ExamSpace</title>
        <meta name="description" content="An app to create custom exams" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar/>
      <Container className={styles.pageContainer}>
        <Component {...pageProps} />
      </Container>
    </div>
  )
}
