import axios from "axios";

export const baseUrl = process.env.NEXT_PUBLIC_PRODUCTION_ENV_VARIABLE;
axios.defaults.withCredentials = true;

const API = axios.create({
  baseURL: baseUrl,
  timeout: 1000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface Response {}

export async function getList() {
  const response = await API.get("items");
  return response.data.data;
}

export async function getItem(id: number) {
  const response = await API.get(`items/${id}`);
  return response.data.data;
}

export async function getInput(id: number) {
  const response = await API.get(`items/${id}/inputs`);
  return response.data.data;
}

export async function getOutput(itemId: number, inputId: number) {
  const response = await API.get(`items/${itemId}/inputs/${inputId}/output`);
  return response.data.data;
}

export async function postSignup(
  username: string,
  email: string,
  password: string,
  avatar: string
) {
  const response = await API.post("user/register", {
    username: username,
    password: password,
    avatar: avatar,
    email: email,
  });
  return response.data;
}

export async function postSignin(email: string, password: string) {
  const response = await API.post("user/login", {
    email: email,
    password: password,
  });
  return response;
}

export async function getUserInfo() {
  const response = await API.get("user/info");
  return response.data.data;
}
