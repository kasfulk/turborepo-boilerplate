import { AppProps } from 'next/app';
import '../styles/global.css';

export default function App(props: AppProps) {
    const { Component, pageProps } = props;
  return <Component {...pageProps} />
}