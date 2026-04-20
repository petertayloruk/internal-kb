import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Amplify } from 'aws-amplify';
import outputs from '../amplify_outputs.json';

// Defensive check: only configure if the file has data
if (outputs && Object.keys(outputs).length > 0) {
  Amplify.configure(outputs);
} else {
  console.error("CRITICAL: amplify_outputs.json is missing or empty.");
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
