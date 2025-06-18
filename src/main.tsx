import { MeowKitProvider } from '@/components';
import '@fontsource-variable/quicksand/index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MeowKitProvider>
      <App />
    </MeowKitProvider>
  </StrictMode>,
);
