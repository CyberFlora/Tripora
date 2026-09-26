import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { MainLayout } from './layouts/MainLayout'
import { HomePage } from './pages/HomePage'
import { MyTripsPage } from './pages/MyTripsPage'
import { PlanPage } from './pages/PlanPage'
import { ProfilePage } from './pages/ProfilePage'
import { TripWorkspacePage } from './pages/TripWorkspacePage'
import { WhatIfPage } from './pages/WhatIfPage.tsx'
import { LicensePage } from './pages/LicensePage.tsx'
import { OperatorLoginPage } from './pages/OperatorLoginPage'
import { OperatorDashboardPage } from './pages/OperatorDashboardPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/plan" element={<PlanPage />} />
          <Route path="/my-trips" element={<MyTripsPage />} />
          <Route path="/what-if" element={<WhatIfPage />} />
          <Route path="/trip/:tripId" element={<TripWorkspacePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/license" element={<LicensePage />} />
          

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
         <Route
      path="/operator/login"
      element={<OperatorLoginPage />}
    />
    <Route path="/operator/dashboard" element={<OperatorDashboardPage />} />
      </Routes>
    </BrowserRouter>
  )
}