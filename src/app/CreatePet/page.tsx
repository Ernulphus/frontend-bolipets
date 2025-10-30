'use client'

import { petsCreate, petsForm } from '@/app/utils/networkutils';
import React, { useState, useEffect } from 'react';
import Form, { questionObj } from '@/app/components/Form/Form';
import PetPreview from '@/app/components/PetPreview/PetPreview';

import { pet_images } from '../constants';

interface qsObj {
  [key: string]: questionObj,
}

export default function CreatePet() {
  const titleText = 'Your new Bolipet!'
  const [form, setForm] = useState<[questionObj] | undefined>();
  
  useEffect(() => {
    petsForm()
      .then((data) => setForm(data as any));

  }, [])

  const questionsListToObj = (questions: [questionObj]) => {
    const qObj: qsObj = {};
    questions.forEach((q) => qObj[q['fld_nm']] = q);
    return qObj;
  };

  const getQuestionValue = (fld_nm: string) => {
    if (!form) return '#ffffff';
    return questionsListToObj(form)[fld_nm]['value'];
  }

  return (
    <div className="m-5">
      <h1>{titleText}</h1>
      <Form
        questions={form}
        onSubmit={petsCreate}
        images={pet_images}
        setForm={setForm}
      />
      <PetPreview color={getQuestionValue('color')} pet='esquardo' />

    </div>
  )
}
