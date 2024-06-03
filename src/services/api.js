import axios from "axios";

export const api = axios.create({
    baseURL: "https://food-explorer-back-1uvz.onrender.com"
});
