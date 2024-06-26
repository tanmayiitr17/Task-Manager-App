import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { store, persistor } from './redux/store.js';
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Provider component to provide Redux store */}
    <Provider store={store}>
      {/* PersistGate component to ensure persistence of Redux store */}
      <PersistGate loading={null} persistor={persistor}>
        {/* Toaster component for displaying notifications */}
        <Toaster position="top-right" reverseOrder={false} />
        {/* App component */}
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
