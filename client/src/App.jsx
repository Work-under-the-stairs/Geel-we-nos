import React from 'react'
import {Toaster} from 'react-hot-toast'
import { Navigate, Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Category from './pages/Category'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import ArticleDetail from './pages/ArticleDetail'
import AdminDashboard from './pages/AdminDashboard'
import AddArticle from './pages/AddArticle'


const App = () => {
  const userData = true; // يمكنكِ لاحقاً ربط هذه القيمة بحالة تسجيل الدخول الحقيقية (Context أو Redux)

  return (
    <>
      {/* إعداد الـ Toaster ليظهر في الأعلى بشكل جمالي */}
      <Toaster position="top-center" reverseOrder={false} />
      
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={userData? <Layout/> : <Login/>} >
          <Route index element={<Home/>}/>
          <Route path="/:category" element={<Category/>} />
          <Route path="/news/:id" element={<ArticleDetail/>}/>
        </Route>
        <Route path="/admin" element={<AdminDashboard/>} />
        <Route path="/add/article" element={<AddArticle/>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;