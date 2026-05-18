import React, { useState } from 'react'
import { initializeApp } from 'firebase/app'
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

// 🔧 Replace with your Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      // ✅ Redirect or update app state here
    } catch (err) {
      setError(friendlyError(err.code))
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = async () => {
    setError('')
    setLoading(true)
    try {
      await signInWithPopup(auth, googleProvider)
      // ✅ Redirect or update app state here
    } catch (err) {
      setError(friendlyError(err.code))
    } finally {
      setLoading(false)
    }
  }

  const friendlyError = (code) => {
    const map = {
      'auth/user-not-found': 'No account found with this email.',
      'auth/wrong-password': 'Incorrect password. Please try again.',
      'auth/invalid-email': 'Please enter a valid email address.',
      'auth/too-many-requests': 'Too many attempts. Try again later.',
      'auth/popup-closed-by-user': 'Sign-in popup was closed.',
    }
    return map[code] || 'Something went wrong. Please try again.'
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .auth-root {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          font-family: 'DM Sans', sans-serif;
          background: #0d0d0d;
        }

        /* LEFT PANEL */
        .auth-panel-left {
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 48px;
          background: #111;
        }
        .auth-panel-left::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 50% at 30% 70%, rgba(180,140,90,0.18) 0%, transparent 70%),
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 39px,
              rgba(255,255,255,0.03) 39px,
              rgba(255,255,255,0.03) 40px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 39px,
              rgba(255,255,255,0.03) 39px,
              rgba(255,255,255,0.03) 40px
            );
          pointer-events: none;
        }
        .auth-brand {
          position: relative;
          z-index: 1;
        }
        .auth-brand-wordmark {
          font-family: 'Playfair Display', serif;
          font-size: 28px;
          font-weight: 700;
          color: #f5efe6;
          letter-spacing: -0.5px;
        }
        .auth-brand-rule {
          display: block;
          width: 32px;
          height: 2px;
          background: #c9a96e;
          margin-top: 10px;
        }
        .auth-panel-quote {
          position: relative;
          z-index: 1;
        }
        .auth-panel-quote blockquote {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-size: 26px;
          line-height: 1.45;
          color: #f5efe6;
          max-width: 380px;
        }
        .auth-panel-quote cite {
          display: block;
          margin-top: 20px;
          font-family: 'DM Sans', sans-serif;
          font-style: normal;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #c9a96e;
        }
        .auth-edition-tag {
          position: relative;
          z-index: 1;
          font-size: 11px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: rgba(245,239,230,0.35);
          font-weight: 400;
        }

        /* RIGHT PANEL */
        .auth-panel-right {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 48px 56px;
          background: #faf8f5;
        }
        .auth-form-box {
          width: 100%;
          max-width: 400px;
          animation: fadeUp 0.5s ease both;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .auth-form-heading {
          font-family: 'Playfair Display', serif;
          font-size: 36px;
          font-weight: 700;
          color: #111;
          letter-spacing: -1px;
          line-height: 1.15;
        }
        .auth-form-subheading {
          margin-top: 8px;
          font-size: 14px;
          font-weight: 300;
          color: #888;
          line-height: 1.6;
        }
        .auth-form-subheading a {
          color: #c9a96e;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
        }
        .auth-form-subheading a:hover { color: #a07c45; }

        /* Google button */
        .auth-google-btn {
          margin-top: 28px;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 13px 20px;
          background: #fff;
          border: 1.5px solid #e0dbd4;
          border-radius: 6px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: #333;
          cursor: pointer;
          transition: border-color 0.2s, box-shadow 0.2s, transform 0.15s;
        }
        .auth-google-btn:hover {
          border-color: #c9a96e;
          box-shadow: 0 2px 12px rgba(201,169,110,0.15);
          transform: translateY(-1px);
        }
        .auth-google-btn svg { flex-shrink: 0; }

        /* Divider */
        .auth-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 24px 0;
        }
        .auth-divider-line {
          flex: 1;
          height: 1px;
          background: #e8e3dc;
        }
        .auth-divider-label {
          font-size: 11px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #bbb;
          font-weight: 400;
        }

        /* Fields */
        .auth-field {
          margin-bottom: 16px;
        }
        .auth-field label {
          display: block;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #888;
          margin-bottom: 7px;
        }
        .auth-field input {
          width: 100%;
          padding: 13px 16px;
          background: #fff;
          border: 1.5px solid #e0dbd4;
          border-radius: 6px;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 400;
          color: #111;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .auth-field input:focus {
          border-color: #c9a96e;
          box-shadow: 0 0 0 3px rgba(201,169,110,0.12);
        }

        /* Forgot */
        .auth-forgot {
          display: flex;
          justify-content: flex-end;
          margin-top: -8px;
          margin-bottom: 20px;
        }
        .auth-forgot a {
          font-size: 12px;
          color: #aaa;
          text-decoration: none;
          transition: color 0.2s;
        }
        .auth-forgot a:hover { color: #c9a96e; }

        /* Submit */
        .auth-submit-btn {
          width: 100%;
          padding: 14px 20px;
          background: #111;
          border: none;
          border-radius: 6px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #faf8f5;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
          position: relative;
          overflow: hidden;
        }
        .auth-submit-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(201,169,110,0.25) 0%, transparent 60%);
          pointer-events: none;
        }
        .auth-submit-btn:hover:not(:disabled) {
          background: #222;
          transform: translateY(-1px);
          box-shadow: 0 4px 16px rgba(0,0,0,0.25);
        }
        .auth-submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* Error */
        .auth-error {
          margin-top: 16px;
          padding: 12px 16px;
          background: rgba(200,60,60,0.07);
          border-left: 3px solid #c83c3c;
          border-radius: 4px;
          font-size: 13px;
          color: #c83c3c;
          line-height: 1.5;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .auth-root { grid-template-columns: 1fr; }
          .auth-panel-left { display: none; }
          .auth-panel-right { padding: 40px 28px; }
        }
      `}</style>

      <div className="auth-root">
        {/* Left decorative panel */}
        <div className="auth-panel-left">
          <div className="auth-brand">
            <div className="auth-brand-wordmark">The Chronicle</div>
            <span className="auth-brand-rule" />
          </div>

          <div className="auth-panel-quote">
            <blockquote>
              "The press is the best instrument for enlightening the mind of man."
            </blockquote>
            <cite>— Thomas Jefferson</cite>
          </div>

          <div className="auth-edition-tag">Morning Edition · Est. 2024</div>
        </div>

        {/* Right form panel */}
        <div className="auth-panel-right">
          <div className="auth-form-box">
            <h1 className="auth-form-heading">Welcome back.</h1>
            <p className="auth-form-subheading">
              Don't have an account?{' '}
              <a href="/register">Create one free</a>
            </p>

            {/* Google */}
            <button className="auth-google-btn" onClick={handleGoogle} disabled={loading} type="button">
              <svg width="18" height="18" viewBox="0 0 18 18">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/>
                <path d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332Z" fill="#FBBC05"/>
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

            <div className="auth-divider">
              <div className="auth-divider-line" />
              <span className="auth-divider-label">or</span>
              <div className="auth-divider-line" />
            </div>

            <form onSubmit={handleLogin}>
              <div className="auth-field">
                <label htmlFor="email">Email address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>

              <div className="auth-field">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
              </div>

              <div className="auth-forgot">
                <a href="/forgot-password">Forgot password?</a>
              </div>

              <button className="auth-submit-btn" type="submit" disabled={loading}>
                {loading ? 'Signing in…' : 'Sign in'}
              </button>

              {error && <div className="auth-error">{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
