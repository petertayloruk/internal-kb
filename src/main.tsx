import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Amplify } from 'aws-amplify';
import outputs from '../amplify_outputs.json';

// Defensive configuration to prevent the "Amplify has not been configured" crash
try {
  if (outputs && Object.keys(outputs).length > 0) {
    Amplify.configure(outputs);
  } else {
    console.warn("Amplify outputs are empty. Waiting for backend sync...");
  }
} catch (e) {
  console.error("Configuration error", e);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
