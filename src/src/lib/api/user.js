import { request } from "./request";

export const listUser = async () => {
  return request.get("user/list");
};

export const deleteUser = async id => {
  return request.delete("user/delete?id=" + id);
};

export const createUser = async payload => {
  return request.post("user/new", payload);
};

export const getUser = async payload => {
  return request.post(
    "user/get?username=" + payload.username + "&password=" + payload.password,
    payload
  );
};

export const updateUser = async payload => {
  return request.post("user/edit", payload);
};
