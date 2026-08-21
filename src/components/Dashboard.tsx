import React, { useState } from 'react';
import { useJourney } from '../hooks/useJourney';
import { TOTAL_MILES } from '../data/milestones';
import { Footprints, Route } from 'lucide-react';

export function Dashboard() {
  const { entries, addEntry, deleteEntry, totalSteps, totalMiles, stepConversion } = useJourney();
  const [stepsInput, setStepsInput] = useState('');
  const [dateInput, setDateInput] = useState(() => {
    const now = new Date();
    return new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().split('T')[0];
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const steps = parseInt(stepsInput, 10);
    if (!isNaN(steps) && steps > 0) {
      addEntry(dateInput, steps);
      setStepsInput('');
    }
  };

  const progressPercent = Math.min((totalMiles / TOTAL_MILES) * 100, 100);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Route className="text-emerald-600" />
          Journey Progress
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
            <p className="text-sm text-slate-500 font-medium">Total Steps</p>
            <p className="text-3xl font-bold text-slate-800">{totalSteps.toLocaleString()}</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
            <p className="text-sm text-slate-500 font-medium">Total Miles</p>
            <p className="text-3xl font-bold text-slate-800">{totalMiles.toFixed(1)} / {TOTAL_MILES}</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
            <p className="text-sm text-slate-500 font-medium">Progress</p>
            <p className="text-3xl font-bold text-slate-800">{progressPercent.toFixed(1)}%</p>
          </div>
        </div>

        <div className="w-full bg-slate-200 rounded-full h-4 mb-2">
          <div 
            className="bg-emerald-500 h-4 rounded-full transition-all duration-1000"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        <p className="text-sm text-slate-500 text-right">{Math.max(0, TOTAL_MILES - totalMiles).toFixed(1)} miles remaining</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Footprints className="text-emerald-600" />
            Log Steps
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
              <input 
                type="date" 
                required
                value={dateInput}
                onChange={(e) => setDateInput(e.target.value)}
                className="w-full border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Steps</label>
              <input 
                type="number" 
                required
                min="1"
                placeholder="e.g. 5000"
                value={stepsInput}
                onChange={(e) => setStepsInput(e.target.value)}
                className="w-full border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              />
              <p className="text-xs text-slate-500 mt-1">Converts at {stepConversion} steps per mile</p>
            </div>
            <button 
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Add Entry
            </button>
          </form>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-xl font-bold text-slate-800 mb-4">Recent Entries</h3>
          {entries.length === 0 ? (
            <p className="text-slate-500 text-center py-8">No steps logged yet. Start walking!</p>
          ) : (
            <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
              {[...entries].reverse().map(entry => (
                <div key={entry.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <div>
                    <p className="font-medium text-slate-800">{new Date(entry.date + 'T00:00:00').toLocaleDateString()}</p>
                    <p className="text-sm text-slate-500">{(entry.steps / stepConversion).toFixed(2)} miles</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-slate-700">{entry.steps.toLocaleString()}</span>
                    <button 
                      onClick={() => deleteEntry(entry.id)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
