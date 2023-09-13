import React from 'react'
import ReactDOM from 'react-dom/client'
import ReactBasics from './react-basics'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ReactBasics label='This is the code quality repo' url='www.google.com' footerText='This is the footer'/>
  </React.StrictMode>
)