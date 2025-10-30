import React from 'react';
import styles from './PetPreview.module.css';
import { pet_images } from '@/app/constants';

interface PetPreviewProps {
  color: string | undefined,
  pet: keyof typeof pet_images | undefined,
}

export default function PetPreview({color, pet}: PetPreviewProps) {
  console.log('In petpreview', color, pet);
  const defaultImageURL = `url('/PetImages/${pet}/${pet}.png')`
  if (!pet) return;
  return (
    <div className={styles.pet_preview}>
      <div style={{
        backgroundColor: color,
        maskImage: defaultImageURL,
        WebkitMaskImage: defaultImageURL,
      }}/>
      <img
        src={pet_images[pet].TRANSPARENT.src}
      />
    </div>
  )
}