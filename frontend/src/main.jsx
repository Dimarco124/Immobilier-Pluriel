import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/manrope/400.css'
import '@fontsource/manrope/500.css'
import '@fontsource/manrope/600.css'
import '@fontsource/manrope/700.css'
import '@fontsource/manrope/800.css'

import './index.css'
import './global-overrides.css'
import './styles/nature-landing.css'
import './styles/animations.css'
import './styles/inner-pages.css'
import './styles/home-sections.css'
import './styles/inner-experience.css'
import './styles/pages/detail-pages.css'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
