import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@clerk/clerk-react';

export interface StepEntry {
  id: string;
  date: string;
  steps: number;
}

export function useJourney() {
  const { isLoaded, userId, getToken } = useAuth();
  const [entries, setEntries] = useState<StepEntry[]>([]);
  const [stepConversion, setStepConversion] = useState(2000);
  const [isLoading, setIsLoading] = useState(true);

  const fetchApi = useCallback(async (endpoint: string, options: RequestInit = {}) => {
    if (!userId) return null;
    
    const headers = {
      'Content-Type': 'application/json',
      'x-user-id': userId, // In production, pass the actual JWT token as an Authorization header
      ...options.headers,
    };

    const res = await fetch(`/api${endpoint}`, { ...options, headers });
    if (!res.ok) throw new Error('API Error');
    return res.json();
  }, [userId]);

  const loadData = useCallback(async () => {
    if (!userId) {
      setEntries([]);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const [userData, logsData] = await Promise.all([
        fetchApi('/user'),
        fetchApi('/logs')
      ]);
      if (userData) setStepConversion(userData.step_conversion);
      if (logsData) setEntries(logsData);
    } catch (e) {
      console.error('Failed to load data', e);
    } finally {
      setIsLoading(false);
    }
  }, [userId, fetchApi]);

  useEffect(() => {
    if (isLoaded) {
      loadData();
    }
  }, [isLoaded, loadData]);

  const addEntry = async (date: string, steps: number) => {
    const newEntry: StepEntry = {
      id: crypto.randomUUID(),
      date,
      steps
    };
    
    // Optimistic update
    setEntries(prev => [newEntry, ...prev]);
    
    try {
      await fetchApi('/logs', {
        method: 'POST',
        body: JSON.stringify(newEntry)
      });
    } catch (e) {
      console.error('Failed to add entry', e);
      // Revert on failure (simplified)
      loadData();
    }
  };

  const deleteEntry = async (id: string) => {
    setEntries(prev => prev.filter(e => e.id !== id));
    try {
      await fetchApi(`/logs/${id}`, { method: 'DELETE' });
    } catch (e) {
      console.error('Failed to delete entry', e);
      loadData();
    }
  };

  const updateConversion = async (newConversion: number) => {
    setStepConversion(newConversion);
    try {
      await fetchApi('/user/conversion', {
        method: 'POST',
        body: JSON.stringify({ step_conversion: newConversion })
      });
    } catch (e) {
      console.error('Failed to update conversion', e);
    }
  };

  const totalSteps = entries.reduce((sum, entry) => sum + entry.steps, 0);
  const totalMiles = stepConversion > 0 ? totalSteps / stepConversion : 0;

  return {
    entries,
    addEntry,
    deleteEntry,
    totalSteps,
    totalMiles,
    stepConversion,
    updateConversion,
    isLoading
  };
}
