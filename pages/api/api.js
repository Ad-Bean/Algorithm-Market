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

export async function getOutput(itemId, inputId) {
  const response = await API.get(`items/${itemId}/inputs/${inputId}/output`);
  return response.data.data;
}

export async function postSignup(username, email, password, password_confirm, avatar) {
  const response = await API.post("user/register", {
    username: username,
    password: password,
    password_confirm: password_confirm,
    avatar: avatar,
    email: email,
  });
  return response.data.data;
}
