import { useState, useEffect } from 'react';

export interface StepEntry {
  id: string;
  date: string;
  steps: number;
}

const STEPS_PER_MILE = 2000;
const STORAGE_KEY = 'trek_tracker_entries';

export function useJourney() {
  const [entries, setEntries] = useState<StepEntry[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setEntries(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse entries', e);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    }
  }, [entries, isLoaded]);

  const addEntry = (date: string, steps: number) => {
    const newEntry: StepEntry = {
      id: crypto.randomUUID(),
      date,
      steps
    };
    setEntries([...entries, newEntry]);
  };

  const deleteEntry = (id: string) => {
    setEntries(entries.filter(e => e.id !== id));
  };

  const totalSteps = entries.reduce((sum, entry) => sum + entry.steps, 0);
  const totalMiles = totalSteps / STEPS_PER_MILE;

  return {
    entries,
    addEntry,
    deleteEntry,
    totalSteps,
    totalMiles,
    STEPS_PER_MILE
  };
}
