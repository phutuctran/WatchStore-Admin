import { request } from "./request";

export const createShop = async payload => {
  return request.post("shop/new", payload);
};

export const listShop = async () => {
  return request.get("shop/list");
};

export const getDetailShop = async id => {
  return request.get("shop/" + id);
};

export const updateShop = async payload => {
  return request.post("shop/edit", payload);
};
