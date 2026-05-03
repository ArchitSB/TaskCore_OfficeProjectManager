import React, { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { loginRequest, signupRequest } from '../api/auth.api';
import { useAuth } from '../context/AuthContext';
import { getApiErrorMessage } from '../utils/error';
import { ROUTES } from '../utils/constants';

function SignIn() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const payload = mode === 'signup'
        ? { name: form.name, email: form.email, password: form.password }
        : { email: form.email, password: form.password };

      const response = mode === 'signup'
        ? await signupRequest(payload)
        : await loginRequest(payload);

      login({ token: response.token, user: response.user });

      const nextPath = location.state?.from?.pathname || ROUTES.DASHBOARD;
      navigate(nextPath, { replace: true });
    } catch (apiError) {
      setError(getApiErrorMessage(apiError, 'Authentication failed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <section className="hidden lg:flex lg:w-1/2 flex-col justify-between p-xl bg-surface-container-lowest relative overflow-hidden border-r border-surface-container-high">
        <div className="relative z-10">
          <div className="flex items-center gap-sm">
            <span className="material-symbols-outlined text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>task_alt</span>
            <span className="font-h2 text-h2 tracking-tight text-on-surface">TaskCore</span>
          </div>
        </div>
        <div className="relative z-10 max-w-lg">
          <h1 className="font-h1 text-[48px] leading-[1.1] mb-md text-on-surface font-extrabold tracking-tighter">
            Engineering-grade task management.
          </h1>
          <p className="font-body-lg text-body-lg text-secondary mb-xl leading-relaxed">
            Designed for high-density information environments.
          </p>
        </div>
        <div className="relative z-10 flex items-center gap-sm opacity-60">
          <span className="font-label-caps text-label-caps text-secondary">TRUSTED BY TEAMS AT</span>
          <div className="h-px w-12 bg-surface-container-high"></div>
          <span className="font-code text-code text-secondary">CORE_INFRA // DATA_LABS // SYST_ARCH</span>
        </div>
      </section>

      <main className="w-full lg:w-1/2 flex flex-col items-center justify-center p-xl bg-surface">
        <div className="w-full max-w-sm space-y-xl">
          <div className="text-center lg:text-left">
            <h2 className="font-h2 text-h2 text-on-surface mb-xs">
              {mode === 'signup' ? 'Create your TaskCore account' : 'Sign in to TaskCore'}
            </h2>
            <p className="font-body-md text-body-md text-secondary">
              {mode === 'signup' ? 'Create credentials to start your workspace.' : 'Enter your credentials to access your workspace.'}
            </p>
          </div>

          {error && (
            <div className="rounded border border-red-500/40 bg-red-900/20 text-red-300 text-sm px-md py-sm">
              {error}
            </div>
          )}

          <form className="space-y-md" onSubmit={onSubmit}>
            {mode === 'signup' && (
              <div className="space-y-xs">
                <label className="font-label-caps text-label-caps text-on-surface-variant uppercase" htmlFor="name">Full Name</label>
                <input
                  className="w-full bg-surface-container-lowest border border-surface-container-high rounded-lg px-md py-sm font-body-md text-on-surface placeholder:text-secondary focus:outline-none focus:border-primary-container transition-colors"
                  id="name"
                  name="name"
                  placeholder="Your name"
                  type="text"
                  value={form.name}
                  onChange={onChange}
                  required
                />
              </div>
            )}

            <div className="space-y-xs">
              <label className="font-label-caps text-label-caps text-on-surface-variant uppercase" htmlFor="email">Email Address</label>
              <input
                className="w-full bg-surface-container-lowest border border-surface-container-high rounded-lg px-md py-sm font-body-md text-on-surface placeholder:text-secondary focus:outline-none focus:border-primary-container transition-colors"
                id="email"
                name="email"
                placeholder="name@company.com"
                type="email"
                value={form.email}
                onChange={onChange}
                required
              />
            </div>

            <div className="space-y-xs">
              <label className="font-label-caps text-label-caps text-on-surface-variant uppercase" htmlFor="password">Password</label>
              <input
                className="w-full bg-surface-container-lowest border border-surface-container-high rounded-lg px-md py-sm font-body-md text-on-surface placeholder:text-secondary focus:outline-none focus:border-primary-container transition-colors"
                id="password"
                name="password"
                placeholder="••••••••"
                type="password"
                value={form.password}
                onChange={onChange}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-md px-lg bg-primary-container text-on-primary-fixed font-h3 text-h3 rounded-lg hover:brightness-110 active:scale-[0.98] transition-all duration-200 block text-center mt-4 disabled:opacity-60"
            >
              {loading ? 'Please wait...' : mode === 'signup' ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          <p className="text-center font-body-md text-body-md text-secondary">
            {mode === 'signup' ? 'Already have an account?' : "Don't have an account?"}
            <button
              type="button"
              onClick={() => {
                setMode((prev) => (prev === 'login' ? 'signup' : 'login'));
                setError('');
              }}
              className="text-primary-container font-semibold hover:underline ml-1"
            >
              {mode === 'signup' ? 'Sign in' : 'Create one'}
            </button>
          </p>
        </div>
      </main>
    </div>
  );
}

export default SignIn;
