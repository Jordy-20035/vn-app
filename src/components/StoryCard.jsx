import React from 'react';
import { useGame } from '../contexts/GameContext';
import { useTelegram } from '../contexts/TelegramContext';

/**
 * StoryCard - Enhanced story card with progress and stats info
 */
export default function StoryCard({ story, onClick }) {
  const { storyProgress } = useGame();
  const { hapticFeedback } = useTelegram();

  const progress = storyProgress[story.id] || {};
  const completedCount = (progress.completedEpisodes || []).length;
  const totalEpisodes = story.episodesCount || 10;
  const progressPercent = (completedCount / totalEpisodes) * 100;

  const handleClick = () => {
    hapticFeedback('light');
    onClick?.(story);
  };

  return (
    <div className="story-card" onClick={handleClick}>
      <div style={{ position: 'relative' }}>
        <img src={story.cover} alt={story.title} className="story-thumb" />
        
        {/* Progress indicator */}
        {completedCount > 0 && (
          <div
            style={{
              position: 'absolute',
              top: 8,
              right: 8,
              background: 'rgba(0, 0, 0, 0.7)',
              color: '#fff',
              padding: '4px 8px',
              borderRadius: 12,
              fontSize: 11,
              fontWeight: 600,
            }}
          >
            {completedCount}/{totalEpisodes}
          </div>
        )}

        {/* Locked overlay */}
        {story.locked && (
          <div className="locked-overlay" onClick={(e) => e.stopPropagation()}>
            <div className="locked-content">
              <div className="locked-icon">🔒</div>
              <div className="locked-text">В разработке</div>
            </div>
          </div>
        )}
      </div>

      <div className="story-title-small">{story.title}</div>

      {/* Progress bar */}
      {!story.locked && completedCount > 0 && (
        <div
          style={{
            width: '100%',
            height: 3,
            background: 'rgba(0, 0, 0, 0.1)',
            borderRadius: 999,
            overflow: 'hidden',
            marginTop: 4,
          }}
        >
          <div
            style={{
              width: `${progressPercent}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #667eea, #764ba2)',
              transition: 'width 0.3s',
            }}
          />
        </div>
      )}
    </div>
  );
}

