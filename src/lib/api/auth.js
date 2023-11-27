import { request } from "./request";

export const login = async payload => {
  return request.post(
    "user/get?username=" + payload.username + "&password=" + payload.password,
    payload
  );
};
