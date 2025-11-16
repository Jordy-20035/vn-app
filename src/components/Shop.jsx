import React, { useState } from 'react';
import { useTelegram } from '../contexts/TelegramContext';
import { useGame } from '../contexts/GameContext';

/**
 * Shop component - In-app purchases for currency with tabs
 * Integrates with Telegram Payments API
 */
const EnergyIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M13.5 2L4 13.2h6l-1.5 8.8L20 10.8h-6l-0.5-8.8z" fill="url(#boltGradShop)"/>
    <defs>
      <linearGradient id="boltGradShop" x1="4" y1="2" x2="20" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFD54F"/>
        <stop offset="1" stopColor="#FFA000"/>
      </linearGradient>
    </defs>
  </svg>
);

const RubyIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M12 3l4.5 2 3.5 5-8 11-8-11 3.5-5L12 3z" fill="url(#rubyGradShop)" />
    <path d="M12 3l4.5 2-4.5 4L7.5 5 12 3z" fill="rgba(255,255,255,0.5)"/>
    <defs>
      <linearGradient id="rubyGradShop" x1="4" y1="3" x2="20" y2="21" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FF7A7A"/>
        <stop offset="1" stopColor="#D31F3A"/>
      </linearGradient>
    </defs>
  </svg>
);

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
      image: '/assets/ui/shop-energy-bolt.png',
      isBeginner: true
    },
    { 
      id: 'energy_best', 
      energy: 150, 
      stars: 1199, 
      title: 'Лучшая выгода',
      image: '/assets/ui/shop-best-energy.png',
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
  const featuredPack = currentPackages.find(p => p.isBest);
  const otherPacks = currentPackages.filter(p => !p.isBest);

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
            <span style={{ display: 'flex', alignItems: 'center' }}>
              <RubyIcon size={18} />
            </span>
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
            <span style={{ display: 'flex', alignItems: 'center' }}>
              <EnergyIcon size={18} />
            </span>
            Энергия
          </button>
        </div>

        {/* Featured (Лучшая выгода) */}
        {featuredPack && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ 
              color: '#fff', 
              fontWeight: 800, 
              fontSize: 16, 
              margin: '0 0 8px 2px' 
            }}>
              Лучшая выгода
            </div>
            <div
              style={{
                position: 'relative',
                background: 'linear-gradient(135deg, rgba(139, 0, 0, 0.95) 0%, rgba(101, 0, 0, 0.95) 100%)',
                borderRadius: 16,
                padding: 18,
                cursor: 'pointer',
                border: '2px solid #FFD700',
                boxShadow: '0 6px 16px rgba(0,0,0,0.35)',
              }}
              onClick={() => handlePurchase(featuredPack)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ flexShrink: 0 }}>
                  <img 
                    src={featuredPack.image} 
                    alt={featuredPack.title}
                    style={{ width: 110, height: 110, objectFit: 'contain' }}
                  />
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ fontSize: 16, fontWeight: 800, color: '#fff' }}>
                    {featuredPack.title}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'row', gap: 10, flexWrap: 'wrap' }}>
                    {featuredPack.rubies && (
                      <div style={{ 
                        background: '#fff', 
                        borderRadius: 10, 
                        padding: '8px 14px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        width: 'fit-content'
                      }}>
                        <span style={{ display: 'flex', alignItems: 'center' }}>
                          <RubyIcon size={20} />
                        </span>
                        <span style={{ fontSize: 18, fontWeight: 800, color: '#8B0000' }}>{featuredPack.rubies}</span>
                      </div>
                    )}
                    {featuredPack.energy && (
                      <div style={{ 
                        background: '#fff', 
                        borderRadius: 10, 
                        padding: '8px 14px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        width: 'fit-content'
                      }}>
                        <span style={{ display: 'flex', alignItems: 'center' }}>
                          <EnergyIcon size={20} />
                        </span>
                        <span style={{ fontSize: 18, fontWeight: 800, color: '#8B0000' }}>{featuredPack.energy}</span>
                      </div>
                    )}
                  </div>

                  <button
                    style={{
                      background: 'linear-gradient(135deg, #FF69B4 0%, #FF1493 100%)',
                      border: 'none',
                      borderRadius: 10,
                      padding: '10px 16px',
                      color: '#fff',
                      fontWeight: 800,
                      fontSize: 15,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 6,
                      width: 'fit-content',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.25)',
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePurchase(featuredPack);
                    }}
                  >
                    <span>⭐</span>
                    <span>{featuredPack.stars}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other packages */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {otherPacks.map((pack) => (
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
                        <span style={{ display: 'flex', alignItems: 'center' }}>
                          <RubyIcon size={18} />
                        </span>
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
                        <span style={{ display: 'flex', alignItems: 'center' }}>
                          <EnergyIcon size={18} />
                        </span>
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

