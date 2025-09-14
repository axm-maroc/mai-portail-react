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
import { NouvellesouscriptionPage } from '@/components/pages/NouvellesouscriptionPage'
import { Conventions } from '@/components/pages/Conventions'
import FacturationSimple from '@/components/pages/FacturationSimple'
import AttestationsSimple from '@/components/pages/AttestationsSimple'
import RestitutionsSimple from '@/components/pages/RestitutionsSimple'
import SuiviSalaries from '@/components/pages/SuiviSalaries'
import EtatCP from '@/components/pages/EtatCP'

// Nouvelles pages pour les fonctionnalités
import NouveauProtocole from '@/components/pages/NouveauProtocole'
import NouveauSalarie from '@/components/pages/NouveauSalarie'
import NouveauPaiement from '@/components/pages/NouveauPaiement'
import NouvelleAttestation from '@/components/pages/NouvelleAttestation'
import NouvelleRestitution from '@/components/pages/NouvelleRestitution'
import NouveauCP from '@/components/pages/NouveauCP'

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
              <Route path="/souscriptions/create" element={<NouvellesouscriptionPage />} />
              <Route path="/conventions/*" element={<Conventions />} />
              <Route path="/facturation" element={<FacturationSimple />} />
              <Route path="/facturation/impayes" element={<FacturationSimple />} />
              <Route path="/facturation/factures" element={<FacturationSimple />} />
              <Route path="/facturation/reglements" element={<FacturationSimple />} />
              <Route path="/attestations" element={<AttestationsSimple />} />
              <Route path="/restitutions" element={<RestitutionsSimple />} />
              <Route path="/suivi-salaries" element={<SuiviSalaries />} />
              <Route path="/etat-cp" element={<EtatCP />} />
              
              {/* Nouvelles routes pour les fonctionnalités */}
              <Route path="/nouveau-protocole" element={<NouveauProtocole />} />
              <Route path="/nouveau-salarie" element={<NouveauSalarie />} />
              <Route path="/nouveau-paiement" element={<NouveauPaiement />} />
              <Route path="/nouvelle-attestation" element={<NouvelleAttestation />} />
              <Route path="/nouvelle-restitution" element={<NouvelleRestitution />} />
              <Route path="/nouveau-cp" element={<NouveauCP />} />
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
