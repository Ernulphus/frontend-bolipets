import axios from "axios";

const methods: { [key: string]: string } = {
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete',

  FORM: 'form',

}s

const epGroups: { [key: string]: string } = {
  PETS: 'Pets',
  USERS: 'Users',

}

const BACKEND_URL = (process.env.NEXT_PUBLIC_URL_PRE || 'http://127.0.0.1:8000');

function getURL(group:string, method:string) {
  if (!BACKEND_URL) throw new Error('No base URL');
  if (!Object.values(epGroups).includes(group)) throw new Error('Endpoint group not found');
  if (!Object.values(methods).includes(method)) throw new Error('Invalid method');

  const url = `${BACKEND_URL}/${group}/${method}`
  return url;

};

const readPets = () => {
  return new Promise((resolve, reject) => {
    axios.get(getURL(epGroups.PETS, methods.READ))
    .then(({ data }) => resolve(data))
    .catch(reject);
  })
};

const petsForm = () => {
  return new Promise((resolve, reject) => {
    axios.get(getURL(epGroups.PETS, methods.FORM))
    .then(({ data }) => resolve(data))
    .catch(reject);
  })
};

const deletePet = (_id: string) => {
  return new Promise((resolve, reject) => {
    axios.delete(`${epGroups.PETS}/${_id}`)
      .then(resolve)
      .catch(reject);
  })
}


export {
  epGroups,
  getURL,
  methods,

  readPets,
  petsForm,
  deletePet,
}