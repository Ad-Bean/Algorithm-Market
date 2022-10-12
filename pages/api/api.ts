import { DefaultResponse } from '@interfaces/DefaultResponse';
import { InputBody, Output, OutputResponse } from '@interfaces/Input';
import { ItemInfoResponse, ItemInformation, ItemsResponse } from '@interfaces/Items';
import { UserResponse } from '@interfaces/UserInfo';
import axios from 'axios';

export const baseUrl = process.env.NEXT_PUBLIC_PRODUCTION_ENV_VARIABLE;
axios.defaults.withCredentials = true;

const API = axios.create({
  baseURL: baseUrl,
  timeout: 1000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Response {}

export async function getList() {
  const response = await API.get<ItemsResponse>('items');
  return response.data.data;
}

export async function getItem(id: number) {
  const response = await API.get<ItemInfoResponse>(`items/${id}`);
  return response.data.data;
}

export async function postItem(item: ItemInformation) {
  const response = await API.post<DefaultResponse>(`items`, item);
  return response;
}

export async function putItem(id: number, item: ItemInformation) {
  const response = await API.put<DefaultResponse>(`items/${id}`, item);
  return response;
}

export async function deleteItem(id: number) {
  const response = await API.delete<DefaultResponse>(`items/${id}`);
  return response;
}

export async function postInput(input: InputBody) {
  const response = await API.post<OutputResponse>('/judge', input);
  return response.data;
}

export async function postSignup(
  username: string,
  email: string,
  password: string,
  avatar: string
) {
  const response = await API.post<DefaultResponse>('user/register', {
    username: username,
    password: password,
    avatar: avatar,
    email: email,
  });
  return response.data;
}

export async function postSignin(email: string, password: string) {
  const response = await API.post<UserResponse>('user/login', {
    email: email,
    password: password,
  });
  return response;
}

export async function getUserInfo() {
  const response = await API.get<UserResponse>('user/info');
  return response.data.data;
}

export async function userLogout() {
  const response = await API.delete<DefaultResponse>('user/logout');
  return response.data;
}
