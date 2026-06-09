import React, { useEffect } from 'react'
import toast, {Toaster} from 'react-hot-toast'
import { Navigate, Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import DoaaStory from './pages/crossmediastories/DoaaStory'
import AhmedStory from './pages/crossmediastories/AhmedStory'
import GhazalStory from './pages/crossmediastories/GhazalStory'
import HassanStory from './pages/crossmediastories/HassanStory'
import AdhamStory from './pages/crossmediastories/AdhamStory'
import CrossMediaPageGaza from './pages/CrossMediaPageGaza'
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
import CrossMediaArticle2 from './pages/CrossMediaArticle2'
import SearchPage from './pages/SearchPage'
import AboutUs from './pages/AboutUs'
import OurVision from './pages/OurVision'
import PublishingPolicy from './pages/PublishingPolicy'
import ContactUs from './pages/ContactUs'
const App = () => {
  
  return (
    <>
      <ScrollToTop />
      <Toaster position="top-center" reverseOrder={false} 
      toastOptions={{duration: 3000, limit: 3,onClick: (t) => toast.dismiss(t.id),
          style: {
            cursor: 'pointer',
          }, 
      }} />
      
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout/>} >
          <Route index element={<Home/>}/>
          <Route path="/:category" element={<Category/>} />
          <Route path="/news/:id" element={<ArticleDetail/>}/>
          <Route path="/search" element={<SearchPage/>} />
          <Route path="/about" element={<AboutUs/>} />
          <Route path="/vision" element={<OurVision/>} />
          <Route path="/publishing-policy" element={<PublishingPolicy/>} />
          <Route path="/contact" element={<ContactUs/>} />
        </Route>
        <Route path="/admin" element={isAdmin() ? <AdminDashboard/> : <Navigate to="/" replace />} />
        <Route path="/add/article" element={isAdmin() ? <AddArticle/> : <Navigate to="/" replace />} />
        <Route path="/edit/article/:id" element={isAdmin() ? <EditArticle/> : <Navigate to="/" replace />} />
        
        <Route path="/cross-media" element={<DoaaStory/>} />
        <Route path="/cross-media/ahmed" element={<AhmedStory/>} />
        <Route path="/cross-media/ghazal" element={<GhazalStory/>} />
        <Route path="/cross-media/hassan" element={<HassanStory/>} />
        <Route path="/cross-media/adham" element={<AdhamStory/>} />
        <Route path="/cross-media-initiatives" element={<CrossMediaArticle2/>} />

        <Route path="/cross-media-gaza" element={<CrossMediaPageGaza/>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;