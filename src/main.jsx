import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { inject } from '@vercel/analytics'
import posthog from 'posthog-js'
import './index.css'
import App from './App.jsx'

posthog.init('phc_7PzO3WwCKBw0pOeNTn9KbbU2DjD1wK6CwgLLD7X0uVt', {
  api_host: 'https://us.i.posthog.com',
  capture_pageview: true,   // auto-captures every page/route change
  capture_pageleave: true,  // captures when users navigate away
  autocapture: true,        // captures clicks and interactions automatically
})

inject()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
