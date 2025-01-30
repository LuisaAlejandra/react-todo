import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Auth from './Auth.tsx'
import { App } from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Auth />
  </React.StrictMode>,
)
