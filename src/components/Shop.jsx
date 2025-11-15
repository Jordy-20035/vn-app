import React, { useState } from 'react';
import { useTelegram } from '../contexts/TelegramContext';
import { useGame } from '../contexts/GameContext';

/**
 * Shop component - In-app purchases for currency with tabs
 * Integrates with Telegram Payments API
 */
export default function Shop({ onClose }) {
  const { showAlert, openInvoice } = useTelegram();
  const { addCoins, spendEnergy } = useGame();
  const [activeTab, setActiveTab] = useState('rubies'); // 'rubies' or 'energy'

  // Rubies packages
  const rubiesPackages = [
    { 
      id: 'rubies_beginner', 
      rubies: 100, 
      energy: 3, 
      stars: 139, 
      title: 'Для начинающих',
      image: '/assets/ui/shop-beginner-chest.png',
      isBeginner: true
    },
    { 
      id: 'rubies_best', 
      rubies: 150, 
      stars: 379, 
      title: 'Лучшая выгода',
      image: '/assets/ui/shop-best-chest.png',
      isBest: true
    },
    { 
      id: 'rubies_medium', 
      rubies: 60, 
      stars: 179, 
      title: 'Средний пакет',
      image: '/assets/ui/shop-medium-chest.png'
    },
    { 
      id: 'rubies_small', 
      rubies: 20, 
      stars: 79, 
      title: 'Малый пакет',
      image: '/assets/ui/shop-small-chest.png'
    },
  ];

  // Energy packages
  const energyPackages = [
    { 
      id: 'energy_beginner', 
      rubies: 100, 
      energy: 3, 
      stars: 139, 
      title: 'Для начинающих',
      image: '/assets/ui/shop-beginner-chest.png',
      isBeginner: true
    },
    { 
      id: 'energy_best', 
      energy: 150, 
      stars: 1199, 
      title: 'Лучшая выгода',
      image: '/assets/ui/shop-energy-bolt.png',
      isBest: true
    },
    { 
      id: 'energy_medium', 
      energy: 10, 
      stars: 79, 
      title: 'Средний пакет',
      image: '/assets/ui/shop-energy-bolt.png'
    },
    { 
      id: 'energy_small', 
      energy: 5, 
      stars: 49, 
      title: 'Малый пакет',
      image: '/assets/ui/shop-energy-bolt.png'
    },
  ];

  const handlePurchase = async (pack) => {
    // In production, this would create an invoice and open Telegram payment
    // For now, simulate purchase
    try {
      // TODO: Create invoice URL via backend
      // const invoiceUrl = await createInvoice(pack);
      // openInvoice(invoiceUrl, (status) => {
      //   if (status === 'paid') {
      //     if (pack.rubies) addCoins(pack.rubies);
      //     if (pack.energy) {
      //       // Add energy logic here
      //     }
      //   }
      // });
      
      // Temporary simulation
      showAlert(`Покупка: ${pack.title}\n${pack.rubies ? pack.rubies + ' 💎' : ''}${pack.energy ? ' ' + pack.energy + ' ⚡' : ''} за ${pack.stars} ⭐`);
    } catch (error) {
      showAlert('Ошибка при обработке покупки');
    }
  };

  const currentPackages = activeTab === 'rubies' ? rubiesPackages : energyPackages;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'linear-gradient(180deg, rgba(139, 0, 0, 0.95) 0%, rgba(101, 0, 0, 0.95) 100%)',
          borderRadius: 20,
          padding: 20,
          maxWidth: 420,
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            background: 'transparent',
            border: 'none',
            fontSize: 28,
            color: '#fff',
            cursor: 'pointer',
            padding: 0,
            lineHeight: 1,
            zIndex: 10,
            width: 32,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          ×
        </button>

        {/* Tabs */}
        <div style={{ 
          display: 'flex', 
          gap: 8, 
          marginBottom: 20,
          background: '#fff',
          borderRadius: 12,
          padding: 4,
        }}>
          <button
            onClick={() => setActiveTab('rubies')}
            style={{
              flex: 1,
              padding: '10px 16px',
              borderRadius: 8,
              border: 'none',
              background: activeTab === 'rubies' ? '#8B0000' : 'transparent',
              color: activeTab === 'rubies' ? '#fff' : '#8B0000',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: 14,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
            }}
          >
            <img 
              src="/assets/ui/rubies-icon.png" 
              alt="Рубины" 
              style={{ width: 20, height: 20 }}
            />
            Рубины
          </button>
          <button
            onClick={() => setActiveTab('energy')}
            style={{
              flex: 1,
              padding: '10px 16px',
              borderRadius: 8,
              border: 'none',
              background: activeTab === 'energy' ? '#8B0000' : 'transparent',
              color: activeTab === 'energy' ? '#fff' : '#8B0000',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: 14,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
            }}
          >
            <img 
              src="/assets/ui/energy-icon.png" 
              alt="Энергия" 
              style={{ width: 20, height: 20 }}
            />
            Энергия
          </button>
        </div>

        {/* Packages */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {currentPackages.map((pack) => (
            <div
              key={pack.id}
              style={{
                position: 'relative',
                background: pack.isBeginner 
                  ? 'linear-gradient(135deg, rgba(255, 200, 150, 0.9) 0%, rgba(255, 180, 120, 0.9) 100%)'
                  : pack.isBest
                  ? 'linear-gradient(135deg, rgba(139, 0, 0, 0.9) 0%, rgba(101, 0, 0, 0.9) 100%)'
                  : 'linear-gradient(135deg, rgba(101, 0, 0, 0.8) 0%, rgba(80, 0, 0, 0.8) 100%)',
                borderRadius: 16,
                padding: 16,
                cursor: 'pointer',
                border: pack.isBest ? '2px solid #FFD700' : 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              }}
              onClick={() => handlePurchase(pack)}
            >
              {pack.isBest && (
                <div
                  style={{
                    position: 'absolute',
                    top: -10,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#FFD700',
                    color: '#8B0000',
                    padding: '4px 16px',
                    borderRadius: 12,
                    fontSize: 12,
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                  }}
                >
                  ЛУЧШАЯ ВЫГОДА
                </div>
              )}
              
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                {/* Image/Icon */}
                <div style={{ flexShrink: 0 }}>
                  {pack.image ? (
                    <img 
                      src={pack.image} 
                      alt={pack.title}
                      style={{ width: 80, height: 80, objectFit: 'contain' }}
                    />
                  ) : (
                    <div style={{ width: 80, height: 80, background: 'rgba(255,255,255,0.2)', borderRadius: 12 }} />
                  )}
                </div>

                {/* Content */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>
                    {pack.title}
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {pack.rubies && (
                      <div style={{ 
                        background: '#fff', 
                        borderRadius: 8, 
                        padding: '6px 12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        width: 'fit-content'
                      }}>
                        <img src="/assets/ui/rubies-icon.png" alt="Рубины" style={{ width: 20, height: 20 }} />
                        <span style={{ fontSize: 16, fontWeight: 700, color: '#8B0000' }}>{pack.rubies}</span>
                      </div>
                    )}
                    {pack.energy && (
                      <div style={{ 
                        background: '#fff', 
                        borderRadius: 8, 
                        padding: '6px 12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        width: 'fit-content'
                      }}>
                        <img src="/assets/ui/energy-icon.png" alt="Энергия" style={{ width: 20, height: 20 }} />
                        <span style={{ fontSize: 16, fontWeight: 700, color: '#8B0000' }}>{pack.energy}</span>
                      </div>
                    )}
                  </div>

                  {/* Price button */}
                  <button
                    style={{
                      background: 'linear-gradient(135deg, #FF69B4 0%, #FF1493 100%)',
                      border: 'none',
                      borderRadius: 8,
                      padding: '8px 16px',
                      color: '#fff',
                      fontWeight: 700,
                      fontSize: 14,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 6,
                      width: 'fit-content',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePurchase(pack);
                    }}
                  >
                    <span>⭐</span>
                    <span>{pack.stars}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

