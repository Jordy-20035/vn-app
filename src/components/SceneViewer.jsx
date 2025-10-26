import React, { useState } from "react";
import { useGame } from "../contexts/GameContext";
import { useTelegram } from "../contexts/TelegramContext";
import DialogueViewer from "./DialogueViewer";

/*
  SceneViewer - Enhanced with step-by-step dialogues and choice protection
  props:
    scene: объект сцены (из scenes.json)
    onChoose(choice): функция вызова при выборе
    onFreeAction(): функция при выборе "free"
    isProcessing: блокировка кнопок во время обработки
*/

export default function SceneViewer({ scene, onChoose, onFreeAction, isProcessing = false }) {
  const { stats, coins } = useGame();
  const { hapticFeedback } = useTelegram();
  const [dialogueComplete, setDialogueComplete] = useState(!scene.dialogue || scene.dialogue.length === 0);

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
    if (isProcessing) return; // Blocked during processing
    
    hapticFeedback('light');
    const availability = isChoiceAvailable(choice);
    
    if (!availability.available && choice.cost) {
      // Show tooltip or alert for unavailable choice
      return;
    }

    onChoose?.(choice);
  };

  const handleDialogueComplete = () => {
    console.log('Dialogue complete, showing choices');
    setDialogueComplete(true);
  };

  // Debug
  console.log('SceneViewer - Scene:', scene.id, 'HasDialogue:', !!scene.dialogue, 'DialogueComplete:', dialogueComplete);

  return (
    <div style={{ minHeight: "100vh", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      {/* Background */}
      <div className="vn-bg" style={{ ...bgStyle, width: "100%", height: "100%", position: "absolute", inset: 0, zIndex: 0 }} />

      {/* Step-by-step dialogue viewer */}
      {scene.dialogue && !dialogueComplete && (
        <DialogueViewer
          dialogue={scene.dialogue}
          onComplete={handleDialogueComplete}
          speed={80}
        />
      )}

      {/* Legacy mode: Show all characters if no dialogue system */}
      {(!scene.dialogue && scene.characters && scene.characters.length > 0) && (
        <div style={{ 
          position: 'absolute', 
          bottom: 0,
          left: 0,
          right: 0,
          height: '90vh',
          maxHeight: 'none',
          zIndex: 5, 
          pointerEvents: 'none',
        }}>
          {scene.characters.map((char) => (
            <img
              key={char.id}
              src={char.image}
              alt={char.id}
              style={{
                position: 'absolute',
                left: char.x || '10%',
                bottom: 0,
                height: '100%',
                width: 'auto',
                maxWidth: 'none',
                objectFit: 'contain',
                transform: `scale(${char.scale || 1})`,
                transformOrigin: 'bottom center',
                pointerEvents: 'none',
              }}
            />
          ))}
        </div>
      )}

      {/* Dialogue window (shown only when dialogue is complete or doesn't exist) */}
      {dialogueComplete && (
        <div style={{ 
          position: "relative", 
          zIndex: 10, 
          marginTop: "auto", 
          padding: 20, 
          paddingBottom: 30,
          animation: 'fadeIn 0.3s ease-in',
        }}>
          <div className="vn-window" style={{ width: "100%", maxWidth: "900px", margin: "0 auto", background: "rgba(0,0,0,0.85)", borderRadius: 12, padding: 20, color: "#fff", boxShadow: "0 -4px 20px rgba(0,0,0,0.3)" }}>
            {/* Speaker name (for legacy scenes without dialogue array) */}
            {!scene.dialogue && scene.speaker && (
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

            {/* Title (for legacy scenes) */}
            {!scene.dialogue && scene.title && (
              <h2 className="vn-title" style={{ margin: "0 0 12px 0", fontSize: 18, fontWeight: 600 }}>
                {scene.title}
              </h2>
            )}

            {/* Text (for legacy scenes without dialogue array) */}
            {!scene.dialogue && scene.text && (
              <p className="vn-text" style={{ margin: "0 0 16px 0", lineHeight: 1.6, fontSize: 15 }}>
                {scene.text}
              </p>
            )}

            {/* Choices */}
            <div className="vn-choices" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {scene.choices && scene.choices.map((choice) => {
                const availability = isChoiceAvailable(choice);
                const isFree = choice.free;
                const isPaid = choice.cost > 0;
                const isStatLocked = choice.requiredStats;
                const isDisabled = (!availability.available && isPaid) || isProcessing;

                  return (
                  <button
                    key={choice.id}
                    className="vn-btn"
                    onClick={() => {
                      console.log('Choice clicked:', choice.id, 'isFree:', isFree, 'isProcessing:', isProcessing);
                      if (isFree) {
                        console.log('Calling onFreeAction');
                        onFreeAction?.();
                      } else {
                        handleChoice(choice);
                      }
                    }}
                    disabled={isDisabled}
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
                      opacity: isDisabled ? 0.5 : 1,
                      cursor: isDisabled ? 'not-allowed' : 'pointer',
                      border: 'none',
                      borderRadius: 8,
                      fontSize: 14,
                      fontWeight: 500,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      transition: 'opacity 0.2s, transform 0.1s',
                      transform: isProcessing ? 'scale(0.98)' : 'scale(1)',
                    }}
                  >
                    <span>{choice.label}</span>
                    <span style={{ fontSize: 13, opacity: 0.9 }}>
                      {isFree && '✨'}
                      {isPaid && `${choice.cost} 💎`}
                      {isStatLocked && !availability.available && '🔒'}
                      {isProcessing && !isFree && '⏳'}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Processing indicator */}
            {isProcessing && (
              <div style={{ 
                marginTop: 12, 
                textAlign: 'center', 
                fontSize: 13, 
                opacity: 0.7,
                animation: 'blink 1s infinite',
              }}>
                Обработка...
          </div>
            )}
        </div>
      </div>
      )}
    </div>
  );
}
