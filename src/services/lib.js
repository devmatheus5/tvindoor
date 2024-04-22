import Axios from "axios";

const axios = Axios.create({
  baseURL: "https://api.rutherles.pt",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
  withXSRFToken: true,
});

export default axios;
