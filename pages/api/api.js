import axios from "axios";

export const baseUrl = "https://market.lanly.vip/api/";

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
