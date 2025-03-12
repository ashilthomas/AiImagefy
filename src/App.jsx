import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './Layout/MainLayout'
import Home from './pages/Home'
import Result from './pages/Result'
import BuyCredit from './pages/BuyCredit'

import 'react-toastify/dist/ReactToastify.css';

function App() {

  const router = createBrowserRouter([

    {
      element: <MainLayout/>,
      children: [
        { path: "/", element: <Home /> },
        { path: "/result", element: <Result /> },
        { path: "/buyCredit", element: <BuyCredit /> },
      ],
    },

  ])
  return (
    
  
    <RouterProvider router={router} />

  )
}

export default App
