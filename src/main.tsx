import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// design/ is read-only and re-copied wholesale from the design tooling, so tokens are
// imported IN PLACE — token updates flow with zero copy step (docs/design-contract.md).
import '../design/tokens.css';
import './styles/global.css';
import App from './App.tsx';

const root = document.getElementById('root');
if (!root) throw new Error('Root element #root is missing from index.html');

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
