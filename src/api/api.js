import axios from "axios";

const BASE_URL = "https://t4e-testserver.onrender.com/api";

// 🔑 Get Token
export const getToken = async (studentId, password, dataset) => {
  const res = await axios.post(`${BASE_URL}/auth`, {
    studentId,
    password,
    dataset,
  });

  return res.data;
};

// 📦 Get Dataset
export const getDataset = async (token, url) => {
  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};