import React, { useState, useEffect } from "react";
import CharacterSprite from "./CharacterSprite";

/*
  DialogueViewer - Component for step-by-step dialogue display with typewriter effect
  props:
    dialogue: array of dialogue steps
    onComplete: callback when all dialogue is shown
    speed: ms per character for typewriter effect (default: 80)
*/

export default function DialogueViewer({ dialogue, onComplete, speed = 20 }) {
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

  // Убрали handleClickAnywhere - сцены меняются только по кнопке "Далее"

  if (isComplete || !currentDialogue) {
    return null;
  }

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,
      }}
    >
      {/* Character sprite - Левый край, огромный, от самого низа, z-index самый низкий */}
      {currentDialogue.character && (
        <div
          key={currentDialogue.character.id}
          style={{
            position: 'absolute',
            bottom: 0,
            left: currentDialogue.character.x || '20%', // Сдвинуто еще правее для полной видимости персонажа
            height: '100vh', // Огромный, от самого низа экрана
            width: 'auto',
            zIndex: 1, // Самый низкий z-index (под кнопками)
            pointerEvents: 'none',
            animation: 'fadeIn 0.3s ease-in',
          }}
        >
          <CharacterSprite character={currentDialogue.character} />
        </div>
      )}

      {/* Dialogue box - bottom: 32% (в процентах от высоты экрана), НЕ прилипает к низу */}
      {currentDialogue.speaker !== 'narrator' && (
        <div
          style={{
            position: 'absolute',
            bottom: '32%', // Критически важно: в процентах от высоты экрана
            left: '50%',
            transform: 'translateX(-50%)',
            width: '90%',
            maxWidth: '600px',
            backgroundImage: 'url(/assets/ui/dialog_box_character.png)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            borderRadius: 12,
            padding: '20px 24px 20px 32px', // Больше padding слева для текста
            color: '#fff',
            boxShadow: '0 -4px 20px rgba(0,0,0,0.3)',
            zIndex: 10,
            boxSizing: 'border-box',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            minHeight: '140px', // Фиксированная минимальная высота
            maxHeight: '140px', // Фиксированная максимальная высота
          }}
        >
        {/* Speaker name */}
        {currentDialogue.speaker && (
          <div
            style={{
              fontSize: 14,
              fontWeight: 600,
              opacity: 0.9,
              marginBottom: 4, // Выше текста
              marginTop: -6, // Сдвиг вверх, чтобы было внутри окна
              color: '#fbbf24',
              flexShrink: 0,
              textAlign: 'left', // Вернули выравнивание влево
              paddingLeft: '8px', // Небольшой отступ вправо от левого края
              position: 'relative',
              zIndex: 2,
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
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
            whiteSpace: 'normal',
            maxWidth: '100%',
            overflow: 'hidden',
            textAlign: 'left',
            paddingLeft: '12px', // Сдвиг текста вправо
          }}
        >
          {displayedText}
          {isTyping && (
            <span style={{ opacity: 0.5, animation: 'blink 1s infinite' }}>|</span>
          )}
        </p>

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
      )}

      {/* Next button - под диалоговым окном */}
      {currentDialogue.speaker !== 'narrator' && (
        <div style={{ 
          position: 'absolute',
          bottom: 'calc(32% - 80px)', // Под диалоговым окном
          left: '50%',
          transform: 'translateX(-50%)',
          width: '90%',
          maxWidth: '600px',
          display: 'flex',
          justifyContent: 'flex-end',
          zIndex: 11,
        }}>
          <button
            onClick={handleNext}
            style={{
              padding: '8px 20px',
              background: isTyping ? '#666' : '#dc2626', // Красный цвет
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
      )}

      {/* Narrator box - top: 40% или 50% + transform для центра */}
      {currentDialogue.speaker === 'narrator' && (
        <div
          style={{
            position: 'absolute',
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: '600px',
            backgroundImage: 'url(/assets/ui/dialog_box_narrator.png)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            borderRadius: 12,
            padding: '20px 24px 20px 32px', // Больше padding слева для текста
            color: '#fff',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            zIndex: 10,
            boxSizing: 'border-box',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            minHeight: '180px', // Увеличенная высота для narrator
            maxHeight: '180px', // Увеличенная высота для narrator
          }}
        >
          <p
            style={{
              margin: 0,
              lineHeight: 1.5, // Немного уменьшен line-height для narrator
              fontSize: 13, // Уменьшен размер текста для narrator
              wordWrap: 'break-word',
              overflowWrap: 'break-word',
              whiteSpace: 'normal',
              maxWidth: '100%',
              overflow: 'hidden',
              textAlign: 'left',
              padding: '0 0 0 15px', // Сдвиг текста вправо
            }}
          >
            {displayedText}
            {isTyping && (
              <span style={{ opacity: 0.5, animation: 'blink 1s infinite' }}>|</span>
            )}
          </p>
        </div>
      )}

      {/* Next button - под диалоговым окном (narrator) */}
      {currentDialogue.speaker === 'narrator' && (
        <div style={{ 
          position: 'absolute',
          top: 'calc(40% + 80px)', // Под диалоговым окном
          left: '50%',
          transform: 'translateX(-50%)',
          width: '90%',
          maxWidth: '600px',
          display: 'flex',
          justifyContent: 'flex-end',
          zIndex: 11,
        }}>
          <button
            onClick={handleNext}
            style={{
              padding: '8px 20px',
              background: isTyping ? '#666' : '#dc2626', // Красный цвет
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
      )}
    </div>
  );
}

