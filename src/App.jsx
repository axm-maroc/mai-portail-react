import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { AuthProvider, useAuth } from '@/contexts/AuthContext'
import { NotificationProvider } from '@/contexts/NotificationContext'

// Layout Components
import { AppLayout } from '@/components/layout/AppLayout'
import { LoginPage } from '@/components/auth/LoginPage'

// Pages
import { Dashboard } from '@/components/pages/Dashboard'
import { Souscriptions } from '@/components/pages/Souscriptions'
import { Conventions } from '@/components/pages/Conventions'
import { Facturation } from '@/components/pages/Facturation'
import { Attestations } from '@/components/pages/Attestations'
import { Restitutions } from '@/components/pages/Restitutions'
import { EtatCP } from '@/components/pages/EtatCP'

import './App.css'

// Protected Route Component
function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth()
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }
  
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

// Main App Content
function AppContent() {
  const { isAuthenticated } = useAuth()

  return (
    <Routes>
      <Route 
        path="/login" 
        element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />} 
      />
      <Route path="/*" element={
        <ProtectedRoute>
          <AppLayout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/souscriptions/*" element={<Souscriptions />} />
              <Route path="/conventions/*" element={<Conventions />} />
              <Route path="/facturation/*" element={<Facturation />} />
              <Route path="/attestations" element={<Attestations />} />
              <Route path="/restitutions" element={<Restitutions />} />
              <Route path="/etat-cp" element={<EtatCP />} />
            </Routes>
          </AppLayout>
        </ProtectedRoute>
      } />
    </Routes>
  )
}

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="portail-theme">
      <AuthProvider>
        <NotificationProvider>
          <Router>
            <div className="min-h-screen bg-background">
              <AppContent />
              <Toaster />
            </div>
          </Router>
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
