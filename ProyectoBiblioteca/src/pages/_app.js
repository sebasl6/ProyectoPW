import '../styles/estilos1.css'

import { AppProps } from 'next/app'
import { DemoProvider } from './context/demo'

export default function MyApp( {Component, pageProps}) {
    return ( 
        <DemoProvider>
            <Component {...pageProps} />
        </DemoProvider> 
    )
}