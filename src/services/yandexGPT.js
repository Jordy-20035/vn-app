// YandexGPT API Integration

const YANDEX_GPT_URL = 'https://llm.api.cloud.yandex.net/foundationModels/v1/completion';

// Get API credentials from environment
const API_KEY = import.meta.env.VITE_YANDEX_API_KEY;
const FOLDER_ID = import.meta.env.VITE_YANDEX_FOLDER_ID;

// Log configuration status (without exposing keys)
console.log('YandexGPT Config:', {
  hasApiKey: !!API_KEY,
  hasFolderId: !!FOLDER_ID,
  folderIdLength: FOLDER_ID?.length || 0
});

/**
 * Call YandexGPT API with free action
 */
export async function processYandexGPTAction({
  playerAction,
  scene,
  stats,
  characters,
}) {
  // Use environment variables
  const apiKey = API_KEY;
  const folderId = FOLDER_ID;

  if (!apiKey || !folderId) {
    return {
      success: false,
      error: 'YandexGPT credentials not configured',
      narrative: 'Ошибка конфигурации AI. Проверьте настройки API.',
    };
  }
  try {
    const systemPrompt = await buildSystemPrompt(scene, stats, characters);
    const userPrompt = `Действие игрока: "${playerAction}"`;

    const requestBody = {
      modelUri: `gpt://${folderId}/yandexgpt-lite/latest`,
      completionOptions: {
        stream: false,
        temperature: 0.7,
        maxTokens: 1000,
      },
      messages: [
        {
          role: 'system',
          text: systemPrompt,
        },
        {
          role: 'user',
          text: userPrompt,
        },
      ],
    };

    const response = await fetch(YANDEX_GPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Api-Key ${apiKey}`,
        'x-folder-id': folderId,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`YandexGPT API Error: ${errorData.message || response.statusText}`);
    }

    const data = await response.json();
    const aiResponse = data.result.alternatives[0].message.text;

    // Parse JSON response from AI
    const parsed = parseAIResponse(aiResponse);
    
    return {
      success: true,
      ...parsed,
    };
  } catch (error) {
    console.error('YandexGPT Error:', error);
    return {
      success: false,
      error: error.message,
      // Fallback response
      narrative: 'Произошла ошибка обработки действия. Попробуйте другой вариант.',
      valid: false,
    };
  }
}

/**
 * Build system prompt with current context
 */
async function buildSystemPrompt(scene, stats, characters) {
  // Load base prompt
  const basePrompt = await loadPromptTemplate();
  
  // Replace placeholders
  return basePrompt
    .replace('{{location}}', scene.meta?.locId || 'unknown')
    .replace('{{scene_description}}', scene.text || '')
    .replace('{{characters}}', JSON.stringify(characters || []))
    .replace('{{honesty}}', stats.honesty || 0)
    .replace('{{cunning}}', stats.cunning || 0)
    .replace('{{reputation}}', stats.reputation || 0)
    .replace('{{charm}}', stats.charm || 0);
}

/**
 * Load prompt template
 */
async function loadPromptTemplate() {
  try {
    const response = await fetch('/data/prompts/system-prompt.txt');
    if (!response.ok) {
      throw new Error('Prompt file not found');
    }
    return await response.text();
  } catch (error) {
    console.error('Failed to load prompt template:', error);
    return getDefaultPrompt();
  }
}

/**
 * Parse AI response (expecting JSON)
 */
function parseAIResponse(text) {
  try {
    // Try to extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    // Fallback if not JSON
    return {
      valid: true,
      outcome: 'neutral',
      narrative: text,
      statsChange: {},
    };
  } catch (error) {
    console.error('Failed to parse AI response:', error);
    return {
      valid: true,
      outcome: 'neutral',
      narrative: text || 'Действие выполнено.',
      statsChange: {},
    };
  }
}

/**
 * Default prompt if file fails to load
 */
function getDefaultPrompt() {
  return `Ты — нарративный режиссёр визуальной новеллы "Alterra".
  
Интерпретируй действие игрока и ответь в формате JSON:
{
  "valid": true/false,
  "intent": "тип действия",
  "outcome": "success/neutral/failure",
  "narrative": "текст ответа 2-3 предложения",
  "statsChange": {"stat": value}
}`;
}

/**
 * Calculate probability with stat modifiers
 */
export function calculateProbability(intent, stats, baseProbability = 50) {
  let modifier = 0;
  
  switch (intent) {
    case 'social_interaction':
      modifier = stats.charm * 5;
      break;
    case 'manipulation':
      modifier = stats.cunning * 5;
      break;
    case 'investigation':
      modifier = stats.reputation * 3;
      break;
    case 'honest_approach':
      modifier = stats.honesty * 5;
      break;
    default:
      modifier = 0;
  }
  
  return Math.min(95, Math.max(5, baseProbability + modifier));
}

/**
 * Roll for outcome
 */
export function rollOutcome(probability) {
  const roll = Math.random() * 100;
  
  if (roll <= probability * 0.2) return 'critical_failure';
  if (roll <= probability * 0.6) return 'failure';
  if (roll <= probability) return 'neutral';
  if (roll <= probability + (100 - probability) * 0.7) return 'success';
  return 'critical_success';
}

