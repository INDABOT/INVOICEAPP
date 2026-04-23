import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // Import this
import App from './App.jsx'
import './index.css'
import { InvoiceProvider } from './context/InvoiceContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <InvoiceProvider>
        <App />
      </InvoiceProvider>
    </BrowserRouter>
  </React.StrictMode>,
)