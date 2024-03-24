import axios from "axios";
//import AxiosMockAdapter from "axios-mock-adapter";

const client = axios.create({
  baseURL: "http://localhost:9000/v1",
});

//export const mock = new AxiosMockAdapter(client, { delayResponse: 1000 });

export default client;
