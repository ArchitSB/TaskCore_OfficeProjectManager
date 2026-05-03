import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../utils/constants';

function SignIn() {
  return (
    <div className="flex min-h-screen">
      {/* Left Side: Branding & Value Prop */}
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
            Designed for high-density information environments. Maintain a quiet command over complex workflows with a system built for technical precision.
          </p>
          <div className="grid grid-cols-2 gap-lg pt-xl border-t border-surface-container-high">
            <div>
              <span className="block font-label-caps text-label-caps text-secondary mb-unit uppercase">Performance</span>
              <span className="block font-h3 text-h3 text-on-surface">Sub-100ms latency</span>
            </div>
            <div>
              <span className="block font-label-caps text-label-caps text-secondary mb-unit uppercase">Security</span>
              <span className="block font-h3 text-h3 text-on-surface">Enterprise Tier SSO</span>
            </div>
          </div>
        </div>
        <div className="relative z-10 flex items-center gap-sm opacity-60">
          <span className="font-label-caps text-label-caps text-secondary">TRUSTED BY TEAMS AT</span>
          <div className="h-px w-12 bg-surface-container-high"></div>
          <span className="font-code text-code text-secondary">CORE_INFRA // DATA_LABS // SYST_ARCH</span>
        </div>
        {/* Subtle background texture using simple pattern, no glassmorphism */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, #2A3441 1px, transparent 0)", backgroundSize: "40px 40px" }}></div>
          <img className="absolute bottom-0 right-0 w-3/4 grayscale mix-blend-overlay opacity-30 translate-y-1/4 translate-x-1/4" alt="Server room" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4ZyhQwMaHi8Ydf6Ttr6MD-kmGA-bejW13MwXVEB25S8dFsf2GcVKAOVdvLJDEc7EKSHlF_wkDpsejStYxFCFHZ9u68LTmxAJoQCMnE0Q2iIkxe6EM8qR7v4QHxhUbkNIMVS4vqhnURnLS7ngNH_R4M8-fWPaeMyluojtihHrY5cE_717HzSoqW3d6_tl9vpt3BhuWhCJwqpDdHdRxjK2JaYv5PJJLwwKz2QOrID4Qqll4Qm6D38Ybre3k3J6QGNfK4-wsV2y2SQ" />
        </div>
      </section>
      {/* Right Side: Sign-In Form */}
      <main className="w-full lg:w-1/2 flex flex-col items-center justify-center p-xl bg-surface">
        <div className="w-full max-w-sm space-y-xl">
          <div className="text-center lg:text-left">
            <h2 className="font-h2 text-h2 text-on-surface mb-xs">Sign in to TaskCore</h2>
            <p className="font-body-md text-body-md text-secondary">Enter your credentials to access your workspace.</p>
          </div>
          <form className="space-y-md">
            <div className="space-y-xs">
              <label className="font-label-caps text-label-caps text-on-surface-variant uppercase" htmlFor="email">Email Address</label>
              <input className="w-full bg-surface-container-lowest border border-surface-container-high rounded-lg px-md py-sm font-body-md text-on-surface placeholder:text-secondary focus:outline-none focus:border-primary-container transition-colors" id="email" placeholder="name@company.com" type="email" />
            </div>
            <div className="space-y-xs">
              <div className="flex justify-between items-center">
                <label className="font-label-caps text-label-caps text-on-surface-variant uppercase" htmlFor="password">Password</label>
                <a className="font-label-caps text-label-caps text-primary-container hover:underline" href="#">Forgot?</a>
              </div>
              <input className="w-full bg-surface-container-lowest border border-surface-container-high rounded-lg px-md py-sm font-body-md text-on-surface placeholder:text-secondary focus:outline-none focus:border-primary-container transition-colors" id="password" placeholder="••••••••" type="password" />
            </div>
            <div className="flex items-center gap-sm">
              <input className="w-4 h-4 rounded-sm border-surface-container-high bg-surface-container-lowest text-primary-container focus:ring-0" id="remember" type="checkbox" />
              <label className="font-body-md text-body-md text-secondary select-none" htmlFor="remember">Stay signed in for 30 days</label>
            </div>
            <Link to={ROUTES.DASHBOARD} className="w-full py-md px-lg bg-primary-container text-on-primary-fixed font-h3 text-h3 rounded-lg hover:brightness-110 active:scale-[0.98] transition-all duration-200 block text-center mt-4">
              Sign In
            </Link>
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-surface-container-high"></span>
            </div>
            <div className="relative flex justify-center text-label-caps">
              <span className="bg-surface px-md text-secondary uppercase font-label-caps">Or continue with</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-md">
            <button className="flex items-center justify-center gap-sm py-sm border border-surface-container-high rounded-lg hover:bg-surface-container-high transition-colors">
              <img className="w-5 h-5 grayscale" alt="Google logo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnCtnNl4rRBjb6wX1CdGAK3I2Aj3jQxf_7yxNIE5JrdSKlHD45dqYk6Xx-Eihciemlpfr6lAN2GhLAVje_I1wKShw8LtzNDXjgegfA8lYBN_uuiKhj0V0bLQHIMUFX178ZMSOoEuJu9dtNbjIwE7jxG0aCEjGuW2wGzwR89TchUeSLPbv0DE9HFMuqXvflteNGv5HsKGxn0Uy_y4Wz4Qsqn-1rcaUM89cp5PIj4E85lJi9m_E6kEpq7bAUkz8i6CqCRxn0kGOT_w" />
              <span className="font-body-md text-on-surface">Google</span>
            </button>
            <button className="flex items-center justify-center gap-sm py-sm border border-surface-container-high rounded-lg hover:bg-surface-container-high transition-colors">
              <span className="material-symbols-outlined text-xl">terminal</span>
              <span className="font-body-md text-on-surface">SSO</span>
            </button>
          </div>
          <p className="text-center font-body-md text-body-md text-secondary">
            Don't have an account?
            <a className="text-primary-container font-semibold hover:underline ml-1" href="#">Start free trial</a>
          </p>
        </div>
        {/* Footer for Form Side */}
        <footer className="absolute bottom-xl w-full max-w-sm lg:max-w-none lg:w-auto px-xl flex flex-wrap justify-center gap-lg">
          <a className="font-label-caps text-label-caps text-secondary hover:text-on-surface transition-colors" href="#">Privacy Policy</a>
          <a className="font-label-caps text-label-caps text-secondary hover:text-on-surface transition-colors" href="#">Terms of Service</a>
          <a className="font-label-caps text-label-caps text-secondary hover:text-on-surface transition-colors" href="#">System Status</a>
        </footer>
      </main>
    </div>
  );
}

export default SignIn;
