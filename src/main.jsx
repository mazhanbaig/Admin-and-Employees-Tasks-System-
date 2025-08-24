import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.jsx'
import { TaskProvider } from "../src/context/TaskContext.jsx";



createRoot(document.getElementById('root')).render(
  // <StrictMode>
      <TaskProvider>
      <App />
    </TaskProvider>
  // </StrictMode>,
)
