import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App.jsx';

// Used at build time by scripts/prerender.js to bake the page into dist/index.html.
export function render() {
  return renderToString(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
