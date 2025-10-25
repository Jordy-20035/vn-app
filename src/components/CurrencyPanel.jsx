import React, { useState, useEffect } from 'react';
import { useGame } from '../contexts/GameContext';

/**
 * CurrencyPanel - Displays energy and coins with timers
 */
export default function CurrencyPanel({ onAdClick, onShopClick }) {
  const { 
    energy, 
    coins, 
    energyMax, 
    getEnergyRegenTime, 
    getAdCooldownTime 
  } = useGame();
  
  const [energyTimer, setEnergyTimer] = useState('');
  const [adTimer, setAdTimer] = useState('');
  const [adReady, setAdReady] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      // Energy timer
      if (energy < energyMax) {
        const timeLeft = getEnergyRegenTime();
        if (timeLeft > 0) {
          const hours = Math.floor(timeLeft / (60 * 60 * 1000));
          const minutes = Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000));
          const seconds = Math.floor((timeLeft % (60 * 1000)) / 1000);
          setEnergyTimer(`${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
        } else {
          setEnergyTimer('');
        }
      } else {
        setEnergyTimer('МАКС');
      }

      // Ad timer
      const adTimeLeft = getAdCooldownTime();
      if (adTimeLeft > 0) {
        const hours = Math.floor(adTimeLeft / (60 * 60 * 1000));
        const minutes = Math.floor((adTimeLeft % (60 * 60 * 1000)) / (60 * 1000));
        const seconds = Math.floor((adTimeLeft % (60 * 1000)) / 1000);
        setAdTimer(`${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
        setAdReady(false);
      } else {
        setAdTimer('');
        setAdReady(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [energy, energyMax, getEnergyRegenTime, getAdCooldownTime]);

  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
      {/* Energy pill */}
      <div className="pill" onClick={onShopClick} style={{ cursor: 'pointer' }}>
        <div className="pill-label">Энергия</div>
        <div className="pill-value">{energy} ⚡</div>
        {energyTimer && energy < energyMax && (
          <div style={{ fontSize: 9, opacity: 0.7 }}>{energyTimer}</div>
        )}
      </div>

      {/* Coins pill */}
      <div className="pill" onClick={onShopClick} style={{ cursor: 'pointer' }}>
        <div className="pill-label">Алмазы</div>
        <div className="pill-value">{coins} 💎</div>
      </div>

      {/* Ad button */}
      <button
        className="pill"
        onClick={onAdClick}
        disabled={!adReady}
        style={{
          cursor: adReady ? 'pointer' : 'not-allowed',
          opacity: adReady ? 1 : 0.6,
          border: 'none',
          padding: '8px 12px',
        }}
      >
        <div className="pill-label">Бонус</div>
        <div className="pill-value">📺</div>
        {!adReady && adTimer && (
          <div style={{ fontSize: 9, opacity: 0.7 }}>{adTimer}</div>
        )}
      </button>
    </div>
  );
}


