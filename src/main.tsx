import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { LanguageProvider } from './Context/LanguageContext.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './Context/AuthContext.tsx'




// Create a client for the query
const queryclient = new QueryClient()



createRoot(document.getElementById('root')!).render(



  <QueryClientProvider client={queryclient}>

    <BrowserRouter>

      <AuthProvider>

        <LanguageProvider>

          <App />

        </LanguageProvider>

      </AuthProvider>

    </BrowserRouter>

  </QueryClientProvider >


)
