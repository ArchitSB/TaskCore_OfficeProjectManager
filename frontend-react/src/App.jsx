import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from './utils/constants';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Projects from './pages/Projects';

import { AppLayout } from './components/layout/AppLayout';

function App() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.SIGN_IN} replace />} />
      <Route path={ROUTES.SIGN_IN} element={<SignIn />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
          <Route path={ROUTES.TASKS} element={<Tasks />} />
          <Route path={ROUTES.PROJECTS} element={<Projects />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to={ROUTES.SIGN_IN} replace />} />
    </Routes>
  );
}

export default App;
