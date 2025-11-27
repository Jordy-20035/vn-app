import React from "react";
import { buildCharacterPath } from "../utils/characterPath";

/**
 * CharacterSprite - Renders a character with layered images (base + hair + outfit)
 * Supports: { id, emotion, outfit, hair }
 */
export default function CharacterSprite({ character, style = {} }) {
  if (!character) return null;

  // If direct image path is provided, use it (legacy support)
  if (character.image) {
    return (
      <img
        src={character.image}
        alt={character.id}
        style={{
          height: '100%',
          width: 'auto',
          maxWidth: 'none',
          objectFit: 'contain',
          transform: `scale(${character.scale || 1})`,
          transformOrigin: 'bottom center',
          ...style
        }}
      />
    );
  }

  const { id, emotion, outfit, hair } = character;
  if (!id) return null;

  // Normalize character ID
  const normalizedId = id.charAt(0).toUpperCase() + id.slice(1);
  const basePath = `/assets/characters/${normalizedId}`;

  // Build paths for each layer
  const getBasePath = () => {
    if (!emotion) return null;
    const ext = normalizedId === 'Lisa' ? '.png' : '.PNG';
    return `${basePath}/base/${emotion}${ext}`;
  };

  const getHairPath = () => {
    if (!hair) return null;
    // Hair files use .PNG for Anna
    const ext = normalizedId === 'Lisa' ? '.png' : '.PNG';
    // Handle spaces in filenames - keep them as they are in the filename
    return `${basePath}/hair/${hair}${ext}`;
  };

  const getOutfitPath = () => {
    if (!outfit) return null;
    // Outfit files: home_1 uses .png, others use .PNG
    const ext = outfit.includes('home_1') || outfit.includes('outfit') ? '.png' : '.PNG';
    return `${basePath}/outfit/${outfit}${ext}`;
  };

  const baseImage = getBasePath();
  const hairImage = getHairPath();
  const outfitImage = getOutfitPath();

  // For characters without base folder structure
  if (normalizedId === 'Chinovnik') {
    return (
      <img
        src={`${basePath}/chinovnik.PNG`}
        alt={id}
        style={{
          height: '100%',
          width: 'auto',
          maxWidth: 'none',
          objectFit: 'contain',
          transform: `scale(${character.scale || 1})`,
          transformOrigin: 'bottom center',
          ...style
        }}
      />
    );
  } else if (normalizedId === 'Editor') {
    return (
      <img
        src={`${basePath}/editor.PNG`}
        alt={id}
        style={{
          height: '100%',
          width: 'auto',
          maxWidth: 'none',
          objectFit: 'contain',
          transform: `scale(${character.scale || 1})`,
          transformOrigin: 'bottom center',
          ...style
        }}
      />
    );
  } else if (normalizedId === 'Stranger') {
    return (
      <img
        src={`${basePath}/stranger.png`}
        alt={id}
        style={{
          height: '100%',
          width: 'auto',
          maxWidth: 'none',
          objectFit: 'contain',
          transform: `scale(${character.scale || 1})`,
          transformOrigin: 'bottom center',
          ...style
        }}
      />
    );
  } else if (normalizedId === 'Uchastkoviy' || id.toLowerCase() === 'police') {
    return (
      <img
        src={`${basePath}/police.png`}
        alt={id}
        style={{
          height: '100%',
          width: 'auto',
          maxWidth: 'none',
          objectFit: 'contain',
          transform: `scale(${character.scale || 1})`,
          transformOrigin: 'bottom center',
          ...style
        }}
      />
    );
  }

  // For characters with layered structure (Anna, Lisa)
  if (!baseImage) {
    console.warn('CharacterSprite: No base emotion provided for', id);
    return null;
  }

  return (
    <div
      style={{
        position: 'relative',
        height: '100%',
        width: 'auto',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        transform: `scale(${character.scale || 1})`,
        transformOrigin: 'bottom center',
        ...style
      }}
    >
      {/* Base layer (emotion) */}
      <img
        src={baseImage}
        alt={`${id} base`}
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          height: '100%',
          width: 'auto',
          maxWidth: 'none',
          objectFit: 'contain',
          zIndex: 1,
        }}
        onError={(e) => {
          console.error('Failed to load base image:', baseImage);
          e.target.style.display = 'none';
        }}
      />
      
      {/* Hair layer */}
      {hairImage && (
        <img
          src={hairImage}
          alt={`${id} hair`}
          style={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            height: '100%',
            width: 'auto',
            maxWidth: 'none',
            objectFit: 'contain',
            zIndex: 2,
          }}
          onError={(e) => {
            console.error('Failed to load hair image:', hairImage);
            e.target.style.display = 'none';
          }}
        />
      )}
      
      {/* Outfit layer */}
      {outfitImage && (
        <img
          src={outfitImage}
          alt={`${id} outfit`}
          style={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            height: '100%',
            width: 'auto',
            maxWidth: 'none',
            objectFit: 'contain',
            zIndex: 3,
          }}
          onError={(e) => {
            console.error('Failed to load outfit image:', outfitImage);
            e.target.style.display = 'none';
          }}
        />
      )}
    </div>
  );
}

