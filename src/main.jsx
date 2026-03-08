import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { inject } from '@vercel/analytics'
import posthog from 'posthog-js'
import './index.css'
import App from './App.jsx'

posthog.init('YOUR_PROJECT_TOKEN', {
  api_host: 'https://us.i.posthog.com',
  capture_pageview: true,   // page visits only
  capture_pageleave: false,
  autocapture: false,       // disabled to conserve event quota
})

inject()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
