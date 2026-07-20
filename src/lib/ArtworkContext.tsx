import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ARTWORKS_DATA } from '../data';
import { Artwork } from '../types';

const STORAGE_KEY = 'lunarveil_artworks';
const API_BASE = '/api/artworks';

interface ArtworkContextProps {
  artworks: Artwork[];
  refreshArtworks: () => void;
}

const ArtworkContext = createContext<ArtworkContextProps | undefined>(undefined);

function loadFromStorage(): Artwork[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    // fallback
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ARTWORKS_DATA));
  return [...ARTWORKS_DATA];
}

async function fetchFromAPI(): Promise<Artwork[] | null> {
  try {
    const res = await fetch(API_BASE);
    if (!res.ok) throw new Error('API error');
    const data = await res.json();
    if (Array.isArray(data)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return data;
    }
    return null;
  } catch {
    return null;
  }
}

export const ArtworkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [artworks, setArtworks] = useState<Artwork[]>(loadFromStorage);

  const refreshArtworks = useCallback(async () => {
    const apiData = await fetchFromAPI();
    if (apiData) {
      setArtworks(apiData);
    }
  }, []);

  // On mount: fetch from API
  useEffect(() => {
    refreshFromAPI();
    async function refreshFromAPI() {
      const apiData = await fetchFromAPI();
      if (apiData) {
        setArtworks(apiData);
      }
    }
  }, []);

  // Poll API every 3 seconds for live updates from admin
  useEffect(() => {
    const interval = setInterval(refreshArtworks, 3000);
    return () => clearInterval(interval);
  }, [refreshArtworks]);

  return (
    <ArtworkContext.Provider value={{ artworks, refreshArtworks }}>
      {children}
    </ArtworkContext.Provider>
  );
};

export const useArtworks = () => {
  const ctx = useContext(ArtworkContext);
  if (!ctx) throw new Error('useArtworks must be used within ArtworkProvider');
  return ctx;
};
