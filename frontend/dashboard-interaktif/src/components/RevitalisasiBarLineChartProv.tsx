import { useState } from "react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import RevitalisasiDetailProv from "./RevitalisasiDetailProv.tsx";

type ProvinsiRow = {
  kode_pro: string;
  nama_provinsi: string;
  total_sekolah: number;
  total_anggaran: number;
};

const RevitalisasiBarLineChartProv = ({ data }: { data: ProvinsiRow[] }) => {
  const [selectedProv, setSelectedProv] = useState<string | null>(null);
  const [detailData, setDetailData] = useState<any[]>([]);

  if (!data || data.length === 0) return <p>Data tidak tersedia</p>;

  // Hitung total semua anggaran untuk % anggaran
  const total_anggaran = data.reduce(
    (sum, d) => sum + Number(d.total_anggaran),
    0
  );

  const chartData = data.map((d) => ({
    kode_pro: d.kode_pro,
    nama_wilayah: d.nama_provinsi,
    jumlah: d.total_sekolah,
    persen: (Number(d.total_anggaran) / total_anggaran) * 100,
  }));

  // Klik bar provinsi
  const handleBarClick = async (d: any) => {
    setSelectedProv(d.nama_wilayah);

    try {
      const res = await fetch(`http://localhost:5000/api/provinsi/${d.kode_pro}`);
      const detail = await res.json();

      // transform object API -> array per jenjang
      const jenjangData = [
        {
          jenjang: "PAUD",
          total_jml_rev_sekolah: detail.total_paud,
          total_anggaran_rev: Number(detail.total_anggaran_paud),
        },
        {
          jenjang: "SD",
          total_jml_rev_sekolah: detail.total_sd,
          total_anggaran_rev: Number(detail.total_anggaran_sd),
        },
        {
          jenjang: "SMP",
          total_jml_rev_sekolah: detail.total_smp,
          total_anggaran_rev: Number(detail.total_anggaran_smp),
        },
        {
          jenjang: "SMA",
          total_jml_rev_sekolah: detail.total_sma,
          total_anggaran_rev: Number(detail.total_anggaran_sma),
        },
      ];

      setDetailData(jenjangData);
    } catch (err) {
      console.error("Gagal ambil detail provinsi:", err);
    }
  };

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow">
      <ComposedChart
        width={800}
        height={400}
        data={chartData}
        margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
        barCategoryGap="50%"
        barGap={5}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="nama_wilayah"
          angle={-45}
          textAnchor="end"
          interval={0}
          height={80}
        />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Legend />

        <Bar
          yAxisId="left"
          dataKey="jumlah"
          fill="#ff9900"
          barSize={20}
          onClick={handleBarClick}
        />
        <Line
          yAxisId="right"
          type="linear"
          dataKey="persen"
          stroke="#3366cc"
          strokeWidth={3}
          dot={{ r: 5, strokeWidth: 2, fill: "#fff" }}
          activeDot={{ r: 7 }}
        />
      </ComposedChart>

      {selectedProv && detailData.length > 0 && (
        <div className="mt-10">
          <h3 className="text-center font-bold text-red-600 text-lg mb-4">
            Detail Revitalisasi per Jenjang Provinsi {selectedProv}
          </h3>
          <RevitalisasiDetailProv data={detailData} nama_provinsi={selectedProv}/>
        </div>
      )}
    </div>
  );
};

export default RevitalisasiBarLineChartProv;
