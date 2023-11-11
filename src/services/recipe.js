import axios from "axios";

axios.defaults.withCredentials = true;
const URL = process.env.NEXT_PUBLIC_API_URL + "/recipe";

export const uploadImages = async (data) => {
  return await axios.post(`${URL}/upload-images`, data);
};

export const addRecipe = async (data) => {
  return await axios.post(`${URL}/create`, data);
};

export const rateRecipe = async (data) => {
  return await axios.post(`${URL}/rating`, data);
};
