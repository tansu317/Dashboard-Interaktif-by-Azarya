import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ComposedChart,
  Line
} from "recharts";

type DetailJenjang = {
  jenjang: string;
  total_jml_rev_sekolah: number;
  total_anggaran_rev: number;
};

const RevitalisasiDetailKab = ({
  data,
  namaKab,
}: {
  data: DetailJenjang[];
  namaKab: string;
}) => {
  if (!data || data.length === 0) return <p>Data detail tidak tersedia</p>;

  return (
    <div className="mt-10 space-y-10">
      <h2 className="text-center font-bold text-xl text-red-600">
        Detail Revitalisasi Sekolah - {namaKab}
      </h2>

      {/* 1. Diagram batang jumlah sekolah */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-center font-semibold mb-2">
          Jumlah Revitalisasi Sekolah per Jenjang ({namaKab})
        </h3>
        <BarChart width={600} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="jenjang" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total_jml_rev_sekolah" fill="#ff9900" barSize={40} />
        </BarChart>
      </div>

      {/* 2. Diagram batang anggaran */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-center font-semibold mb-2">
          total Anggaran Revitalisasi Sekolah per Jenjang ({namaKab})
        </h3>
        <BarChart width={600} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="jenjang" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total_anggaran_rev" fill="#3366cc" barSize={40} />
        </BarChart>
      </div>

      {/* 3. Composed Chart (gabungan) */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-center font-semibold mb-2">
          Revitalisasi Sekolah dan Anggaran per Jenjang ({namaKab})
        </h3>
        <ComposedChart width={700} height={350} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="jenjang" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Bar
            yAxisId="left"
            dataKey="total_jml_rev_sekolah"
            fill="#ff9900"
            barSize={40}
          />
          <Line
            yAxisId="right"
            type="linear"
            dataKey="total_anggaran_rev"
            stroke="#3366cc"
            strokeWidth={3}
            dot={{ r: 5, strokeWidth: 2, fill: "#fff" }}
            activeDot={{ r: 7 }}
          />
        </ComposedChart>
      </div>
    </div>
  );
};

export default RevitalisasiDetailKab;
