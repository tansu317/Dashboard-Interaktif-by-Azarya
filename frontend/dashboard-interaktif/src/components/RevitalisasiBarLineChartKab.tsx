import { useState } from "react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from "recharts";
import RevitalisasiDetailKab from "./RevitalisasiDetailKab";

type DataRow = {
  kode_pro: string;
  kode_kab: string;
  nama_wilayah: string;
  total_jml_rev_sekolah: number;
  persen: number;
  total_anggaran_rev: number;
};

type DetailJenjang = {
  jenjang: string;
  total_jml_rev_sekolah: number;
  total_anggaran_rev: number;
};

const RevitalisasiBarLineChartKab = ({ data }: { data: DataRow[] }) => {
  const [selectedKab, setSelectedKab] = useState<string | null>(null);
  const [detailData, setDetailData] = useState<DetailJenjang[]>([]);

  // klik bar kabupaten
  const handleBarClick = async (d: any) => {
    setSelectedKab(d.nama_wilayah);

    try {
      const res = await fetch(
        `http://localhost:5000/api/kabupaten/${d.kode_pro}/${d.kode_kab}`
      );
      const detail = await res.json();
      
    // transform object ke array jenjang sebelum di set sesuai DetailJenjang
    const jenjangData = [
      {
        jenjang: "PAUD",
        total_jml_rev_sekolah: detail.jml_rev_paud,
        total_anggaran_rev: Number(detail.anggaran_rev_paud),
      },
      {
        jenjang: "SD",
        total_jml_rev_sekolah: detail.jml_rev_sd,
        total_anggaran_rev: Number(detail.anggaran_rev_sd),
      },
      {
        jenjang: "SMP",
        total_jml_rev_sekolah: detail.jml_rev_smp,
        total_anggaran_rev: Number(detail.anggaran_rev_smp),
      },
      {
        jenjang: "SMA",
        total_jml_rev_sekolah: detail.jml_rev_sma,
        total_anggaran_rev: Number(detail.anggaran_rev_sma),
      },
    ];

    setDetailData(jenjangData);
    } catch (err) {
      console.error("Gagal fetch detail kabupaten:", err);
    }
  };

  if (!data || data.length === 0) return <p>Data tidak tersedia</p>;

  // Hitung total semua anggaran revitalisasi untuk dapatkan persentase
  const total_anggaran = data.reduce(
    (sum, d) => sum + Number(d.total_anggaran_rev),
    0
  );

  const chartData = data.map((d) => ({
    kode_pro: d.kode_pro,
    kode_kab: d.kode_kab,
    nama_wilayah: d.nama_wilayah,
    jumlah_sekolah: d.total_jml_rev_sekolah,
    persen_anggaran: (Number(d.total_anggaran_rev) / total_anggaran) * 100,
  }));

  return (
    <div className="w-full h-auto bg-white p-4 rounded-lg shadow">
      <ComposedChart
        width={800}
        height={400}
        data={chartData}
        margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
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
          dataKey="jumlah_sekolah"
          fill="#ff9900"
          barSize={30}
          onClick={handleBarClick}
        />
        <Line
          yAxisId="right"
          type="linear"
          dataKey="persen_anggaran"
          stroke="#3366cc"
          strokeWidth={3}
          dot={{ r: 5, strokeWidth: 2, fill: "#fff" }}
          activeDot={{ r: 7 }}
        />
      </ComposedChart>

      {/* Tampilkan detail jika kabupaten diklik */}
      {selectedKab && (
        <RevitalisasiDetailKab data={detailData} namaKab={selectedKab} />
      )}
    </div>
  );
};

export default RevitalisasiBarLineChartKab;
