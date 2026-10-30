import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.css';

const container = document.getElementById('root');
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Production builds are prerendered (see scripts/prerender.js); dev is not.
if (container.hasChildNodes()) hydrateRoot(container, app);
else createRoot(container).render(app);
