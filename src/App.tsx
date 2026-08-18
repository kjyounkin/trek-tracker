import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { LayoutDashboard, Map as MapIcon, List, Settings } from 'lucide-react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { Dashboard } from './components/Dashboard';
import { MapView } from './components/MapView';
import { Timeline } from './components/Timeline';
import { Settings as SettingsView } from './components/Settings';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 flex flex-col">
        {/* Header */}
        <header className="bg-emerald-800 text-white shadow-md">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <h1 className="text-xl font-bold flex items-center gap-2">
              Trek Tracker <span className="text-emerald-300 text-sm font-normal hidden sm:inline">| To Mount Doom</span>
            </h1>
            
            <div className="flex items-center gap-4">
              <SignedIn>
                <nav className="flex space-x-1">
                  <NavLink 
                    to="/" 
                    className={({isActive}) => `flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-emerald-900 text-white' : 'text-emerald-100 hover:bg-emerald-700'}`}
                  >
                    <LayoutDashboard size={18} />
                    <span className="hidden sm:inline">Dashboard</span>
                  </NavLink>
                  <NavLink 
                    to="/map" 
                    className={({isActive}) => `flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-emerald-900 text-white' : 'text-emerald-100 hover:bg-emerald-700'}`}
                  >
                    <MapIcon size={18} />
                    <span className="hidden sm:inline">Map</span>
                  </NavLink>
                  <NavLink 
                    to="/timeline" 
                    className={({isActive}) => `flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-emerald-900 text-white' : 'text-emerald-100 hover:bg-emerald-700'}`}
                  >
                    <List size={18} />
                    <span className="hidden sm:inline">Timeline</span>
                  </NavLink>
                  <NavLink 
                    to="/settings" 
                    className={({isActive}) => `flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-emerald-900 text-white' : 'text-emerald-100 hover:bg-emerald-700'}`}
                  >
                    <Settings size={18} />
                  </NavLink>
                </nav>
                <div className="ml-2 pl-4 border-l border-emerald-700">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 max-w-6xl w-full mx-auto p-4 flex flex-col">
          <SignedIn>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/map" element={<MapView />} />
              <Route path="/timeline" element={<Timeline />} />
              <Route path="/settings" element={<SettingsView />} />
            </Routes>
          </SignedIn>
          <SignedOut>
            <div className="flex-1 flex flex-col items-center justify-center text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Track Your Journey to Mount Doom</h2>
              <p className="text-lg text-slate-600 mb-8">
                Log your daily steps, convert them to miles, and see your progress on the map of Middle Earth. 
                Sign in to start tracking!
              </p>
              <SignInButton mode="modal">
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl text-lg font-bold transition-colors shadow-sm">
                  Get Started
                </button>
              </SignInButton>
            </div>
          </SignedOut>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
