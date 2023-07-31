import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Game } from './src/Game';

const rootElementId = 'home';
const rootElement = document.getElementById(rootElementId);
if (!rootElement) {
  throw new Error(`Could not find root element with id "${rootElementId}"`);
}

const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Game />
  </StrictMode>,
);
