import { useState, useEffect } from "react";
import { Card, CardContent } from "../components/Card";

type KPIData = {
  totalSekolah: number;
  totalAnggaran: string;
  provinsiTop: { nama: string; jumlah: number };
  kabupatenTop: { nama: string; anggaran: string };
};

const formatRupiah = (num: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(num);

const DashboardKPI = () => {
  const [data, setData] = useState<KPIData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/nasional/kpi")
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetch KPI:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading KPI...</p>;
  if (!data) return <p>Data KPI tidak tersedia</p>;

  const items = [
    {
      label: "Total Sekolah Direvitalisasi",
      value: data.totalSekolah.toLocaleString("id-ID"),
    },
    {
      label: "Total Anggaran Revitalisasi",
      value: formatRupiah(Number(data.totalAnggaran)),
    },
    {
      label: "Provinsi dengan Sekolah Terbanyak",
      value: `${data.provinsiTop.nama} (${data.provinsiTop.jumlah.toLocaleString(
        "id-ID"
      )} sekolah)`,
    },
    {
      label: "Kab/Kota dengan Anggaran Terbesar",
      value: `${data.kabupatenTop.nama} (${formatRupiah(
        Number(data.kabupatenTop.anggaran)
      )})`,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {items.map((item, idx) => (
        <Card
          key={idx}
          className="shadow-md rounded-xl bg-white dark:bg-gray-800"
        >
          <CardContent>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {item.label}
            </p>
            <h2 className="text-2xl font-bold text-red-600 dark:text-red-400">
              {item.value}
            </h2>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardKPI;
