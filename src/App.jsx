import React, { useState, useEffect } from "react";
import { TelegramProvider, useTelegram } from "./contexts/TelegramContext";
import { GameProvider, useGame } from "./contexts/GameContext";
import SceneViewer from "./components/SceneViewer";
import StoryCard from "./components/StoryCard";
import StoryModal from "./components/StoryModal";
import CurrencyPanel from "./components/CurrencyPanel";
import Shop from "./components/Shop";
import ProgressManager from "./components/ProgressManager";
import AdScreen from "./components/AdScreen";
import EpisodeSummary from "./components/EpisodeSummary";
import Toast from "./components/Toast";
import storiesData from "./data/stories.json";
import scenesData from "./data/scenes.json";

// Use public assets for images (Vercel compatibility)
const splashBg = "/assets/splash-bg.jpg";

// Check YandexGPT configuration on load
console.log('=== ALTERRA INITIALIZATION ===');
console.log('Environment:', import.meta.env.MODE);
console.log('YandexGPT API Key present:', !!import.meta.env.VITE_YANDEX_API_KEY);
console.log('YandexGPT Folder ID present:', !!import.meta.env.VITE_YANDEX_FOLDER_ID);
console.log('API Key length:', import.meta.env.VITE_YANDEX_API_KEY?.length || 0);
console.log('Folder ID:', import.meta.env.VITE_YANDEX_FOLDER_ID || 'NOT SET');
console.log('==============================');

// Splash screen component
function Splash() {
  return (
    <div className="splash-root">
      <img src={splashBg} alt="Фон" className="splash-bg" />
      <div className="splash-box">
        <div className="splash-logo">Alterra</div>
        <div className="splash-sub">Твой выбор создаёт реальность...</div>
        <div className="splash-spinner" />
      </div>
    </div>
  );
}

// Chapter splash component
function ChapterSplash({ image, title }) {
  const bg = image || "/assets/tome1-cover.jpg";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6))",
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          color: "#fff",
          padding: 20,
        }}
      >
        <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 20 }}>
          {title || "Том 1"}
        </div>
        <div className="splash-spinner" />
      </div>
    </div>
  );
}

