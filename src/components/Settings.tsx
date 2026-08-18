import React, { useState } from 'react';
import { useJourney } from '../hooks/useJourney';
import { Settings as SettingsIcon, Save } from 'lucide-react';

export function Settings() {
  const { stepConversion, updateConversion } = useJourney();
  const [inputVal, setInputVal] = useState(stepConversion.toString());
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(inputVal, 10);
    if (!isNaN(val) && val > 0) {
      updateConversion(val);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 w-full">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <SettingsIcon className="text-emerald-600" />
          Settings
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Step Conversion Rate</h3>
            <p className="text-sm text-slate-600 mb-4">
              Everyone's stride is different. By default, we use 2,000 steps per mile. 
              You can adjust this to match your actual stride length.
            </p>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="relative flex-1 max-w-xs">
                <input
                  type="number"
                  min="1"
                  required
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  className="w-full pl-4 pr-20 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500 font-medium">
                  steps/mile
                </span>
              </div>
              
              <button
                type="submit"
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                <Save size={18} />
                Save
              </button>
            </div>
            {isSaved && (
              <p className="text-emerald-600 text-sm mt-2 font-medium">Conversion rate updated!</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
