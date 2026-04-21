import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Amplify } from 'aws-amplify';
import outputs from '../amplify_outputs.json';

console.log('Booting System...', outputs);

if (outputs && Object.keys(outputs).length > 0) {
  Amplify.configure(outputs);
}

// We render regardless, but the App.tsx now has better internal guards
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
