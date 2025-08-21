import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { getNasional } from "../api";

interface NasionalData {
  total_paud: number;
  total_sd: number;
  total_smp: number;
  total_sma: number;
}

const NasionalChart: React.FC = () => {
  const [data, setData] = useState<NasionalData | null>(null);

  useEffect(() => {
    getNasional().then(setData);
  }, []);

  if (!data) return <p>Loading...</p>;

  const chartData = [
    { jenjang: "PAUD", jumlah: data.total_paud },
    { jenjang: "SD", jumlah: data.total_sd },
    { jenjang: "SMP", jumlah: data.total_smp },
    { jenjang: "SMA", jumlah: data.total_sma }
  ];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={chartData}>
        <XAxis dataKey="jenjang" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="jumlah" fill="aqua" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default NasionalChart;