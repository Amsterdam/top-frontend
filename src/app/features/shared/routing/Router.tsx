import React from "react"
import { Routes, Route } from "react-router-dom"

import routes from "app/config/routes"
import ProtectedRoute from "./components/ProtectedRoute"
import NotFoundPage from "../components/pages/NotFoundPage"

const allowList = /^\/login|^\/authentication\/|^\/auth/

const Router: React.FC = () => (
  <Routes>
    {
      // Pages that do NOT match the allowList are protected
      Object
        .entries(routes)
        .filter(([ path ]) => !path.match(allowList))
        .map(([ path, Page ]) => (
          // <ProtectedRoute page={ Page } key={ path } path={ path } />
          <Route
            key={path}
            path={path}
            element={<ProtectedRoute page={Page} />}
          />
        ))
    }
    {
      // Pages that do match the allowList are NOT protected
      Object
        .entries(routes)
        .filter(([ path ]) => path.match(allowList))
        .map(([ path, Page ]) => (
          // <Page key={ path } path={ path } />
          <Route key={path} path={path} element={<Page />} />
        ))
    }
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
)

export default Router
