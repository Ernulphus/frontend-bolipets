import React from 'react';
import styles from './PetPreview.module.css';
import { pet_images } from '@/app/constants';

interface PetPreviewProps {
  color: string,
  pet: keyof typeof pet_images,
}

export default function PetPreview({color, pet}: PetPreviewProps) {
  return (
    <div className={styles.pet_preview}>
      <div style={{
        backgroundColor: color,
        maskImage: `url('../PetImages/${pet}.png')`
      }}/>
      <img
        src={pet_images[pet].TRANSPARENT.src}
      />
    </div>
  )
}