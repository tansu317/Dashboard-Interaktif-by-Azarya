import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ComposedChart, Line } from "recharts";

type DetailJenjang = {
  jenjang: string;
  total_jml_rev_sekolah: number;
  total_anggaran_rev: number;
};

const RevitalisasiDetailProv = ({ data, nama_provinsi }: { data: DetailJenjang[]; nama_provinsi: String }) => {
  return (
    <div className="space-y-10">
      {/* Jumlah Sekolah */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h4 className="text-center font-bold mb-4">Jumlah Revitalisasi Sekolah per Jenjang ({nama_provinsi})</h4>
        <BarChart width={600} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="jenjang" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total_jml_rev_sekolah" fill="#ff9900" />
        </BarChart>
      </div>

      {/* Anggaran */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h4 className="text-center font-bold mb-4">Total Anggaran Revitalisasi Sekolah per Jenjang ({nama_provinsi})</h4>
        <BarChart width={600} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="jenjang" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total_anggaran_rev" fill="#3366cc" />
        </BarChart>
      </div>

      {/* Gabungan */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h4 className="text-center font-bold mb-4">Revitalisasi Sekolah dan Anggaran per Jenjang ({nama_provinsi})</h4>
        <ComposedChart width={600} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="jenjang" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Bar yAxisId="left" dataKey="total_jml_rev_sekolah" fill="#ff9900" />
          <Line yAxisId="right" type="linear" dataKey="total_anggaran_rev" stroke="#3366cc" strokeWidth={3} />
        </ComposedChart>
      </div>
    </div>
  );
};

export default RevitalisasiDetailProv;
