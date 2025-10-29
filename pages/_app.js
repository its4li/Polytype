import '../styles/globals.css'
import { useEffect } from 'react'

export default function App({ Component, pageProps }){
  // optional: load font or anything
  useEffect(()=> {
    // no-op
  },[])
  return <Component {...pageProps} />
}
