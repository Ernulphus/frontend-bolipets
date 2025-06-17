'use client'

import { epGroups, getURL, methods } from '@/app/utils/networkutils';
import React, { useState, useEffect } from 'react';

export default function CreatePet() {
  const titleText = 'Your new Bolipet!'
  const [form, setForm] = useState({});
  
  useEffect(() => {
    getURL(epGroups.PETS, methods.FORM);

    console.log(form);
  }, [])
  return (
    <div>
      <h1>{titleText}</h1>
    </div>
  )
}