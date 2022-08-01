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

export async function getOutput(itemId, inputId) {
  const response = await API.get(`items/${itemId}/inputs/${inputId}/output`);
  return response.data.data;
}

export async function postSignup(username, email, password, avatar) {
  const response = await API.post("user/register", {
    username: username,
    password: password,
    avatar: avatar,
    email: email,
  });
  return response.data;
}

export async function postSignin(email, password) {
  const response = await API.post(
    "user/login",
    {
      email: email,
      password: password,
    },
    { withCredentials: true }
  );
  return response;
}

export async function getUserInfo() {
  const response = await API.get("user/info");
  return response.data;
}
