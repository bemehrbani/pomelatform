import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { TonConnectUIProvider } from '@tonconnect/ui-react';

// Use strict mode for better dev experience
// Manifest URL should be hosted publicly for production. 
// For dev, we can us a placeholder or a local one if we serve it.
// Using a generic placeholder for now.
const MANIFEST_URL = 'https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <TonConnectUIProvider manifestUrl={MANIFEST_URL}>
            <App />
        </TonConnectUIProvider>
    </React.StrictMode>,
)
