import Axios from "axios";

const baseURL = "http://localhost:8080/";

export const request = Axios.create({
  baseURL,
});
