import React, { createContext, useContext, useEffect, useState } from 'react';
import WebApp from '@twa-dev/sdk';

const TelegramContext = createContext(null);

export const TelegramProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Initialize Telegram WebApp
    WebApp.ready();
    WebApp.expand();
    
    // Set theme colors
    WebApp.setHeaderColor('#000000');
    WebApp.setBackgroundColor('#f6f7f8');
    
    // Get user data
    const tgUser = WebApp.initDataUnsafe?.user;
    if (tgUser) {
      setUser({
        id: tgUser.id,
        firstName: tgUser.first_name,
        lastName: tgUser.last_name,
        username: tgUser.username,
        languageCode: tgUser.language_code,
      });
    } else {
      // Development fallback
      setUser({
        id: 'dev_user',
        firstName: 'Test',
        lastName: 'User',
        username: 'testuser',
        languageCode: 'ru',
      });
    }
    
    setIsReady(true);
  }, []);

  const showAlert = (message) => {
    WebApp.showAlert(message);
  };

  const showConfirm = (message, callback) => {
    WebApp.showConfirm(message, callback);
  };

  const hapticFeedback = (type = 'light') => {
    if (WebApp.HapticFeedback) {
      WebApp.HapticFeedback.impactOccurred(type);
    }
  };

  const openInvoice = (url, callback) => {
    WebApp.openInvoice(url, callback);
  };

  const showMainButton = (text, onClick) => {
    WebApp.MainButton.setText(text);
    WebApp.MainButton.show();
    WebApp.MainButton.onClick(onClick);
  };

  const hideMainButton = () => {
    WebApp.MainButton.hide();
  };

  const value = {
    user,
    isReady,
    showAlert,
    showConfirm,
    hapticFeedback,
    openInvoice,
    showMainButton,
    hideMainButton,
    WebApp,
  };

  return (
    <TelegramContext.Provider value={value}>
      {children}
    </TelegramContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTelegram = () => {
  const context = useContext(TelegramContext);
  if (!context) {
    throw new Error('useTelegram must be used within TelegramProvider');
  }
  return context;
};

