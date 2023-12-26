import { request } from "./request";

export const createBanner = async (payload) => {
  return request.post("banner/new", payload);
};

export const listBanner = async () => {
  return request.get("banner/list");
};

export const deleteBanner = async (id) => {
  return request.delete("banner/delete?id=" + id);
};

export const getDetailBanner = async (id) => {
  return request.get("banner/" + id);
};

export const updateBanner = async (payload) => {
  return request.post("banner/edit", payload);
};
