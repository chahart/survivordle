import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { inject } from '@vercel/analytics'
import posthog from 'posthog-js'
import './index.css'
import App from './App.jsx'

posthog.init('YOUR_PROJECT_TOKEN', {
  api_host: 'https://us.i.posthog.com',
  capture_pageview: true,    // powers Web Analytics dashboard
  capture_pageleave: true,   // powers bounce rate + session duration in Web Analytics
  autocapture: false,        // disabled — was generating ~160K events/day from clicks/keystrokes
})

inject()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
