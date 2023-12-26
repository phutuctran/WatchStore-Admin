import { request } from "./request";

export const createCategory = async payload => {
  return request.post("categories/new", payload);
};

export const listCategory = async () => {
  return request.get("categories/list");
};

export const deleteCategory = async id => {
  return request.delete("categories/delete?id=" + id);
};

export const getDetailCategory = async id => {
  return request.get("categories/" + id);
};

export const updateCategory = async payload => {
  return request.post("categories/edit", payload);
};
