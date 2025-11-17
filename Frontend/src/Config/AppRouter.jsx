import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from '../Pages/Signup'
import Login from '../Pages/Login'
import Create from '../Pages/Create'

function AppRouter() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element ={<Signup />} />
      <Route path='/signup' element ={<Signup />} />
      <Route path='/login' element ={<Login />} />
      <Route path='/create' element ={<Create />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default AppRouter