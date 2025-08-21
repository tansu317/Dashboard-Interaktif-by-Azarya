import { useEffect, useState } from "react";
import { Card, CardContent } from "../components/Card";
import AnggaranPieChart from "./AnggaranPieChart";
import RevitalisasiBarLineChart from "./RevitalisasiBarLineChartProv";
import DashboardKPI from "./DashboardKPI";

type NasionalData = {
  total_paud: number;
  total_sd: number;
  total_smp: number;
  total_sma: number;
  total_sekolah: number;
  total_anggaran_paud: number;
  total_anggaran_sd: number;
  total_anggaran_smp: number;
  total_anggaran_sma: number;
  total_anggaran: number;
};

type ProvinsiRow = {
  nama_provinsi: string;
  total_sekolah: number;
  total_anggaran: number;
};

const formatRupiah = (num: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(num);
};

const NasionalView = ({ data }: { data: NasionalData }) => {
    const [provinsiData, setProvinsiData] = useState<ProvinsiRow[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:5000/api/provinsi")
        .then((res) => res.json())
        .then((result) => {
            setProvinsiData(result);
            setLoading(false);
        })
        .catch((err) => {
            console.error("Error ambil data provinsi:", err);
            setLoading(false);
        });
    }, []);

  const items = [
    { label: "Total Revitalisasi Sekolah", value: data.total_sekolah.toLocaleString("id-ID") },
    { label: "Total Anggaran Revitalisasi", value: formatRupiah(data.total_anggaran) },
    { label: "Revitalisasi Sekolah PAUD", value: data.total_paud.toLocaleString("id-ID") },
    { label: "Anggaran Revitalisasi PAUD", value: formatRupiah(data.total_anggaran_paud) },
    { label: "Revitalisasi Sekolah SD", value: data.total_sd.toLocaleString("id-ID") },
    { label: "Anggaran Revitalisasi SD", value: formatRupiah(data.total_anggaran_sd) },
    { label: "Revitalisasi Sekolah SMP", value: data.total_smp.toLocaleString("id-ID") },
    { label: "Anggaran Revitalisasi SMP", value: formatRupiah(data.total_anggaran_smp) },
    { label: "Revitalisasi Sekolah SMA", value: data.total_sma.toLocaleString("id-ID") },
    { label: "Anggaran Revitalisasi SMA", value: formatRupiah(data.total_anggaran_sma) },
  ];

  return (
    <div className="">   
    <h2>Nasional - Indonesia</h2>
      {items.map((item, idx) => (
        <Card key={idx} className="shadow-md rounded-xl">
          <CardContent>
            <p className="text-gray-500 text-sm">{item.label}</p>
            <h2 className="text-xl font-bold">{item.value}</h2>
          </CardContent>
        </Card>
      ))}
      <div className="mt-6">
        <h2>Anggaran Revitalisasi Sekolah Berdasarkan Bentuk Pendidikan - Nasional</h2>
        <AnggaranPieChart data={data} />
      </div>

      {provinsiData.length > 0 && (
        <div className="mt-10">
          <h2 className="font-bold text-lg mb-2 text-red-600 text-center">
            Banyaknya Revitalisasi Sekolah berdasarkan Anggaran Revitalisasi Berdasarkan Provinsi
          </h2>
          <p>Silahkan Klik Bar setiap Provinsi untuk melihat Detail Data per Jenjang! (Bonus Project)</p>
          <RevitalisasiBarLineChart data={provinsiData} />
        </div>
      )}
    </div>
  );
};

export default NasionalView;
