import axios from "axios";

const client = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

// Você pode adicionar interceptors se quiser
client.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("[API ERROR]", error?.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default client;
