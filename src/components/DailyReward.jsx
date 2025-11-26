import React, { useState, useEffect } from 'react';
import { useTelegram } from '../contexts/TelegramContext';
import { useGame } from '../contexts/GameContext';

const DAILY_REWARDS = [
  { day: 1, rubies: 1, energy: 0 },
  { day: 2, rubies: 1, energy: 0 },
  { day: 3, rubies: 2, energy: 0 },
  { day: 4, rubies: 2, energy: 0 },
  { day: 5, rubies: 2, energy: 0 },
  { day: 6, rubies: 3, energy: 0 },
  { day: 7, rubies: 3, energy: 1 },
];

export default function DailyReward({ isOpen, onClose }) {
  const { showAlert } = useTelegram();
  const { addCoins } = useGame();
  const { user } = useTelegram();
  const [currentDay, setCurrentDay] = useState(1);
  const [canClaim, setCanClaim] = useState(false);

  useEffect(() => {
    if (!user?.id) return;

    // Load daily reward progress
    const saved = localStorage.getItem(`daily_reward_${user.id}`);
    if (saved) {
      const data = JSON.parse(saved);
      const lastClaim = new Date(data.lastClaim);
      const now = new Date();
      
      // Check if it's a new day (reset at midnight)
      const isNewDay = now.toDateString() !== lastClaim.toDateString();
      
      if (isNewDay) {
        // Check if we should reset (after day 7)
        if (data.day >= 7) {
          setCurrentDay(1);
          setCanClaim(true);
        } else {
          setCurrentDay(data.day + 1);
          setCanClaim(true);
        }
      } else {
        setCurrentDay(data.day);
        setCanClaim(false);
      }
    } else {
      setCurrentDay(1);
      setCanClaim(true);
    }
  }, [user]);

  const handleClaim = () => {
    if (!canClaim || !user?.id) return;

    const reward = DAILY_REWARDS[currentDay - 1];
    if (!reward) return;

    // Save progress
    localStorage.setItem(`daily_reward_${user.id}`, JSON.stringify({
      day: currentDay,
      lastClaim: new Date().toISOString(),
    }));

    // Give rewards
    addCoins(reward.rubies);
    // Note: Energy addition would need to be implemented in GameContext
    if (reward.energy > 0) {
      showAlert(`Получено ${reward.rubies} 💎 и ${reward.energy} ⚡`);
    } else {
      showAlert(`Получено ${reward.rubies} 💎`);
    }

    onClose();
  };

  if (!isOpen) return null;

  const reward = DAILY_REWARDS[currentDay - 1];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'linear-gradient(180deg, rgba(139, 0, 0, 0.95) 0%, rgba(101, 0, 0, 0.95) 100%)',
          borderRadius: 20,
          padding: 24,
          maxWidth: 420,
          width: '90%',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#fff' }}>
            Ежедневная награда
          </h3>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: 28,
              color: '#fff',
              cursor: 'pointer',
              padding: 0,
              lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>

        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>
            День {currentDay}
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 24 }}>
            {reward.rubies > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 32 }}>💎</span>
                <span style={{ fontSize: 24, fontWeight: 700, color: '#fff' }}>
                  {reward.rubies > 1 ? `×${reward.rubies}` : ''}
                </span>
              </div>
            )}
            {reward.energy > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 32 }}>⚡</span>
                <span style={{ fontSize: 24, fontWeight: 700, color: '#fff' }}>
                  {reward.energy > 1 ? `×${reward.energy}` : ''}
                </span>
              </div>
            )}
          </div>

          {/* Progress bar */}
          <div style={{ 
            display: 'flex', 
            gap: 4, 
            justifyContent: 'center',
            marginBottom: 24 
          }}>
            {DAILY_REWARDS.map((_, index) => (
              <div
                key={index}
                style={{
                  width: 32,
                  height: 8,
                  borderRadius: 4,
                  background: index < currentDay 
                    ? 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)'
                    : 'rgba(255,255,255,0.2)',
                }}
              />
            ))}
          </div>
        </div>

        <button
          onClick={handleClaim}
          disabled={!canClaim}
          style={{
            width: '100%',
            padding: '14px 24px',
            borderRadius: 12,
            border: 'none',
            background: canClaim 
              ? 'linear-gradient(135deg, #FF69B4 0%, #FF1493 100%)'
              : 'rgba(255,255,255,0.3)',
            color: '#fff',
            fontWeight: 700,
            fontSize: 16,
            cursor: canClaim ? 'pointer' : 'not-allowed',
            opacity: canClaim ? 1 : 0.6,
          }}
        >
          {canClaim ? 'Получить' : 'Уже получено сегодня'}
        </button>
      </div>
    </div>
  );
}

