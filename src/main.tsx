import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Amplify } from 'aws-amplify';
import outputs from '../amplify_outputs.json';

// Log to help us debug in the browser console
console.log('App Started. Config data:', outputs);

try {
  // Only attempt configuration if we have valid data
  if (outputs && Object.keys(outputs).length > 0) {
    Amplify.configure(outputs);
  }
} catch (error) {
  console.error('Amplify config error:', error);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
