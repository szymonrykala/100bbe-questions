import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { HashRouter} from 'react-router'
import { Toaster } from 'react-hot-toast';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <Toaster />
      <App/>
    </HashRouter>
  </StrictMode>,
)
