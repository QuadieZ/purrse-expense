import { App, MeowKitProvider } from '@/app';
import '@fontsource-variable/quicksand/index.css';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')!).render(
  <MeowKitProvider>
    <App />
  </MeowKitProvider>,
);
