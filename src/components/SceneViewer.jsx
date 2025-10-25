import React from "react";
import { useGame } from "../contexts/GameContext";
import { useTelegram } from "../contexts/TelegramContext";

/*
  SceneViewer - Enhanced with choice types and stat requirements
  props:
    scene: объект сцены (из scenes.json)
    onChoose(choice): функция вызова при выборе
    onFreeAction(): функция при выборе "free"
*/

export default function SceneViewer({ scene, onChoose, onFreeAction }) {
  const { stats, coins } = useGame();
  const { hapticFeedback } = useTelegram();

  if (!scene) return <div className="vn-empty" style={{ padding: 20 }}>Сцена не найдена</div>;

  // фоновое изображение
  const bgStyle = scene.image
    ? { backgroundImage: `url(${scene.image})`, backgroundSize: "cover", backgroundPosition: "center" }
    : {};

  // Check if choice is available based on requirements
  const isChoiceAvailable = (choice) => {
    // Check cost
    if (choice.cost && coins < choice.cost) {
      return { available: false, reason: `Нужно ${choice.cost} 💎` };
    }

    // Check stat requirements
    if (choice.requiredStats) {
      for (const [stat, required] of Object.entries(choice.requiredStats)) {
        if (stats[stat] < required) {
          return { 
            available: false, 
            reason: `Нужно ${stat}: ${required} (у вас ${stats[stat]})` 
          };
        }
      }
    }

    return { available: true };
  };

  const handleChoice = (choice) => {
    hapticFeedback('light');
    const availability = isChoiceAvailable(choice);
    
    if (!availability.available && choice.cost) {
      // Show tooltip or alert for unavailable choice
      return;
    }

    onChoose?.(choice);
  };

  // Debug characters
  console.log('SceneViewer - Characters:', scene.characters);

  return (
    <div style={{ minHeight: "100vh", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      {/* Background */}
      <div className="vn-bg" style={{ ...bgStyle, width: "100%", height: "100%", position: "absolute", inset: 0, zIndex: 0 }} />

      {/* Stats HUD */}
      <div 
        className="vn-hud" 
        style={{ 
          position: "absolute", 
          top: 10, 
          left: 10,
          background: 'rgba(0, 0, 0, 0.6)',
          padding: '8px 12px',
          borderRadius: 8,
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          zIndex: 100,
        }}
      >
        <div style={{ fontSize: 12 }}>⚖️ Честность: {stats.honesty ?? 0}</div>
        <div style={{ fontSize: 12 }}>🎭 Хитрость: {stats.cunning ?? 0}</div>
        <div style={{ fontSize: 12 }}>⭐ Репутация: {stats.reputation ?? 0}</div>
        <div style={{ fontSize: 12 }}>💎 Обаяние: {stats.charm ?? 0}</div>
      </div>

      {/* Character sprites - positioned in the middle/upper area */}
      {scene.characters && scene.characters.length > 0 && (
        <div style={{ 
          position: 'absolute', 
          bottom: '200px',
          left: 0,
          right: 0,
          height: 'calc(100vh - 250px)',
          zIndex: 5, 
          pointerEvents: 'none',
        }}>
          {scene.characters.map((char) => {
            console.log('Rendering character:', char);
            return (
              <img
                key={char.id}
                src={char.image}
                alt={char.id}
                style={{
                  position: 'absolute',
                  left: char.x || '10%',
                  bottom: 0,
                  height: '100%',
                  maxHeight: '600px',
                  width: 'auto',
                  transform: `scale(${char.scale || 1})`,
                  transformOrigin: 'bottom center',
                  pointerEvents: 'none',
                }}
                onError={(e) => {
                  console.error('Failed to load character image:', char.image);
                  e.target.style.display = 'none';
                }}
                onLoad={() => {
                  console.log('Character image loaded:', char.image);
                }}
              />
            );
          })}
        </div>
      )}

      {/* Dialogue window */}
      <div style={{ 
        position: "relative", 
        zIndex: 10, 
        marginTop: "auto", 
        padding: 20, 
        paddingBottom: 30 
      }}>
        <div className="vn-window" style={{ width: "100%", maxWidth: "900px", margin: "0 auto", background: "rgba(0,0,0,0.85)", borderRadius: 12, padding: 20, color: "#fff", boxShadow: "0 -4px 20px rgba(0,0,0,0.3)" }}>
          {/* Speaker name */}
          {scene.speaker && (
            <div style={{ 
              fontSize: 14, 
              fontWeight: 600, 
              opacity: 0.9, 
              marginBottom: 8,
              color: '#fbbf24'
            }}>
              {scene.speaker}
            </div>
          )}

          {/* Title */}
          <h2 className="vn-title" style={{ margin: "0 0 12px 0", fontSize: 18, fontWeight: 600 }}>
            {scene.title}
          </h2>

          {/* Text */}
          <p className="vn-text" style={{ margin: "0 0 16px 0", lineHeight: 1.6, fontSize: 15 }}>
            {scene.text}
          </p>

          {/* Choices */}
          <div className="vn-choices" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {scene.choices && scene.choices.map((choice) => {
              const availability = isChoiceAvailable(choice);
              const isFree = choice.free;
              const isPaid = choice.cost > 0;
              const isStatLocked = choice.requiredStats;

              return (
                <button
                  key={choice.id}
                  className="vn-btn"
                  onClick={() => {
                    console.log('Choice clicked:', choice.id, 'isFree:', isFree);
                    if (isFree) {
                      console.log('Calling onFreeAction');
                      onFreeAction?.();
                    } else {
                      handleChoice(choice);
                    }
                  }}
                  disabled={!availability.available && isPaid}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '12px 16px',
                    background: isFree 
                      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                      : isPaid
                      ? 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)'
                      : '#fff',
                    color: isFree || isPaid ? '#fff' : '#111',
                    opacity: (!availability.available && isPaid) ? 0.5 : 1,
                    cursor: (!availability.available && isPaid) ? 'not-allowed' : 'pointer',
                    border: 'none',
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: 500,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span>{choice.label}</span>
                  <span style={{ fontSize: 13, opacity: 0.9 }}>
                    {isFree && '✨'}
                    {isPaid && `${choice.cost} 💎`}
                    {isStatLocked && !availability.available && '🔒'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
