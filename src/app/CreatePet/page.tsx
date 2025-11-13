'use client'

import { petsCreate, petsForm } from '@/app/utils/networkutils';
import React, { useState, useEffect } from 'react';
import Form, { questionObj, getQuestionValue } from '@/app/components/Form/Form';
import PetPreview from '@/app/components/PetPreview/PetPreview';
import { auth0 } from '@/lib/auth0';
import StrangerRedirect from '@/lib/StrangerRedirect';

import { pet_images } from '../constants';

export default async function CreatePet() {
  const session = await auth0.getSession()
  const res = await StrangerRedirect(session)
  if (res) return res;
  if (!session) return res;
  
  const titleText = 'Your new Bolipet!'
  const [form, setForm] = useState<[questionObj] | undefined>();
  
  const submitPet = (formData: FormData) => {
    return {
      email: session.user.email,
      name: session.user.name,
      ...formData,
    };
  }

  useEffect(() => {
    petsForm()
      .then((data) => setForm(data as any)); // eslint-disable-line @typescript-eslint/no-explicit-any
  }, [])
  return (
    <div className="m-5 flex flex-col items-center">
      <div>
        <h1 className="text-6xl">{titleText}</h1>
        <div className="flex flex-row">
          <Form
            questions={form}
            onSubmit={submitPet}
            images={pet_images}
            setForm={setForm}
          />
          <PetPreview
            color={getQuestionValue(form, 'color')}
            pet={getQuestionValue(form, 'species') as keyof typeof pet_images} 
          />
        </div>
      </div>
    </div>
  )
}
