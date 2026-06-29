import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { NotificationProvider } from './context/NotificationContext.jsx'
import { CustomerProvider } from './context/CustomerContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NotificationProvider>
      <CustomerProvider>
        <App />
      </CustomerProvider>
    </NotificationProvider>
  </StrictMode>,
)
