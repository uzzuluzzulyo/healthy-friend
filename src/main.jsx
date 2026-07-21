import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { ColorModeProvider } from './hooks/color-mode-context.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ColorModeProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </ColorModeProvider>
  </StrictMode>,
)
