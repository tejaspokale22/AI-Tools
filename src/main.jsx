import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

const router=createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
          path: "/text",
          element: <Text/>,
      },
      {
          path: "/image",
          element: <Image/>,
      },
  ],
  }
])

createRoot(document.getElementById('root')).render(
    <App />
)
