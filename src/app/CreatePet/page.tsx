'use client'

import { petsCreate, petsForm } from '@/app/utils/networkutils';
import React, { useState, useEffect } from 'react';
import Form, { questionObj } from '@/app/components/Form/Form';

import Glorpimus from '../components/PetImages/glorpimus.jpg';
import Bingus from '../components/PetImages/bingus.png';
import Jerma from '../components/PetImages/jerma.png';
import Jinx from '../components/PetImages/jinx.png';
import Marble from '../components/PetImages/marble.png';
import Marth from '../components/PetImages/marth.png';
import Missingno from '../components/PetImages/missingno.png';
import Trilobite from '../components/PetImages/trilobite.png';


export default function CreatePet() {
  const titleText = 'Your new Bolipet!'
  const [form, setForm] = useState<[questionObj] | undefined>();
  
  useEffect(() => {
    petsForm()
      .then((data) => setForm(data as any));

  }, [])

  const images = {
    species: {
      'glorpimus': Glorpimus,
      'bingus': Bingus,
      'jerma': Jerma,
      'jinx': Jinx,
      'marble': Marble,
      'marth': Marth,
      'missingno': Missingno,
      'trilobite': Trilobite,
    },
  };

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
