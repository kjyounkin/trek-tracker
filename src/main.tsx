import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import './index.css'
import App from './App.tsx'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  console.error("Missing Publishable Key. Please set VITE_CLERK_PUBLISHABLE_KEY in your .env file.")
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {PUBLISHABLE_KEY ? (
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <App />
      </ClerkProvider>
    ) : (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 max-w-md">
          <h1 className="text-xl font-bold text-red-600 mb-4">Missing Clerk Configuration</h1>
          <p className="text-slate-600 mb-4">
            You need to add your Clerk Publishable Key to use this app.
          </p>
          <ol className="text-sm text-left list-decimal pl-5 text-slate-700 space-y-2">
            <li>Create an account at <a href="https://clerk.com" className="text-emerald-600 hover:underline">clerk.com</a></li>
            <li>Create a new application</li>
            <li>Copy the Publishable Key</li>
            <li>Create a <code>.env</code> file in the root of this project and add: <br/><code className="bg-slate-100 px-1 py-0.5 rounded mt-1 block">VITE_CLERK_PUBLISHABLE_KEY=pk_test_...</code></li>
            <li>Restart the development server</li>
          </ol>
        </div>
      </div>
    )}
  </StrictMode>,
)
