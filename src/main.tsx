import React from 'react'
import ReactDOM from 'react-dom/client'
import './output.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router.tsx'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
    {/* <h1>Aplicacion sin router</h1> */}
  </React.StrictMode>,
)

// Use contextBridge
window.ipcRenderer.on('main-process-message', (_event, message) => {
  console.log(message)
})
