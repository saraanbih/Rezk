import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import { AuthProvider } from './context/AuthProvider';
import { BrowserRouter } from "react-router";
import {CategoryProvider} from "./Context/CategoriesProvider.jsx";
createRoot(document.getElementById('root')).render(
  <CategoryProvider>
      <AuthProvider >
          <BrowserRouter>
              <StrictMode>
                  <App />
              </StrictMode>
          </BrowserRouter>
      </AuthProvider>
  </CategoryProvider>
)
