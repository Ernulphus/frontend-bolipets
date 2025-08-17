'use client'

import React, { useEffect, useState } from 'react';
import Link from "next/link";

import style from './Pets.module.css';
 
import { epGroups, getURL, methods, readPets } from '@/app/utils/networkutils';

// const PETS_READ_ENDPOINT = getURL(epGroups.PETS, methods.READ);
// const PETS_CREATE_ENDPOINT = getURL(epGroups.PETS, methods.CREATE);

// type HTMLINPUTEVENT = React.ChangeEvent<HTMLInputElement>;
// type HTMLSELECTEVENT = React.ChangeEvent<HTMLSelectElement>

function ErrorMessage(props: ErrorMessageProps) {
  const { message } = props;
  return (
    <div className="error-message">
      {message}
    </div>
  );
}
interface ErrorMessageProps {
  message: string,
}

function Pet(props: PetProps) {
  const {
    petKey: key,
    pet,
   } = props;
  const { Name, color, eye, hunger, mood } = pet;

  return (
    <div key={key}>
      <div className={style.pet_container}>
        <h2>{Name}</h2>
        <p>
          Color: {color}
        </p>
        <p>
          Eye: {eye}
        </p>
        <p>
          Hunger: {hunger}
        </p>
        <p>
          Mood: {mood}
        </p>
      </div>
      {/* <button onClick={deletePet}>Delete pet</button> */}
    </div>
  );
}

interface Pet {
  Name: string,
  color: string,
  eye: string,
  hunger: number
  mood: number,
  _id: string,
}

interface PetProps {
  petKey?: string,
  pet: Pet,
  fetchPets: () => void,
  roleMap: { [key: string]: string }
}

interface petObject {
  [key: string]: Pet
}

function petsObjectToArray(Data: petObject) {
  const keys = Object.keys(Data);
  const pets = keys.map((key) => Data[key]);
  return pets;
}


function Pets() {
  const [error, setError] = useState('');
  const [pets, setPets] = useState([] as Pet[]);
  const [addingPet, setAddingPet] = useState(false);
  const [roleMap, setRoleMap] = useState({});


  const fetchPets = () => {
    readPets()
      .then(
        (data) => { setPets(petsObjectToArray(data as petObject)) }
      )
      .catch((error: string) => setError(`There was a problem retrieving the list of people. ${error}`));
  };

  const hideAddPetForm = () => { setAddingPet(false); };

  useEffect(fetchPets, []);

  return (
    <div className="wrapper">
      <header>
        <h1>
          View All Pets
        </h1>
        <Link href="CreatePet">
          <button type="button">
            Add a Pet
          </button>
        </Link>
      </header>
      {error && <ErrorMessage message={error} />}
      {
      pets.map((pet) => 
        (<Pet
          key={pet['_id']}
          petKey={pet['_id']}
          pet={pet}
          fetchPets={fetchPets}
          roleMap={roleMap}
        />)
      )
      }
    </div>
  );
}

export default Pets;
