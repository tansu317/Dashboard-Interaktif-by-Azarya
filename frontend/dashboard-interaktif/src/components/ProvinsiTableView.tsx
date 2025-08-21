import { useEffect, useState } from "react";
import RevitalisasiBarLineChartKab from "./RevitalisasiBarLineChartKab";

type RevitalisasiRow = {
  kode_pro: string;
  kode_kab: string;
  nama_wilayah: string;
  jml_rev_paud: number;
  jml_rev_sd: number;
  jml_rev_smp: number;
  jml_rev_sma: number;
  total_jml_rev_sekolah: number;
  anggaran_rev_paud: string;  // dari DB string
  anggaran_rev_sd: string;
  anggaran_rev_smp: string;
  anggaran_rev_sma: string;
  total_anggaran_rev: string;
};

const formatRupiah = (num: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(num);

const ProvinsiTableView = ({
  kodeProvinsi,
  namaProvinsi,
}: {
  kodeProvinsi: string;
  namaProvinsi: string;
}) => {
  const [data, setData] = useState<RevitalisasiRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!kodeProvinsi) return;

    setLoading(true);
    fetch(`http://localhost:5000/api/kabupaten/${kodeProvinsi}`)
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data kabupaten:", err);
        setLoading(false);
      });
  }, [kodeProvinsi]);

  if (loading) return <p>Memuat data kabupaten...</p>;

  return (
    <div className="overflow-x-auto bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-bold mb-4 text-red-600">
        Tabel Revitalisasi Sekolah Prov {namaProvinsi}
      </h2>

      <table className="min-w-full border border-white text-sm text-white">
        <thead className="bg-red-600 text-white">
          <tr>
            <th className="px-4 py-2 border">Kab / Kota</th>
            <th className="px-4 py-2 border">PAUD</th>
            <th className="px-4 py-2 border">SD</th>
            <th className="px-4 py-2 border">SMP</th>
            <th className="px-4 py-2 border">SMA</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className="text-center">
              <td className="px-4 py-2 border font-bold text-red-600">
                {row.nama_wilayah}
              </td>
              <td className="px-4 py-2 border">
                <div>Jml Sekolah: {row.jml_rev_paud}</div>
                <div className="text-gray-600 text-xs">
                  {formatRupiah(Number(row.anggaran_rev_paud))}
                </div>
              </td>
              <td className="px-4 py-2 border">
                <div>Jml Sekolah: {row.jml_rev_sd}</div>
                <div className="text-gray-600 text-xs">
                  {formatRupiah(Number(row.anggaran_rev_sd))}
                </div>
              </td>
              <td className="px-4 py-2 border">
                <div>Jml Sekolah: {row.jml_rev_smp}</div>
                <div className="text-gray-600 text-xs">
                  {formatRupiah(Number(row.anggaran_rev_smp))}
                </div>
              </td>
              <td className="px-4 py-2 border">
                <div>Jml Sekolah: {row.jml_rev_sma}</div>
                <div className="text-gray-600 text-xs">
                  {formatRupiah(Number(row.anggaran_rev_sma))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 className="text-lg font-bold mb-4 text-red-600 text-center">
        Banyaknya Jumlah Revitalisasi Sekolah per Kab/Kota di Provinsi {namaProvinsi} [Grafik]
        </h2>
        <p>Silahkan Klik Bar setiap Kabupaten/Kota untuk melihat Detail Data per Jenjang!</p>
      <RevitalisasiBarLineChartKab data={data} />
    </div>
  );
};

export default ProvinsiTableView;
