'use client'

import { petsForm } from '@/app/utils/networkutils';
import React, { useState, useEffect } from 'react';
import Form, { questionObj } from '@/app/components/Form/Form';

export default function CreatePet() {
  const titleText = 'Your new Bolipet!'
  const [form, setForm] = useState<[questionObj] | undefined>();
  
  useEffect(() => {
    petsForm()
      .then((data) => setForm(data as any));

  }, [])

  console.log('form', form);
  return (
    <div className="m-5">
      <h1>{titleText}</h1>
      <Form questions={form} />
    </div>
  )
}
