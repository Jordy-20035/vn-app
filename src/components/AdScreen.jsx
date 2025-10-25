import React, { useState, useEffect } from 'react';

/**
 * AdScreen component - Simulates ad viewing
 * In production, integrate with Telegram Ads or other ad networks
 */
export default function AdScreen({ onComplete, type = 'interstitial' }) {
  const [countdown, setCountdown] = useState(5);
  const [canSkip, setCanSkip] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setCanSkip(true);
    }
  }, [countdown]);

  const handleComplete = () => {
    if (canSkip) {
      onComplete?.();
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
      }}
    >
      {/* Ad simulation */}
      <div
        style={{
          width: '100%',
          maxWidth: 600,
          aspectRatio: '16/9',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 20,
          borderRadius: 12,
          padding: 20,
          margin: '0 20px',
        }}
      >
        <div style={{ fontSize: 24, fontWeight: 700 }}>📺 Реклама</div>
        <div style={{ fontSize: 16, opacity: 0.9, textAlign: 'center' }}>
          {type === 'reward' ? 'Получите бонусные алмазы!' : 'Загрузка следующей серии...'}
        </div>
        
        {!canSkip ? (
          <div style={{ fontSize: 48, fontWeight: 700 }}>{countdown}</div>
        ) : (
          <button
            onClick={handleComplete}
            style={{
              padding: '12px 32px',
              fontSize: 16,
              fontWeight: 600,
              background: '#fff',
              color: '#111',
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
            }}
          >
            {type === 'reward' ? 'Получить награду' : 'Продолжить'}
          </button>
        )}
      </div>

      {/* Info */}
      <div
        style={{
          marginTop: 20,
          fontSize: 13,
          opacity: 0.7,
          textAlign: 'center',
          padding: '0 20px',
        }}
      >
        В финальной версии здесь будет настоящая реклама
      </div>
    </div>
  );
}

