import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { NotificationProvider } from './context/NotificationContext.jsx'
import { CustomerProvider } from './context/CustomerContext.jsx'
import { Toaster } from 'react-hot-toast'
import { CartProvider } from './context/CartContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NotificationProvider>
      <CustomerProvider>
        <CartProvider>
          <App />
          <Toaster
            position="top-center"
            reverseOrder={false}
          />
        </CartProvider>
      </CustomerProvider>
    </NotificationProvider>
  </StrictMode>,
)
