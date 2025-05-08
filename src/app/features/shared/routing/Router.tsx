import React, { Suspense } from "react"
import { Routes, Route } from "react-router-dom"

import routes from "app/config/routes"
import ProtectedRoute from "./components/ProtectedRoute"
import NotFoundPage from "../components/pages/NotFoundPage"
import CenteredSpinner from "app/features/shared/components/atoms/CenteredSpinner/CenteredSpinner"

const allowList = /^\/login|^\/authentication\/|^\/auth/

const Router: React.FC = () => (
  <Suspense fallback={<CenteredSpinner explanation="Even geduld…" size={60} />}>
    <Routes>
      {Object.entries(routes).map(([path, Page]) => {
        const isPublic = allowList.test(path)
        const element = isPublic ? <Page /> : <ProtectedRoute page={Page} />

        return <Route key={path} path={path} element={element} />
      })}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Suspense>
)

export default Router
