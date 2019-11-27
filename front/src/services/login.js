import axios from 'axios';
const baseUrl = '/api/login';

const login = async credentials => {
  console.log('login.js',credentials);
  const response = await axios.post(baseUrl, credentials);
  console.log('services/login.js',response);
  return response.data;
};

export default { login };