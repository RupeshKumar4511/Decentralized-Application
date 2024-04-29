import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { CrowdFundingProvider } from './context/CrowdFunding.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <CrowdFundingProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </CrowdFundingProvider>
)
