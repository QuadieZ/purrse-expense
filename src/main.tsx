import { App, MeowKitProvider } from '@/app';
import { Toaster } from '@/common/ui';
import '@fontsource-variable/quicksand/index.css';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')!).render(
  <MeowKitProvider>
    <Toaster />
    <App />
    <SpeedInsights />
  </MeowKitProvider>,
);
