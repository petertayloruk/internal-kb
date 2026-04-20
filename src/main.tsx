import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Amplify } from 'aws-amplify';

// We fetch the configuration dynamically
import outputs from '../amplify_outputs.json';

// Log to console so we can see what is happening in your browser
console.log("Checking Amplify Configuration...", outputs);

if (outputs && (outputs.auth || outputs.data)) {
  Amplify.configure(outputs);
} else {
  console.error("CRITICAL ERROR: Configuration file is empty or missing data.");
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
