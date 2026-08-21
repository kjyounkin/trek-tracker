import { useState, useEffect, useCallback } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';

export interface StepEntry {
  id: string;
  date: string;
  steps: number;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  avatar: string;
  miles: number;
}

export function useJourney() {
  const { isLoaded, userId } = useAuth();
  const { user } = useUser();
  const [entries, setEntries] = useState<StepEntry[]>([]);
  const [stepConversion, setStepConversion] = useState(2000);
  const [isLoading, setIsLoading] = useState(true);

  const fetchApi = useCallback(async (endpoint: string, options: RequestInit = {}) => {
    if (!userId) return null;
    
    const headers = {
      'Content-Type': 'application/json',
      'x-user-id': userId,
      'x-user-name': user?.firstName || 'Traveler',
      'x-user-avatar': user?.imageUrl || '',
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

export function useLeaderboard() {
  const { isLoaded, userId } = useAuth();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded || !userId) return;
    
    fetch('/api/leaderboard', { headers: { 'x-user-id': userId } })
      .then(async r => {
        if (!r.ok) {
          const text = await r.text();
          console.error('Leaderboard error:', text);
          throw new Error('Failed to load leaderboard');
        }
        return r.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setLeaderboard(data);
        } else {
          console.error('Leaderboard data is not an array:', data);
        }
        setIsLoading(false);
      })
      .catch(e => {
        console.error('Error fetching leaderboard:', e);
        setIsLoading(false);
      });
  }, [isLoaded, userId]);

  return { leaderboard, isLoading };
}

