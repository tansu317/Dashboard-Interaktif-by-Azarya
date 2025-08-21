import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { getProvinsiById } from "../api";

interface ProvinsiData {
  nama_wilayah: string;
  total_paud: number;
  total_sd: number;
  total_smp: number;
  total_sma: number;
}

interface Props {
  kodePro: string | null; // kode provinsi dari peta
}

const ProvinsiChart: React.FC<Props> = ({ kodePro }) => {
  const [data, setData] = useState<ProvinsiData | null>(null);

  useEffect(() => {
    if (kodePro) {
      getProvinsiById(kodePro).then((res) => {
        console.log("Provinsi API:", res);
        setData(res);
      });
    }
  }, [kodePro]);

  if (!kodePro) return <p>Pilih provinsi dari peta...</p>;
  if (!data) return <p>Loading data provinsi...</p>;

  const chartData = [
    { jenjang: "PAUD", jumlah: data.total_paud },
    { jenjang: "SD", jumlah: data.total_sd },
    { jenjang: "SMP", jumlah: data.total_smp },
    { jenjang: "SMA", jumlah: data.total_sma }
  ];

  return (
    <div>
      <h3>Data Provinsi: {data.nama_wilayah}</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <XAxis dataKey="jenjang" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="jumlah" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProvinsiChart;
