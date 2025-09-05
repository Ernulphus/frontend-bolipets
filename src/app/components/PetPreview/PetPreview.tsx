import React from 'react';
import styles from './PetPreview.module.css';
import { StaticImageData } from 'next/image';

interface PetPreviewProps {
  color: string,
  image: StaticImageData,
}

export default function PetPreview({color, image}: PetPreviewProps) {
  return (
    <div className={styles.pet_preview}>
      <div style={{backgroundColor: color}}/>
      <img
        src={image.src}
      />
    </div>
  )
}