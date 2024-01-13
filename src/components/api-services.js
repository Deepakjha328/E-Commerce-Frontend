import axios from "axios";

export const BaseUrl = axios.create({
    baseURL: "http://54.81.65.130:8000/",
    headers: {
        "Content-type": "application/json"
    }
    });