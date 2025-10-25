import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useTelegram } from './TelegramContext';

const GameContext = createContext(null);

const ENERGY_MAX = 4;
const ENERGY_REGEN_TIME = 2 * 60 * 60 * 1000; // 2 hours in milliseconds
const COINS_AD_AMOUNT = 2;
const COINS_AD_COOLDOWN = 1.5 * 60 * 60 * 1000; // 1.5 hours
const COINS_EPISODE_REWARD = 8;
const INITIAL_COINS = 120;

export const GameProvider = ({ children }) => {
  const { user } = useTelegram();
  
  // Currency states
  const [energy, setEnergy] = useState(ENERGY_MAX);
  const [coins, setCoins] = useState(INITIAL_COINS);
  const [lastEnergyRegen, setLastEnergyRegen] = useState(Date.now());
  const [lastAdWatch, setLastAdWatch] = useState(0);
  
  // Progress states
  const [unlockedStories, setUnlockedStories] = useState(['story_1']);
  const [storyProgress, setStoryProgress] = useState({});
  const [stats, setStats] = useState({
    honesty: 0,
    cunning: 0,
    reputation: 0,
    charm: 0,
  });
  
  // Load saved progress from localStorage
  useEffect(() => {
    if (user?.id) {
      const savedData = localStorage.getItem(`alterra_progress_${user.id}`);
      if (savedData) {
        try {
          const data = JSON.parse(savedData);
          setEnergy(data.energy || ENERGY_MAX);
          setCoins(data.coins || INITIAL_COINS);
          setLastEnergyRegen(data.lastEnergyRegen || Date.now());
          setLastAdWatch(data.lastAdWatch || 0);
          setUnlockedStories(data.unlockedStories || ['story_1']);
          setStoryProgress(data.storyProgress || {});
          setStats(data.stats || { honesty: 0, cunning: 0, reputation: 0, charm: 0 });
        } catch (e) {
          console.error('Failed to load progress:', e);
        }
      }
    }
  }, [user]);

  // Save progress to localStorage
  const saveProgress = useCallback(() => {
    if (user?.id) {
      const data = {
        energy,
        coins,
        lastEnergyRegen,
        lastAdWatch,
        unlockedStories,
        storyProgress,
        stats,
        timestamp: Date.now(),
      };
      localStorage.setItem(`alterra_progress_${user.id}`, JSON.stringify(data));
    }
  }, [user, energy, coins, lastEnergyRegen, lastAdWatch, unlockedStories, storyProgress, stats]);

  // Auto-save progress
  useEffect(() => {
    const interval = setInterval(saveProgress, 10000); // Save every 10 seconds
    return () => clearInterval(interval);
  }, [saveProgress]);

  // Energy regeneration
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const timeSinceRegen = now - lastEnergyRegen;
      
      if (energy < ENERGY_MAX && timeSinceRegen >= ENERGY_REGEN_TIME) {
        setEnergy(prev => Math.min(prev + 1, ENERGY_MAX));
        setLastEnergyRegen(now);
      }
    }, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, [energy, lastEnergyRegen]);

  // Calculate time until next energy
  const getEnergyRegenTime = () => {
    if (energy >= ENERGY_MAX) return 0;
    const timeSinceRegen = Date.now() - lastEnergyRegen;
    return Math.max(0, ENERGY_REGEN_TIME - timeSinceRegen);
  };

  // Calculate time until next ad
  const getAdCooldownTime = () => {
    const timeSinceAd = Date.now() - lastAdWatch;
    return Math.max(0, COINS_AD_COOLDOWN - timeSinceAd);
  };

  // Spend energy
  const spendEnergy = (amount = 1) => {
    if (energy >= amount) {
      setEnergy(prev => prev - amount);
      return true;
    }
    return false;
  };

  // Spend coins
  const spendCoins = (amount) => {
    if (coins >= amount) {
      setCoins(prev => prev - amount);
      return true;
    }
    return false;
  };

  // Add coins
  const addCoins = (amount) => {
    setCoins(prev => prev + amount);
  };

  // Watch ad for coins
  const watchAd = () => {
    const now = Date.now();
    if (now - lastAdWatch >= COINS_AD_COOLDOWN) {
      setCoins(prev => prev + COINS_AD_AMOUNT);
      setLastAdWatch(now);
      return true;
    }
    return false;
  };

  // Complete episode
  const completeEpisode = (storyId, episodeId, earnedStats = {}) => {
    // Update story progress
    setStoryProgress(prev => ({
      ...prev,
      [storyId]: {
        ...prev[storyId],
        completedEpisodes: [...(prev[storyId]?.completedEpisodes || []), episodeId],
        currentEpisode: episodeId,
      }
    }));

    // Update stats
    setStats(prev => ({
      honesty: prev.honesty + (earnedStats.honesty || 0),
      cunning: prev.cunning + (earnedStats.cunning || 0),
      reputation: prev.reputation + (earnedStats.reputation || 0),
      charm: prev.charm + (earnedStats.charm || 0),
    }));

    // Reward coins
    addCoins(COINS_EPISODE_REWARD);
  };

  // Update stats
  const updateStats = (statChanges) => {
    setStats(prev => ({
      honesty: prev.honesty + (statChanges.honesty || 0),
      cunning: prev.cunning + (statChanges.cunning || 0),
      reputation: prev.reputation + (statChanges.reputation || 0),
      charm: prev.charm + (statChanges.charm || 0),
    }));
  };

  // Reset progress
  const resetEpisode = (storyId, episodeId) => {
    setStoryProgress(prev => {
      const storyData = prev[storyId] || {};
      return {
        ...prev,
        [storyId]: {
          ...storyData,
          completedEpisodes: (storyData.completedEpisodes || []).filter(id => id !== episodeId),
        }
      };
    });
  };

  const resetSeason = (storyId, seasonId) => {
    setStoryProgress(prev => {
      const storyData = prev[storyId] || {};
      return {
        ...prev,
        [storyId]: {
          ...storyData,
          completedEpisodes: (storyData.completedEpisodes || []).filter(
            id => !id.startsWith(`${seasonId}_`)
          ),
        }
      };
    });
  };

  const resetStory = (storyId) => {
    setStoryProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[storyId];
      return newProgress;
    });
  };

  const value = {
    // Currency
    energy,
    coins,
    energyMax: ENERGY_MAX,
    getEnergyRegenTime,
    getAdCooldownTime,
    spendEnergy,
    spendCoins,
    addCoins,
    watchAd,
    
    // Progress
    unlockedStories,
    storyProgress,
    stats,
    updateStats,
    completeEpisode,
    
    // Reset functions
    resetEpisode,
    resetSeason,
    resetStory,
    
    // Save
    saveProgress,
    
    // Constants
    COINS_AD_AMOUNT,
    COINS_EPISODE_REWARD,
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
};

