import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// 2. عمل Instance جديدة من الـ Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // إعدادات اختيارية ذكية: تمنع الـ React Query من إعادة الطلب تلقائياً أول ما تفتحي الشاشة (مريحة ف الـ Development)
      refetchOnWindowFocus: false, 
      retry: 1, // لو طلب فشل يعيد محاولة واحدة بس بدل 3
    },
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)