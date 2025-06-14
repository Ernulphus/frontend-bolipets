'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from "next/link";

import style from './Pets.module.css';
 
import { epGroups, getURL, methods } from '@/app/utils/networkutils';

const PETS_READ_ENDPOINT = getURL(epGroups.PETS, methods.READ);
const PETS_CREATE_ENDPOINT = getURL(epGroups.PETS, methods.CREATE);

type HTMLINPUTEVENT = React.ChangeEvent<HTMLInputElement>;
type HTMLSELECTEVENT = React.ChangeEvent<HTMLSelectElement>

function AddPetForm(props: AddPetFormProps) {
  const {
    visible,
    cancel,
    fetchPets,
    setError,
    roleOptions,
  } = props;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  const changeName = (event: HTMLINPUTEVENT) => { setName(event.target.value); };
  const changeEmail = (event: HTMLINPUTEVENT) => { setEmail(event.target.value); };
  const changeRole = (event: HTMLSELECTEVENT) => { setRole(event.target.value); };

  const addPet = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    const newPet = {
      name: name,
      email: email,
      roles: role,
      affiliation: '',
    }
    axios.put(PETS_CREATE_ENDPOINT, newPet)
      .then(fetchPets)
      .catch((error) => { setError(`There was a problem adding the pet. ${error}`); });
  };

  if (!visible) return null;
  return (
    <form>
      <label htmlFor="name">
        Name
      </label>
      <input required type="text" id="name" value={name} onChange={changeName} />
      <label htmlFor="email">
        Email
      </label>
      <input required type="text" id="email" onChange={changeEmail} />
      <select required name='role' onChange={changeRole}>
        {
          Object.keys(roleOptions).map((code) => (
            <option key={code} value={code}>
              {roleOptions[code]}
            </option>
          ))
        }
      </select>

      <button type="button" onClick={cancel}>Cancel</button>
      <button type="submit" onClick={addPet}>Submit</button>
    </form>
  );
}
interface AddPetFormProps {
  visible: boolean,
  cancel: () => void,
  fetchPets: () => void,
  // setError: (arg0?: string) => void,
  setError: React.Dispatch<React.SetStateAction<string>>,
  roleOptions: { [key: string]: string },
}

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
    key,
    pet,
    fetchPets,
    roleMap,
   } = props;
  const { Name, color, eye, hunger, mood } = pet;

  // const deletePet = () => {
  //   axios.delete(`${PETS_READ_ENDPOINT}/${email}`)
  //     .then(fetchPets)
  // }

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
  key?: string,
  pet: Pet,
  fetchPets: () => void,
  roleMap: { [key: string]: string }
}

interface petObject {
  [key: string]: Pet
}

function peopleObjectToArray(Data: petObject) {
  const keys = Object.keys(Data);
  const people = keys.map((key) => Data[key]);
  return people;
}

interface receivedData {
  data: string
}


function Pets() {
  const [error, setError] = useState('');
  const [pets, setPets] = useState([] as Pet[]);
  const [addingPet, setAddingPet] = useState(false);
  const [roleMap, setRoleMap] = useState({});


  const fetchPets = () => {
    axios.get(PETS_READ_ENDPOINT)
      .then(
        ({ data }: receivedData) => { setPets(peopleObjectToArray(data)) }
    )
      .catch((error: string) => setError(`There was a problem retrieving the list of people. ${error}`));
  };

  const showAddPetForm = () => { setAddingPet(true); };
  const hideAddPetForm = () => { setAddingPet(false); };

  useEffect(fetchPets, []);

  console.log(pets);
  return (
    <div className="wrapper">
      <header>
        <h1>
          View All Pets
        </h1>
        <button type="button" onClick={showAddPetForm}>
          Add a Pet
        </button>
      </header>
      <AddPetForm
        visible={addingPet}
        cancel={hideAddPetForm}
        fetchPets={fetchPets}
        setError={setError}
        roleOptions={roleMap}
      />
      {error && <ErrorMessage message={error} />}
      {
      pets.map((pet) => 
        (<Pet
          key={pet['_id']}
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
