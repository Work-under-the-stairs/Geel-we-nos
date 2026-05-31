import React, { useEffect } from 'react'
import {Toaster} from 'react-hot-toast'
import { Navigate, Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import CrossMediaPage from './pages/CrossMediaPage'
import Login from './pages/Login'
import Category from './pages/Category'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import ArticleDetail from './pages/ArticleDetail'
import AdminDashboard from './pages/AdminDashboard'
import AddArticle from './pages/AddArticle'
import { isAuthenticated,isAdmin } from './utils/auth';
import EditArticle from './pages/EditArticle'
import ScrollToTop from './ScrollToTop'

const App = () => {
  const userData = isAuthenticated();

  useEffect(() => {
    const handleImageError = (e) => {
      if (e.target && e.target.tagName === 'IMG') {
        if (e.target.dataset.fallbackApplied) return;
        e.target.dataset.fallbackApplied = "true";

        e.target.classList.remove('object-cover');
        
        e.target.classList.add('bg-slate-100', 'object-contain', 'p-4', 'border', 'border-slate-200');
        e.target.src = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='3' width='18' height='18' rx='2' ry='2'/%3E%3Ccircle cx='9' cy='9' r='2'/%3E%3Cpath d='m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21'/%3E%3C/svg%3E";
      }
    };

    window.addEventListener('error', handleImageError, true);
    return () => window.removeEventListener('error', handleImageError, true);
  }, []);
  return (
    <>
      <ScrollToTop />
      <Toaster position="top-center" reverseOrder={false} />
      
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout/>} >
          <Route index element={<Home/>}/>
          <Route path="/:category" element={<Category/>} />
          <Route path="/news/:id" element={<ArticleDetail/>}/>
        </Route>
        <Route path="/admin" element={isAdmin() ? <AdminDashboard/> : <Navigate to="/" replace />} />
        <Route path="/add/article" element={isAdmin() ? <AddArticle/> : <Navigate to="/" replace />} />
        <Route path="/edit/article/:id" element={isAdmin() ? <EditArticle/> : <Navigate to="/" replace />} />
        <Route path="/cross-media" element={<CrossMediaPage/>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;