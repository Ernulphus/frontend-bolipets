'use client'

import { petsForm } from '@/app/utils/networkutils';
import React, { useState, useEffect } from 'react';
import Form from '@/app/components/Form/Form';

export default function CreatePet() {
  const titleText = 'Your new Bolipet!'
  const [form, setForm] = useState({});
  
  useEffect(() => {
    petsForm()
      .then((data) => setForm(data as {}));

  }, [])

  console.log(form);
  return (
    <div>
      <h1>{titleText}</h1>
      <Form questions={form} />
    </div>
  )
}