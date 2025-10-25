import React, { useState, useEffect } from "react";

/*
  DialogueViewer - Component for step-by-step dialogue display with typewriter effect
  props:
    dialogue: array of dialogue steps
    onComplete: callback when all dialogue is shown
    speed: ms per character for typewriter effect (default: 80)
*/

export default function DialogueViewer({ dialogue, onComplete, speed = 80 }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  const currentDialogue = dialogue[currentStep];

  useEffect(() => {
    if (!currentDialogue) {
      setIsComplete(true);
      onComplete?.();
      return;
    }

    // Reset for new dialogue step
    setDisplayedText("");
    setIsTyping(true);

    const fullText = currentDialogue.text;
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayedText(fullText.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, speed);

    return () => clearInterval(typingInterval);
  }, [currentStep, currentDialogue, speed, onComplete]);

  const handleNext = () => {
    if (isTyping) {
      // Skip to end of current text
      setDisplayedText(currentDialogue.text);
      setIsTyping(false);
    } else if (currentStep < dialogue.length - 1) {
      // Move to next dialogue step
      setCurrentStep(currentStep + 1);
    } else {
      // All dialogue complete
      setIsComplete(true);
      onComplete?.();
    }
  };

  const handleClickAnywhere = (e) => {
    // Only trigger if clicking on backdrop, not on character or UI elements
    if (e.target === e.currentTarget) {
      handleNext();
    }
  };

  if (isComplete || !currentDialogue) {
    return null;
  }

  return (
    <div 
      onClick={handleClickAnywhere}
      style={{
        position: 'fixed',
        inset: 0,
        cursor: 'pointer',
        zIndex: 1,
      }}
    >
      {/* Character sprite */}
      {currentDialogue.character && (
        <div
          key={currentDialogue.character.id}
          style={{
            position: 'absolute',
            bottom: '180px',
            left: currentDialogue.character.x || '10%',
            height: '70vh',
            maxHeight: '600px',
            zIndex: 5,
            pointerEvents: 'none',
            animation: 'fadeIn 0.3s ease-in',
          }}
        >
          <img
            src={currentDialogue.character.image}
            alt={currentDialogue.character.id}
            style={{
              height: '100%',
              width: 'auto',
              maxWidth: '40vw',
              objectFit: 'contain',
              transform: `scale(${currentDialogue.character.scale || 1})`,
              transformOrigin: 'bottom center',
            }}
          />
        </div>
      )}

      {/* Dialogue box */}
      <div
        style={{
          position: 'absolute',
          bottom: 30,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '90%',
          maxWidth: '900px',
          background: 'rgba(0,0,0,0.85)',
          borderRadius: 12,
          padding: 20,
          color: '#fff',
          boxShadow: '0 -4px 20px rgba(0,0,0,0.3)',
          zIndex: 10,
        }}
      >
        {/* Speaker name */}
        {currentDialogue.speaker && (
          <div
            style={{
              fontSize: 14,
              fontWeight: 600,
              opacity: 0.9,
              marginBottom: 8,
              color: '#fbbf24',
            }}
          >
            {currentDialogue.speaker}
          </div>
        )}

        {/* Text with typewriter effect */}
        <p
          style={{
            margin: '0 0 16px 0',
            lineHeight: 1.6,
            fontSize: 15,
            minHeight: '3em',
          }}
        >
          {displayedText}
          {isTyping && (
            <span style={{ opacity: 0.5, animation: 'blink 1s infinite' }}>|</span>
          )}
        </p>

        {/* Next button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={handleNext}
            style={{
              padding: '8px 20px',
              background: isTyping ? '#666' : '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 600,
              transition: 'all 0.2s',
            }}
          >
            {isTyping ? 'Пропустить ▶▶' : 'Далее ▶'}
          </button>
        </div>

        {/* Progress indicator */}
        <div
          style={{
            marginTop: 12,
            fontSize: 12,
            opacity: 0.5,
            textAlign: 'center',
          }}
        >
          {currentStep + 1} / {dialogue.length}
        </div>
      </div>
    </div>
  );
}

