import axios from "axios";

export const HttpService = {
  tch: axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      "src": "TCH-WEB",
      "TCH-APP-VERSION": "5.3.0",
      "TCH-DEVICE-ID": "f244b5c1-f535-4784-9deb-c1177d69f2b2"
    }
  })
}