// Free action modal
function FreeActionModal({ isOpen, onClose, onSubmit }) {
  const [actionText, setActionText] = useState("");
  const [intentText, setIntentText] = useState("");

  useEffect(() => {
    console.log('FreeActionModal state:', { isOpen });
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (actionText.trim()) {
      console.log('Submitting free action:', { action: actionText, intent: intentText });
      onSubmit({ action: actionText, intent: intentText });
      setActionText("");
      setIntentText("");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: 16,
          padding: 24,
          maxWidth: 400,
          width: "90%",
        }}
      >
        <h3 style={{ marginTop: 0, fontSize: 20, fontWeight: 700 }}>
          Свободное действие
        </h3>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label
              style={{
                display: "block",
                fontSize: 14,
                marginBottom: 6,
                fontWeight: 500,
              }}
            >
              Что вы хотите сделать?
            </label>
            <input
              value={actionText}
              onChange={(e) => setActionText(e.target.value)}
              placeholder="Например: попросить работу"
              style={{
                width: "100%",
                padding: 10,
                borderRadius: 8,
                border: "1px solid #e5e7eb",
                fontSize: 14,
              }}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label
              style={{
                display: "block",
                fontSize: 14,
                marginBottom: 6,
                fontWeight: 500,
              }}
            >
              Как вы это сделаете?
            </label>
            <input
              value={intentText}
              onChange={(e) => setIntentText(e.target.value)}
              placeholder="Например: уверенно и спокойно"
          style={{
                width: "100%",
                padding: 10,
                borderRadius: 8,
                border: "1px solid #e5e7eb",
                fontSize: 14,
              }}
            />
          </div>

          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: "10px 20px",
                borderRadius: 8,
                border: "1px solid #e5e7eb",
                background: "#fff",
                cursor: "pointer",
              }}
            >
              Отмена
            </button>
            <button
              type="submit"
              style={{
                padding: "10px 20px",
                borderRadius: 8,
                border: "none",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "#fff",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Отправить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Main App component
function App() {
  const { showAlert, showConfirm, hapticFeedback } = useTelegram();
  const {
    energy,
    coins,
    spendEnergy,
    spendCoins,
    watchAd,
    updateStats,
    completeEpisode,
    COINS_AD_AMOUNT,
    COINS_EPISODE_REWARD,
  } = useGame();

  // UI states
  const [selectedStory, setSelectedStory] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [showShop, setShowShop] = useState(false);
  const [showProgressManager, setShowProgressManager] = useState(null);
  
  // Chapter loading
  const [chapterLoading, setChapterLoading] = useState(false);
  const [chapterSplashImage, setChapterSplashImage] = useState(null);
  const [chapterTitle, setChapterTitle] = useState("");
  
  // Scene states
  const [currentSceneId, setCurrentSceneId] = useState(null);
  const [scenes] = useState(scenesData || {});
  
  // Episode tracking
  const [currentEpisodeId, setCurrentEpisodeId] = useState(null);
  const [episodeStats, setEpisodeStats] = useState({
    honesty: 0,
    cunning: 0,
    reputation: 0,
    charm: 0,
  });
  
  // Modals and overlays
  const [freeModalOpen, setFreeModalOpen] = useState(false);
  const [showAdScreen, setShowAdScreen] = useState(null); // null | 'pre-episode' | 'post-episode' | 'bonus'
  const [showEpisodeSummary, setShowEpisodeSummary] = useState(false);
const [toast, setToast] = useState(null);

  const menuRef = React.useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    }

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMenu]);

  // Stories from JSON
  const STORIES = storiesData.stories || [];

  // Handle play story
  const handlePlayStory = (story) => {
    if (story.locked) {
      showAlert("История в разработке — скоро появится!");
      return;
    }

  if (energy <= 0) {
      showAlert("Недостаточно энергии! Подождите восстановления или купите в магазине.");
    return;
  }

    // Show pre-episode ad
  setSelectedStory(story);
    setShowAdScreen('pre-episode');
  };

  // After pre-episode ad
  const handlePreEpisodeAdComplete = () => {
    setShowAdScreen(null);
    
    if (!selectedStory) return;

    // Spend energy
    spendEnergy(1);
    hapticFeedback('medium');

    // Show chapter splash
    setChapterSplashImage(selectedStory.tomeSplash || selectedStory.cover);
    setChapterTitle(`Том ${selectedStory.tome || 1}`);
  setChapterLoading(true);

    // Reset episode stats
    setEpisodeStats({ honesty: 0, cunning: 0, reputation: 0, charm: 0 });

    // Start episode
  setTimeout(() => {
    setChapterLoading(false);
      const startSceneId = selectedStory.startSceneId || "scene_001";
      setCurrentSceneId(startSceneId);
      setCurrentEpisodeId(selectedStory.episodes?.[0]?.id || 'ep_1');
    }, 1500);
  };

  // Handle choice in scene
  const handleChoose = (choice) => {
  if (!choice) return;

    hapticFeedback('light');

    // Check and spend coins if needed
  if (choice.cost) {
      if (coins < choice.cost) {
        setToast({ message: `Недостаточно алмазов! Нужно ${choice.cost} 💎`, type: "error" });
        return;
      }

      showConfirm(`Потратить ${choice.cost} 💎 на "${choice.label}"?`, (confirmed) => {
        if (confirmed) {
          spendCoins(choice.cost);
          setToast({ message: `Списано ${choice.cost} 💎`, type: "success" });
          applyChoiceEffects(choice);
        }
      });
      return;
    }

    applyChoiceEffects(choice);
  };

  // Apply choice effects
  const applyChoiceEffects = (choice) => {
    // Update stats
  if (choice.effects) {
      updateStats(choice.effects);
      
      // Track episode stats
      setEpisodeStats(prev => ({
        honesty: prev.honesty + (choice.effects.honesty || 0),
        cunning: prev.cunning + (choice.effects.cunning || 0),
        reputation: prev.reputation + (choice.effects.reputation || 0),
        charm: prev.charm + (choice.effects.charm || 0),
    }));
  }

    // Navigate to next scene
  if (choice.goto) {
      if (choice.goto === 'episode_end') {
        // Episode completed
        handleEpisodeComplete();
      } else {
    setCurrentSceneId(choice.goto);
  }
}
  };

  // Handle free action submission with AI
  const handleFreeAction = async (data) => {
    console.log('handleFreeAction called with:', data);
    setFreeModalOpen(false);
    
    if (!data.action.trim()) {
      alert("Пожалуйста, опишите действие.");
      return;
    }

    // Show loading state
    setToast({ message: "AI обрабатывает ваше действие...", type: "info" });

    try {
      // Import YandexGPT service
      const { processYandexGPTAction } = await import('./services/yandexGPT.js');
      
      const currentScene = scenes[currentSceneId];
      
      console.log('Calling YandexGPT with:', {
        action: data.action,
        intent: data.intent,
        scene: currentScene.id,
        stats: episodeStats
      });
      
      // Call YandexGPT API
      const result = await processYandexGPTAction({
        playerAction: `${data.action}${data.intent ? ` (${data.intent})` : ''}`,
        scene: currentScene,
        stats: episodeStats,
        characters: currentScene.characters || [],
      });

      console.log('YandexGPT result:', result);

      if (result.success) {
        // Show AI response using browser alert (not Telegram)
        alert(`🎭 Ответ AI:\n\n${result.narrative}\n\nИсход: ${result.outcome || 'neutral'}`);
        
        // Update stats if AI suggested changes
        if (result.statsChange) {
          updateStats(result.statsChange);
          setEpisodeStats(prev => {
            const updated = { ...prev };
            Object.entries(result.statsChange).forEach(([stat, value]) => {
              updated[stat] = (updated[stat] || 0) + value;
            });
            return updated;
          });
        }
        
        // Navigate if AI suggests next scene
        if (result.nextScene) {
          setCurrentSceneId(result.nextScene);
        }
        
        setToast({ message: "Действие выполнено!", type: "success" });
      } else {
        // AI error or invalid action
        alert(`❌ Ошибка:\n\n${result.narrative || result.error || "Не удалось обработать действие."}`);
        setToast({ message: result.reason || "Ошибка AI", type: "error" });
      }
    } catch (error) {
      console.error('Free action error:', error);
      alert("❌ Произошла ошибка при обработке действия. Попробуйте другой вариант.\n\nДетали в консоли.");
      setToast({ message: "Ошибка обработки", type: "error" });
    }
  };

  // Handle episode complete
  const handleEpisodeComplete = () => {
    if (selectedStory && currentEpisodeId) {
      completeEpisode(selectedStory.id, currentEpisodeId, episodeStats);
    }
    
    // Show episode summary
    setShowEpisodeSummary(true);
  };

  // Handle episode summary close
  const handleSummaryComplete = () => {
    setShowEpisodeSummary(false);
    setShowAdScreen('post-episode');
  };

  // Handle post-episode ad
  const handlePostEpisodeAdComplete = () => {
    setShowAdScreen(null);
    setCurrentSceneId(null);
    setSelectedStory(null);
    setCurrentEpisodeId(null);
  };

  // Handle summary ad watch
  const handleSummaryAdWatch = () => {
    if (watchAd()) {
      setToast({ message: `Получено ${COINS_AD_AMOUNT} 💎`, type: "success" });
    }
  };

  // Handle bonus ad
  const handleBonusAd = () => {
    if (watchAd()) {
      setShowAdScreen('bonus');
    } else {
      showAlert("Бонусная реклама пока недоступна. Подождите немного.");
    }
  };

  const handleBonusAdComplete = () => {
    setShowAdScreen(null);
    setToast({ message: `Получено ${COINS_AD_AMOUNT} 💎 за просмотр рекламы!`, type: "success" });
  };

  // Back from scene
  const handleBackFromScene = () => {
    showConfirm(
      "Вы уверены? Прогресс серии не сохранится.",
      (confirmed) => {
        if (confirmed) {
          setCurrentSceneId(null);
          setSelectedStory(null);
          setCurrentEpisodeId(null);
        }
      }
    );
  };

  // Render scene viewer
  if (currentSceneId) {
    const sceneObj = scenes[currentSceneId];

    if (!sceneObj) {
      return (
        <div style={{ padding: 20 }}>
          <button onClick={handleBackFromScene}>← Назад</button>
          <div>Загрузка сцены...</div>
        </div>
      );
    }

    return (
      <>
        <div style={{ position: 'fixed', top: 12, left: 12, zIndex: 100 }}>
          <button
            onClick={handleBackFromScene}
            style={{
              padding: '8px 16px',
              background: 'rgba(0, 0, 0, 0.7)',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            ← Назад
          </button>
        </div>

        <SceneViewer
          scene={sceneObj}
          onChoose={handleChoose}
          onFreeAction={() => setFreeModalOpen(true)}
        />

        <FreeActionModal
          isOpen={freeModalOpen}
          onClose={() => setFreeModalOpen(false)}
          onSubmit={handleFreeAction}
        />
      </>
    );
  }

  // Main catalog view
    return (
  <div className="app-container">
      {/* Chapter loading splash */}
    {chapterLoading && (
        <ChapterSplash image={chapterSplashImage} title={chapterTitle} />
      )}

      {/* Toast notifications */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Ad screens */}
      {showAdScreen === 'pre-episode' && (
        <AdScreen
          type="interstitial"
          onComplete={handlePreEpisodeAdComplete}
        />
      )}
      {showAdScreen === 'post-episode' && (
        <AdScreen
          type="interstitial"
          onComplete={handlePostEpisodeAdComplete}
        />
      )}
      {showAdScreen === 'bonus' && (
        <AdScreen
          type="reward"
          onComplete={handleBonusAdComplete}
        />
      )}

      {/* Episode summary */}
      {showEpisodeSummary && (
        <EpisodeSummary
          episodeTitle={selectedStory?.episodes?.[0]?.title || "Серия 1"}
          statsEarned={episodeStats}
          coinsEarned={COINS_EPISODE_REWARD}
          onWatchAd={handleSummaryAdWatch}
          onComplete={handleSummaryComplete}
        />
      )}

      {/* Shop */}
      {showShop && <Shop onClose={() => setShowShop(false)} />}

      {/* Progress Manager */}
      {showProgressManager && (
        <ProgressManager
          storyId={showProgressManager}
          onClose={() => setShowProgressManager(null)}
        />
      )}

    <div className="app-inner">
        {/* Header */}
        <header className="app-header">
          <div className="app-header-inner">
            <CurrencyPanel
              onAdClick={handleBonusAd}
              onShopClick={() => setShowShop(true)}
            />

            {/* Menu button */}
            <button
              className="menu-pill"
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu((m) => !m);
              }}
              aria-expanded={showMenu}
            >
              <span className="menu-dots">⋮</span>
            </button>
          </div>
        </header>

        {/* Dropdown menu */}
        {showMenu && (
          <div ref={menuRef} className="app-menu-dropdown">
            <button
              className="menu-item"
              onClick={() => {
                setShowShop(true);
                setShowMenu(false);
              }}
            >
              💎 Магазин
            </button>
            <button
              className="menu-item"
              onClick={() => {
                showAlert("Следите за нами в социальных сетях!");
                setShowMenu(false);
              }}
            >
              📱 Мы в соц.сетях
            </button>
            <div className="menu-separator" />
            <div className="menu-contact">Контакты</div>
            <button
              className="menu-item"
              onClick={() => {
                window.open("https://t.me/alterrrabot", "_blank");
                setShowMenu(false);
              }}
            >
              Telegram
            </button>
            <button
              className="menu-item"
              onClick={() => {
                window.location.href = "mailto:manyejordana@gmail.com";
                setShowMenu(false);
              }}
            >
              E-mail
            </button>
          </div>
        )}

        {/* Catalog title */}
        <div className="catalog-title">Выбери свою историю</div>

        {/* Story grid */}
        <div className="stories-grid">
          {STORIES.map((story) => (
            <StoryCard
              key={story.id}
              story={story}
              onClick={() => {
                if (!story.locked) {
                  setSelectedStory(story);
                } else {
                  showAlert("История в разработке — скоро появится!");
                }
              }}
            />
          ))}
        </div>
      </div>

      {/* Story modal */}
      {selectedStory && !chapterLoading && !currentSceneId && (
        <StoryModal
          story={selectedStory}
          onPlay={handlePlayStory}
          onClose={() => setSelectedStory(null)}
          onManageProgress={() => {
            setShowProgressManager(selectedStory.id);
            setSelectedStory(null);
          }}
        />
      )}
    </div>
  );
}

// App wrapper with splash and providers
export default function AppWrapper() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Preload images
    const timeout = new Promise((res) => setTimeout(res, 1500));
    timeout.then(() => setReady(true));
  }, []);

  if (!ready) return <Splash />;

  return (
    <TelegramProvider>
      <GameProvider>
        <App />
      </GameProvider>
    </TelegramProvider>
  );
}
