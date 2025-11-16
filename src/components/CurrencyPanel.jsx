import React, { useState, useEffect } from 'react';
import { useGame } from '../contexts/GameContext';

/**
 * CurrencyPanel - Displays energy and coins with new design plates
 */
const EnergyIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M13.5 2L4 13.2h6l-1.5 8.8L20 10.8h-6l-0.5-8.8z" fill="url(#boltGrad)"/>
    <defs>
      <linearGradient id="boltGrad" x1="4" y1="2" x2="20" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFD54F"/>
        <stop offset="1" stopColor="#FFA000"/>
      </linearGradient>
    </defs>
  </svg>
);

const RubyIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M12 3l4.5 2 3.5 5-8 11-8-11 3.5-5L12 3z" fill="url(#rubyGrad)" />
    <path d="M12 3l4.5 2-4.5 4L7.5 5 12 3z" fill="rgba(255,255,255,0.5)"/>
    <defs>
      <linearGradient id="rubyGrad" x1="4" y1="3" x2="20" y2="21" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FF7A7A"/>
        <stop offset="1" stopColor="#D31F3A"/>
      </linearGradient>
    </defs>
  </svg>
);

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
        setEnergyTimer('');
      }

      // Ad timer (1.5 hours)
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
      {/* Energy counter with new design plate */}
      <div 
        className="currency-counter" 
        onClick={onShopClick} 
        style={{ 
          cursor: 'pointer',
          position: 'relative',
          backgroundImage: 'url(/assets/ui/energy-counter-bg.png)',
          backgroundColor: 'rgba(139, 0, 0, 0.8)', // Fallback
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          minWidth: 80,
          height: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 12px',
          borderRadius: 20,
          border: '1px solid rgba(255,255,255,0.2)',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', marginRight: 6 }}>
          <EnergyIcon size={20} />
        </span>
        <span style={{ 
          fontSize: 16, 
          fontWeight: 700, 
          color: '#fff',
          textShadow: '0 1px 2px rgba(0,0,0,0.5)'
        }}>
          {energy}
        </span>
        {energyTimer && energy < energyMax && (
          <div style={{ 
            position: 'absolute',
            bottom: -16,
            fontSize: 9,
            color: '#fff',
            opacity: 0.8,
            whiteSpace: 'nowrap'
          }}>
            {energyTimer}
          </div>
        )}
      </div>

      {/* Rubies/Diamonds counter with new design plate */}
      <div 
        className="currency-counter" 
        onClick={onShopClick} 
        style={{ 
          cursor: 'pointer',
          position: 'relative',
          backgroundImage: 'url(/assets/ui/rubies-counter-bg.png)',
          backgroundColor: 'rgba(139, 0, 0, 0.8)', // Fallback
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          minWidth: 80,
          height: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 12px',
          borderRadius: 20,
          border: '1px solid rgba(255,255,255,0.2)',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', marginRight: 6 }}>
          <RubyIcon size={20} />
        </span>
        <span style={{ 
          fontSize: 16, 
          fontWeight: 700, 
          color: '#fff',
          textShadow: '0 1px 2px rgba(0,0,0,0.5)'
        }}>
          {coins}
        </span>
      </div>

      {/* Ad bonus button with new design and timer */}
      <button
        onClick={onAdClick}
        disabled={!adReady}
        style={{
          cursor: adReady ? 'pointer' : 'not-allowed',
          opacity: adReady ? 1 : 0.6,
          border: 'none',
          background: 'transparent',
          padding: 0,
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'relative',
            backgroundImage: 'url(/assets/ui/ad-bonus-bg.png)',
            backgroundColor: 'rgba(139, 0, 0, 0.9)', // Fallback
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            minWidth: 100,
            height: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 12px',
            borderRadius: 20,
            border: '1px solid rgba(255,255,255,0.2)',
          }}
        >
          <span style={{ 
            fontSize: 12, 
            fontWeight: 600, 
            color: '#fff',
            textShadow: '0 1px 2px rgba(0,0,0,0.5)',
            marginRight: 4
          }}>
            Реклама +2
          </span>
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <RubyIcon size={18} />
          </span>
          {!adReady && adTimer && (
            <div style={{ 
              position: 'absolute',
              top: -18,
              fontSize: 10,
              color: '#fff',
              opacity: 0.9,
              whiteSpace: 'nowrap',
              fontWeight: 600,
              textShadow: '0 1px 2px rgba(0,0,0,0.7)'
            }}>
              {adTimer}
            </div>
          )}
        </div>
      </button>
    </div>
  );
}


