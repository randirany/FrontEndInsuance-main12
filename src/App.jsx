import { useState } from 'react'
import router from './routes/router.jsx'
import './App.css'
import { BrowserRouter, RouterProvider } from 'react-router-dom'
import UserContextProvider from './context/User.jsx'
import './i18n.js'

function App() {

 
  return (
    <>
      <UserContextProvider>
        <RouterProvider router={router} />
      </UserContextProvider>

    </>
  )
}

export default App
