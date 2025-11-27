/**
 * Build character image path from character object
 * Supports new format: { id, emotion, outfit, hair }
 * Falls back to direct image path if provided
 */
export function buildCharacterPath(character) {
  if (!character) return null;
  
  // If direct image path is provided, use it
  if (character.image) {
    return character.image;
  }
  
  // Build path from character components
  const { id, emotion } = character;
  if (!id) return null;
  
  // Normalize character ID - capitalize first letter to match folder structure
  const normalizedId = id.charAt(0).toUpperCase() + id.slice(1);
  const basePath = `/assets/characters/${normalizedId}`;
  
  // Some characters have base/emotion structure (Anna, Lisa), others are direct files
  // Characters with base folder: Anna, Lisa
  // Characters without base folder: chinovnik, editor, stranger, uchastkoviy
  if (emotion) {
    // Characters with base folder structure (Anna, Lisa)
    if (normalizedId === 'Anna' || normalizedId === 'Lisa') {
      // Lisa uses .png, Anna uses .PNG
      const ext = normalizedId === 'Lisa' ? '.png' : '.PNG';
      return `${basePath}/base/${emotion}${ext}`;
    }
  }
  
  // For characters without emotion or base folder, try direct file in their folder
  // chinovnik/chinovnik.PNG, editor/editor.PNG, stranger/stranger.png, uchastkoviy/police.png
  if (normalizedId === 'Chinovnik') {
    return `${basePath}/chinovnik.PNG`;
  } else if (normalizedId === 'Editor') {
    return `${basePath}/editor.PNG`;
  } else if (normalizedId === 'Stranger') {
    return `${basePath}/stranger.png`;
  } else if (normalizedId === 'Uchastkoviy' || id.toLowerCase() === 'police') {
    return `${basePath}/police.png`;
  }
  
  // Default fallback
  return `${basePath}/base/neutral.PNG`;
}

