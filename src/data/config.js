import axios from "axios";
const baseURL = 'http://localhost:5000/';
const Api = axios.create({ baseURL });
export { Api };
