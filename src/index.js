import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/style.scss';
import '@fontsource/roboto'; 

export { default as Common } from './components/Common';
export { default as Main } from './components/Main';

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
      <App />
  </StrictMode>
);