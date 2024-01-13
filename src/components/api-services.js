import axios from "axios";

export const BaseUrl = axios.create({
    baseURL: "http://192.168.0.113:8000/",
    headers: {
        "Content-type": "application/json"
    }
    });