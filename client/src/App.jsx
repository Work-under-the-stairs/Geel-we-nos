import React from 'react'
import {Toaster} from 'react-hot-toast'
import { Navigate, Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Category from './pages/Category'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import News from './pages/News'

const App = () => {
  const userData = true;
  return (
    <>
      <Toaster position="top-center" reverseOrder={true} />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/" element={userData? <Layout/> : <Login/>} >
          <Route index element={<Home/>}/>
          <Route path="/:category" element={<Category/>} />
          <Route path="/news/:id" element={<News/>}/>

        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App