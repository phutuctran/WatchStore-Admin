import { request } from "./request";


export const listOrder = async () => {
  return request.get("orders/list");
};

export const getDetailOrder = async (id) => {
  return request.get("orders/get/?id=" + id);
};


