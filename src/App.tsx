import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { LayoutDashboard, Map as MapIcon, List } from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { MapView } from './components/MapView';
import { Timeline } from './components/Timeline';

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
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 max-w-6xl w-full mx-auto p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/map" element={<MapView />} />
            <Route path="/timeline" element={<Timeline />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
