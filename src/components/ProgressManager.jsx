import React from 'react';
import { useGame } from '../contexts/GameContext';
import { useTelegram } from '../contexts/TelegramContext';

/**
 * ProgressManager - Reset progress for episodes, seasons, or entire stories
 */
export default function ProgressManager({ storyId, onClose }) {
  const { resetEpisode, resetSeason, resetStory, storyProgress } = useGame();
  const { showConfirm, hapticFeedback } = useTelegram();

  const progress = storyProgress[storyId] || {};
  const completedEpisodes = progress.completedEpisodes || [];

  const handleReset = (type, id) => {
    const confirmMessages = {
      episode: 'Сбросить прогресс этой серии? Это действие нельзя отменить.',
      season: 'Сбросить прогресс всего сезона? Это действие нельзя отменить.',
      story: 'Сбросить прогресс всей истории? Все достижения будут потеряны!',
    };

    showConfirm(confirmMessages[type], (confirmed) => {
      if (confirmed) {
        hapticFeedback('heavy');
        
        switch (type) {
          case 'episode':
            resetEpisode(storyId, id);
            break;
          case 'season':
            resetSeason(storyId, id);
            break;
          case 'story':
            resetStory(storyId);
            break;
        }
        
        onClose?.();
      }
    });
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: 16,
          padding: 24,
          maxWidth: 400,
          width: '100%',
          maxHeight: '80vh',
          overflow: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 style={{ margin: '0 0 20px 0', fontSize: 20, fontWeight: 700 }}>
          Сброс прогресса
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Reset episode */}
          {completedEpisodes.length > 0 && (
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>
                Сбросить серию:
              </div>
              {completedEpisodes.map((episodeId) => (
                <button
                  key={episodeId}
                  onClick={() => handleReset('episode', episodeId)}
                  style={{
                    width: '100%',
                    padding: 12,
                    marginBottom: 8,
                    background: '#f3f4f6',
                    border: 'none',
                    borderRadius: 8,
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  Серия {episodeId}
                </button>
              ))}
            </div>
          )}

          {/* Reset season */}
          <button
            onClick={() => handleReset('season', 'season_1')}
            style={{
              width: '100%',
              padding: 14,
              background: '#fef3c7',
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            Сбросить весь сезон
          </button>

          {/* Reset story */}
          <button
            onClick={() => handleReset('story')}
            style={{
              width: '100%',
              padding: 14,
              background: '#fee2e2',
              color: '#dc2626',
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            Сбросить всю историю
          </button>

          {/* Cancel */}
          <button
            onClick={onClose}
            style={{
              width: '100%',
              padding: 14,
              background: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: 8,
              cursor: 'pointer',
              marginTop: 8,
            }}
          >
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
}

