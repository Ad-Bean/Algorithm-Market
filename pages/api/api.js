import axios from "axios";

export const baseUrl = process.env.NEXT_PUBLIC_PRODUCTION_ENV_VARIABLE;

const API = axios.create({
  baseURL: baseUrl,
  timeout: 1000,
});

export async function getList() {
  const response = await API.get("items");
  return response.data.data;
}

export async function getItem(id) {
  const response = await API.get(`items/${id}`);
  return response.data.data;
}

export async function getInput(id) {
  const response = await API.get(`items/${id}/inputs`);
  return response.data.data;
}

export async function getOutput(id) {
  const response = await API.get(`items/${id}/inputs`);
  return response.data.data;
}
