import { useEffect, useState } from "react";
import AnggaranPieChart from "./AnggaranPieChart";
import RevitalisasiBarLineChart from "./RevitalisasiBarLineChartProv";

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
      <div className="container my-4">
        <h4 className="mb-5 fw-bold text-center">Nasional - Indonesia</h4>

        {/* Card Grid */}
        <div className="row g-3">
          {items.map((item, idx) => (
            <div className="col-md-6" key={idx}>
              <div className="card shadow-sm h-100">
                <div className="card-body text-center">
                  <p className="text-muted small mb-1">{item.label}</p>
                  <h5 className="fw-bold">{item.value}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
  );
};

export default NasionalView;
