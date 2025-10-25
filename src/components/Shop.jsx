import React from 'react';
import { useTelegram } from '../contexts/TelegramContext';

/**
 * Shop component - In-app purchases for currency
 * Integrates with Telegram Payments API
 */
export default function Shop({ onClose }) {
  const { showAlert } = useTelegram();

  const packages = [
    { id: 'pack_1', coins: 50, price: 99, title: 'Горстка алмазов', stars: 50 },
    { id: 'pack_2', coins: 120, price: 199, title: 'Мешочек алмазов', stars: 100, popular: true },
    { id: 'pack_3', coins: 300, price: 449, title: 'Сундук алмазов', stars: 250 },
    { id: 'pack_4', coins: 750, price: 999, title: 'Сокровищница', stars: 500 },
  ];

  const handlePurchase = (pack) => {
    // In production, this would create an invoice and open Telegram payment
    // For now, simulate purchase
    showAlert(`Покупка: ${pack.title}\n${pack.coins} 💎 за ${pack.stars} звёзд`);
    
    // Simulate successful purchase (in production, this would be called after payment confirmation)
    // openInvoice(invoiceUrl, (status) => {
    //   if (status === 'paid') {
    //     addCoins(pack.coins);
    //   }
    // });
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
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>Магазин</h2>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: 24,
              cursor: 'pointer',
              padding: 0,
              lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>

        {/* Packages */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {packages.map((pack) => (
            <div
              key={pack.id}
              style={{
                position: 'relative',
                background: pack.popular ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#f3f4f6',
                color: pack.popular ? '#fff' : '#111',
                padding: 16,
                borderRadius: 12,
                cursor: 'pointer',
                border: pack.popular ? '2px solid #fbbf24' : 'none',
              }}
              onClick={() => handlePurchase(pack)}
            >
              {pack.popular && (
                <div
                  style={{
                    position: 'absolute',
                    top: -8,
                    right: 12,
                    background: '#fbbf24',
                    color: '#111',
                    padding: '4px 12px',
                    borderRadius: 12,
                    fontSize: 11,
                    fontWeight: 700,
                  }}
                >
                  ПОПУЛЯРНО
                </div>
              )}
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>
                    {pack.title}
                  </div>
                  <div style={{ fontSize: 24, fontWeight: 700 }}>
                    {pack.coins} 💎
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 20, fontWeight: 700 }}>
                    {pack.stars} ⭐
                  </div>
                  <div style={{ fontSize: 12, opacity: 0.8 }}>
                    Telegram Stars
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info */}
        <div style={{ marginTop: 20, fontSize: 12, color: '#666', textAlign: 'center' }}>
          Оплата через Telegram Stars<br />
          Безопасно и удобно
        </div>
      </div>
    </div>
  );
}

