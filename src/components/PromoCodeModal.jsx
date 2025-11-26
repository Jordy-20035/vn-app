import React, { useState } from 'react';
import { useTelegram } from '../contexts/TelegramContext';
import { useGame } from '../contexts/GameContext';

// Promo codes database
const PROMO_CODES = {
  // 20 rubies codes
  'АцияБЕх': { rubies: 20, used: false },
  'ДУЦХЮКА': { rubies: 20, used: false },
  'мыНАШ7Ц': { rubies: 20, used: false },
  'ЪгТРшнф': { rubies: 20, used: false },
  'ЯКёзувБ': { rubies: 20, used: false },
  'МЬС49Жё': { rubies: 20, used: false },
  'ЩлбчСн8': { rubies: 20, used: false },
  'БЪЙБбЬИ': { rubies: 20, used: false },
  'НбЕщСИЦ': { rubies: 20, used: false },
  'Ф8тйу2Р': { rubies: 20, used: false },
  'ъпмлВиь': { rubies: 20, used: false },
  'ьяЛКТЕю': { rubies: 20, used: false },
  '21ЯЗТЦЮ': { rubies: 20, used: false },
  'ЯЕ76Ы61': { rubies: 20, used: false },
  'ёСвь109': { rubies: 20, used: false },
  'еызтги2': { rubies: 20, used: false },
  'СВУЗЕЙХ': { rubies: 20, used: false },
  'тЖбеЩзф': { rubies: 20, used: false },
  '1ЕжУ4рП': { rubies: 20, used: false },
  'съкТЮЯГ': { rubies: 20, used: false },
  'нюДвеТВ': { rubies: 20, used: false },
  'ЦГЪ9У42': { rubies: 20, used: false },
  'ЕШ745мъ': { rubies: 20, used: false },
  'Тявйхби': { rubies: 20, used: false },
  'МФщшрЩ1': { rubies: 20, used: false },
  'кцЧВЫЪЛ': { rubies: 20, used: false },
  'Ъэхжыфа': { rubies: 20, used: false },
  'ЦЦвЫ2Ад': { rubies: 20, used: false },
  'УБчХазШ': { rubies: 20, used: false },
  'ЪмщъзЦШ': { rubies: 20, used: false },
  'ахшШЁж5': { rubies: 20, used: false },
  'НЭЁЩКб': { rubies: 20, used: false },
  '1Ё9чэ2ю': { rubies: 20, used: false },
  'ГдбБсът': { rubies: 20, used: false },
  'ТжухэтЦ': { rubies: 20, used: false },
  
  // 60 rubies codes
  'ЮИЖл2Ав': { rubies: 60, used: false },
  'Мв19к57': { rubies: 60, used: false },
  'л37кшёв': { rubies: 60, used: false },
  'югГЩ73Ъ': { rubies: 60, used: false },
  'Хщбчаяё': { rubies: 60, used: false },
  '81м47ЁЩ': { rubies: 60, used: false },
  'мкьсГзл': { rubies: 60, used: false },
  'мытЗБюи': { rubies: 60, used: false },
  '4ЦяыХ5Ё': { rubies: 60, used: false },
  'шЯьдКГБ': { rubies: 60, used: false },
  'ЛИЁёп9Б': { rubies: 60, used: false },
  'ЭрбпущЧ': { rubies: 60, used: false },
  'эШшг4Хс': { rubies: 60, used: false },
  'НесйБщХ': { rubies: 60, used: false },
  'ХШфсРив': { rubies: 60, used: false },
};

export default function PromoCodeModal({ isOpen, onClose }) {
  const { showAlert } = useTelegram();
  const { addCoins } = useGame();
  const { user } = useTelegram();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  // Load used codes from localStorage
  const getUsedCodes = () => {
    if (!user?.id) return new Set();
    const saved = localStorage.getItem(`promo_codes_${user.id}`);
    return saved ? new Set(JSON.parse(saved)) : new Set();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!code.trim()) {
      setError('Введите промокод');
      return;
    }

    const codeUpper = code.trim().toUpperCase();
    const usedCodes = getUsedCodes();

    if (usedCodes.has(codeUpper)) {
      setError('Этот промокод уже использован');
      return;
    }

    const promoData = PROMO_CODES[codeUpper];
    if (!promoData) {
      setError('Промокод не найден');
      return;
    }

    // Mark as used
    usedCodes.add(codeUpper);
    if (user?.id) {
      localStorage.setItem(`promo_codes_${user.id}`, JSON.stringify(Array.from(usedCodes)));
    }

    // Give reward
    addCoins(promoData.rubies);
    showAlert(`Промокод активирован! Получено ${promoData.rubies} 💎`);
    setCode('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'linear-gradient(180deg, rgba(139, 0, 0, 0.95) 0%, rgba(101, 0, 0, 0.95) 100%)',
          borderRadius: 20,
          padding: 24,
          maxWidth: 400,
          width: '90%',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#fff' }}>
            Промокод
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

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <input
              type="text"
              value={code}
              onChange={(e) => {
                setCode(e.target.value.toUpperCase());
                setError('');
              }}
              placeholder="Введите промокод"
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: 12,
                border: '2px solid rgba(255,255,255,0.3)',
                background: 'rgba(255,255,255,0.1)',
                color: '#fff',
                fontSize: 16,
                textTransform: 'uppercase',
              }}
              autoFocus
            />
            {error && (
              <div style={{ color: '#ff6b6b', fontSize: 12, marginTop: 8 }}>
                {error}
              </div>
            )}
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px 24px',
              borderRadius: 12,
              border: 'none',
              background: 'linear-gradient(135deg, #FF69B4 0%, #FF1493 100%)',
              color: '#fff',
              fontWeight: 700,
              fontSize: 16,
              cursor: 'pointer',
            }}
          >
            Активировать
          </button>
        </form>
      </div>
    </div>
  );
}

