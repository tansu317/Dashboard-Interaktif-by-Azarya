import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const getNasional = async () => {
    const res = await axios.get(`${API_URL}/nasional`);
    return res.data;
}

export const getNasionalByJenjang = async (jenjang: string) => {
  const res = await axios.get(`${API_URL}/nasional/jenjang/${jenjang}`);
  return res.data;
};

export const getProvinsi = async () => {
  const res = await axios.get(`${API_URL}/provinsi`);
  return res.data;
};

export const getProvinsiById = async (kode_pro: string) => {
  const res = await axios.get(`${API_URL}/provinsi/${kode_pro}`);
  return res.data;
};

export const getKabupatenById = async (kode_pro: string, kode_kab: string) => {
  const res = await axios.get(`${API_URL}/kabupaten/${kode_pro}/${kode_kab}`);
  return res.data;
};