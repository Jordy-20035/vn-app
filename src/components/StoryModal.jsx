import React from 'react';
import { useGame } from '../contexts/GameContext';
import { useTelegram } from '../contexts/TelegramContext';

/**
 * StoryModal - Expandable story card with detailed info
 */
export default function StoryModal({ story, onPlay, onClose, onManageProgress }) {
  const { storyProgress } = useGame();
  const { hapticFeedback } = useTelegram();

  if (!story) return null;

  const progress = storyProgress[story.id] || {};
  const completedCount = (progress.completedEpisodes || []).length;
  const totalEpisodes = story.episodesCount || 10;

  const handlePlay = () => {
    hapticFeedback('medium');
    onPlay?.(story);
  };

  const handleManageProgress = () => {
    hapticFeedback('light');
    onManageProgress?.(story);
  };

  return (
    <div className="story-modal" onClick={onClose}>
      <div className="story-modal-inner" onClick={(e) => e.stopPropagation()}>
        <div className="story-modal-thumb-wrapper">
          <img src={story.cover} alt={story.title} className="story-modal-thumb" />
          <div className="story-modal-gradient" />

          {/* Info overlay */}
          <div className="story-modal-info">
            {/* Episode count */}
            <div className="story-modal-series">
              Серия {completedCount + 1}/{totalEpisodes}
            </div>

            {/* Annotation */}
            <div className="story-modal-anno">{story.annotation}</div>

            {/* Required stats (if any) */}
            {story.requiredStats && (
              <div style={{ fontSize: 12, opacity: 0.9, marginTop: 8 }}>
                Требуемые характеристики:
                <div style={{ display: 'flex', gap: 8, marginTop: 4, flexWrap: 'wrap' }}>
                  {Object.entries(story.requiredStats).map(([stat, value]) => (
                    <span
                      key={stat}
                      style={{
                        background: 'rgba(255, 255, 255, 0.2)',
                        padding: '2px 8px',
                        borderRadius: 12,
                        fontSize: 11,
                      }}
                    >
                      {stat}: {value}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="story-modal-row" style={{ gap: 8, marginTop: 8 }}>
              <button
                className="story-modal-play"
                onClick={handlePlay}
                style={{ flex: 1 }}
              >
                Играть
              </button>
              
              {completedCount > 0 && (
                <button
                  onClick={handleManageProgress}
                  style={{
                    flex: 1,
                    padding: '8px 10px',
                    borderRadius: 8,
                    background: 'rgba(255, 255, 255, 0.3)',
                    color: '#fff',
                    border: 'none',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: 13,
                  }}
                >
                  Сброс
                </button>
              )}
            </div>
          </div>

          {/* Tome badge */}
          <div className="story-modal-tome">Том {story.tome || 1}</div>

          {/* Close button */}
          <button className="story-modal-close" onClick={onClose}>
            ←
          </button>
        </div>
      </div>
    </div>
  );
}

