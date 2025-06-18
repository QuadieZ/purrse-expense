import { App, MeowKitProvider } from '@/app';
import '@fontsource-variable/quicksand/index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MeowKitProvider>
      <App />
    </MeowKitProvider>
  </StrictMode>,
);
