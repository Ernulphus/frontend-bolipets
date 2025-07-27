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

// function AddPetForm(props: AddPetFormProps) {
//   const {
//     visible,
//     cancel,
//     fetchPets,
//     setError,
//     roleOptions,
//   } = props;
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [role, setRole] = useState('');

//   const changeName = (event: HTMLINPUTEVENT) => { setName(event.target.value); };
//   const changeEmail = (event: HTMLINPUTEVENT) => { setEmail(event.target.value); };
//   const changeRole = (event: HTMLSELECTEVENT) => { setRole(event.target.value); };

//   const addPet = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
//     event.preventDefault();
//     const newPet = {
//       name: name,
//       email: email,
//       roles: role,
//       affiliation: '',
//     }
//     axios.put(PETS_CREATE_ENDPOINT, newPet)
//       .then(fetchPets)
//       .catch((error) => { setError(`There was a problem adding the pet. ${error}`); });
//   };

//   if (!visible) return null;
//   return (
//     <form>
//       <label htmlFor="name">
//         Name
//       </label>
//       <input required type="text" id="name" value={name} onChange={changeName} />
//       <label htmlFor="email">
//         Email
//       </label>
//       <input required type="text" id="email" onChange={changeEmail} />
//       <select required name='role' onChange={changeRole}>
//         {
//           Object.keys(roleOptions).map((code) => (
//             <option key={code} value={code}>
//               {roleOptions[code]}
//             </option>
//           ))
//         }
//       </select>

//       <button type="button" onClick={cancel}>Cancel</button>
//       <button type="submit" onClick={addPet}>Submit</button>
//     </form>
//   );
// }
// interface AddPetFormProps {
//   visible: boolean,
//   cancel: () => void,
//   fetchPets: () => void,
//   // setError: (arg0?: string) => void,
//   setError: React.Dispatch<React.SetStateAction<string>>,
//   roleOptions: { [key: string]: string },
// }