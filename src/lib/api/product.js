import { request } from "./request";

export const createProduct = async payload => {
  return request.post("products/new", payload);
};

export const listProduct = async () => {
  return request.get("products/list");
};

export const deleteProduct = async (idCategory, idProduct) => {
  return request.delete(
    "categories/delete/product?idC=" + idCategory + "&idP=" + idProduct
  );
};

export const getDetailProduct = async id => {
  return request.get("products/" + id);
};

export const updateProduct = async payload => {
  return request.post("products/edit", payload);
};
