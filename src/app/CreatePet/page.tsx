'use client'

import { petsCreate, petsForm } from '@/app/utils/networkutils';
import React, { useState, useEffect } from 'react';
import Form, { questionObj } from '@/app/components/Form/Form';

import { images } from '../constants';

export default function CreatePet() {
  const titleText = 'Your new Bolipet!'
  const [form, setForm] = useState<[questionObj] | undefined>();
  
  useEffect(() => {
    petsForm()
      .then((data) => setForm(data as any));

  }, [])

  return (
    <div className="m-5">
      <h1>{titleText}</h1>
      <Form
        questions={form}
        onSubmit={petsCreate}
        images={images}
      />
    </div>
  )
}
