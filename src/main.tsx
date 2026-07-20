import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { LanguageProvider } from './lib/LanguageContext.tsx';
import { ArtworkProvider } from './lib/ArtworkContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <ArtworkProvider>
        <App />
      </ArtworkProvider>
    </LanguageProvider>
  </StrictMode>,
);
