import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ROUTES } from './utils/constants';

// Pages
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Projects from './pages/Projects';

// Layout
import { AppLayout } from './components/layout/AppLayout';

function App() {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<SignIn />} />
      <Route path={ROUTES.SIGN_IN} element={<SignIn />} />

      {/* Authenticated Routes wrapped in AppLayout */}
      <Route element={<AppLayout />}>
        <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
        <Route path={ROUTES.TASKS} element={<Tasks />} />
        <Route path={ROUTES.PROJECTS} element={<Projects />} />
      </Route>
    </Routes>
  );
}

export default App;
