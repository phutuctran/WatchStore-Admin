import { request } from "./request";

export const createPromotion = async (payload) => {
  return request.post("promotion/new", payload);
};

export const listPromotion = async () => {
  return request.get("promotion/list");
};

export const deletePromotion = async (id) => {
  return request.delete("promotion/delete?id=" + id);
};

export const getDetailPromotion = async (id) => {
  return request.get("promotion/" + id);
};

export const updatePromotion = async (payload) => {
  return request.post("promotion/edit", payload);
};
