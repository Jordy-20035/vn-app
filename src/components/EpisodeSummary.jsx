import React from 'react';

/**
 * EpisodeSummary - Screen shown after completing an episode
 * Shows stats recap and rewards
 */
export default function EpisodeSummary({ 
  episodeTitle, 
  statsEarned, 
  coinsEarned, 
  onWatchAd, 
  onComplete 
}) {
  const statIcons = {
    honesty: '⚖️',
    cunning: '🎭',
    reputation: '⭐',
    charm: '💎',
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'rgba(0, 0, 0, 0.9)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      }}
    >
      <div
        style={{
          background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)',
          borderRadius: 16,
          padding: 32,
          maxWidth: 400,
          width: '100%',
          color: '#fff',
          textAlign: 'center',
        }}
      >
        {/* Title */}
        <h2 style={{ margin: '0 0 24px 0', fontSize: 24, fontWeight: 700 }}>
          Серия завершена!
        </h2>

        {/* Episode name */}
        <div style={{ fontSize: 16, opacity: 0.8, marginBottom: 32 }}>
          {episodeTitle}
        </div>

        {/* Stats earned */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 14, opacity: 0.7, marginBottom: 16 }}>
            Изменение характеристик:
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 12,
            }}
          >
            {Object.entries(statsEarned || {}).map(([stat, value]) => {
              if (value === 0) return null;
              return (
                <div
                  key={stat}
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    padding: '12px 8px',
                    borderRadius: 8,
                  }}
                >
                  <div style={{ fontSize: 20, marginBottom: 4 }}>
                    {statIcons[stat] || '📊'}
                  </div>
                  <div style={{ fontSize: 13, opacity: 0.8, textTransform: 'capitalize' }}>
                    {stat === 'honesty' ? 'Честность' : 
                     stat === 'cunning' ? 'Хитрость' :
                     stat === 'reputation' ? 'Репутация' : 'Обаяние'}
                  </div>
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      color: value > 0 ? '#4ade80' : '#f87171',
                    }}
                  >
                    {value > 0 ? '+' : ''}{value}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Coins earned */}
        <div
          style={{
            background: 'rgba(255, 215, 0, 0.15)',
            padding: 16,
            borderRadius: 12,
            marginBottom: 24,
          }}
        >
          <div style={{ fontSize: 32, marginBottom: 8 }}>💎</div>
          <div style={{ fontSize: 18, fontWeight: 700 }}>
            +{coinsEarned} алмазов
          </div>
        </div>

        {/* Ad button */}
        {onWatchAd && (
          <button
            onClick={onWatchAd}
            style={{
              width: '100%',
              padding: '14px 24px',
              fontSize: 16,
              fontWeight: 600,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: 10,
              cursor: 'pointer',
              marginBottom: 12,
            }}
          >
            📺 Смотреть рекламу (+2 💎)
          </button>
        )}

        {/* Complete button */}
        <button
          onClick={onComplete}
          style={{
            width: '100%',
            padding: '14px 24px',
            fontSize: 16,
            fontWeight: 600,
            background: '#fff',
            color: '#111',
            border: 'none',
            borderRadius: 10,
            cursor: 'pointer',
          }}
        >
          Завершить
        </button>
      </div>
    </div>
  );
}


