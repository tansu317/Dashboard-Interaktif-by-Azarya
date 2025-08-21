import AnggaranPieChart from "./AnggaranPieChart";

type ProvinsiData = {
  kode_pro: string;
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

const formatRupiah = (num: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(num);

const ProvinsiView = ({ provinsi, data }: { provinsi: string; data: ProvinsiData }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-white shadow rounded-xl p-4 col-span-2">
        <h2 className="text-lg font-bold text-red-600">Data Revitalisasi di Provinsi {provinsi}</h2>
        <p className="text-gray-600 text-sm">Total Revitalisasi Sekolah:</p>
        <h3 className="text-xl font-bold">{data.total_sekolah.toLocaleString("id-ID")}</h3>
        <p className="text-gray-600 text-sm">Total Anggaran Revitalisasi:</p>
        <h3 className="text-xl font-bold">{formatRupiah(data.total_anggaran)}</h3>
      </div>

      <div className="bg-white shadow rounded-xl p-4">
        <p className="text-gray-500 text-sm">PAUD</p>
        <p>{data.total_paud.toLocaleString("id-ID")} sekolah</p>
        <p className="text-gray-600 text-xs">{formatRupiah(data.total_anggaran_paud)}</p>
      </div>

      <div className="bg-white shadow rounded-xl p-4">
        <p className="text-gray-500 text-sm">SD</p>
        <p>{data.total_sd.toLocaleString("id-ID")} sekolah</p>
        <p className="text-gray-600 text-xs">{formatRupiah(data.total_anggaran_sd)}</p>
      </div>

      <div className="bg-white shadow rounded-xl p-4">
        <p className="text-gray-500 text-sm">SMP</p>
        <p>{data.total_smp.toLocaleString("id-ID")} sekolah</p>
        <p className="text-gray-600 text-xs">{formatRupiah(data.total_anggaran_smp)}</p>
      </div>

      <div className="bg-white shadow rounded-xl p-4">
        <p className="text-gray-500 text-sm">SMA</p>
        <p>{data.total_sma.toLocaleString("id-ID")} sekolah</p>
        <p className="text-gray-600 text-xs">{formatRupiah(data.total_anggaran_sma)}</p>
      </div>
      <div className="mt-6">
        <h2>Anggaran Revitalisasi Sekolah Berdasarkan Bentuk Pendidikan Provinsi {provinsi} [Diagram Lingkaran]</h2>
        <AnggaranPieChart data={data} />
      </div>
    </div>
    
  );
};

export default ProvinsiView;
