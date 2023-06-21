import '../styles/globals.scss'
import type { AppProps } from 'next/app'

import '../../firebase/client' // Initialize FirebaseApp

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}