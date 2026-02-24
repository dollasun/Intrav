import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from './layouts/AppShell';
import { Dashboard } from './pages/Dashboard';
import { EnvironmentalModule } from './pages/Environmental';
import { SocialModule } from './pages/Social';
import { GovernanceModule } from './pages/Governance';
import { Branches } from './pages/Branches';
import { ReportingPeriods } from './pages/ReportingPeriods';
import { Reviews } from './pages/Reviews';
import { Verification } from './pages/Verification';
import { AuditLogs } from './pages/AuditLogs';
import { LandingPage } from './pages/LandingPage';
import { useAppStore } from './data/mockData';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const userRole = useAppStore((state) => state.userRole);
  if (!userRole) {
    return <Navigate to="/landing" replace />;
  }
  return <>{children}</>;
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/landing" element={<LandingPage />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <AppShell>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/environmental" element={<EnvironmentalModule />} />
                  <Route path="/social" element={<SocialModule />} />
                  <Route path="/governance" element={<GovernanceModule />} />
                  <Route path="/branches" element={<Branches />} />
                  <Route path="/periods" element={<ReportingPeriods />} />
                  <Route path="/reviews" element={<Reviews />} />
                  <Route path="/verification" element={<Verification />} />
                  <Route path="/audit-logs" element={<AuditLogs />} />
                  <Route path="/settings" element={<div className="p-8 text-slate-400 text-center">Settings Page Placeholder</div>} />
                </Routes>
              </AppShell>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
