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
    <div className="mt-5 space-y-10">
      <h4 className="text-center font-bold text-xl text-red-600">
        Detail Revitalisasi Sekolah - {namaKab}
      </h4>

      <div className="container my-4">
        {/* 1. Jumlah Sekolah */}
        <div className="card shadow mb-4">
          <div className="card-body">
            <h4 className="text-center fw-bold mb-4">
              Jumlah Revitalisasi Sekolah per Jenjang ({namaKab})
            </h4>
            <div className="d-flex justify-content-center">
              <BarChart width={600} height={300} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="jenjang" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total_jml_rev_sekolah" fill="#ff9900" />
              </BarChart>
            </div>
          </div>
        </div>

        {/* 2. Anggaran */}
        <div className="card shadow mb-4">
          <div className="card-body">
            <h4 className="text-center fw-bold mb-4">
              Total Anggaran Revitalisasi Sekolah per Jenjang ({namaKab})
            </h4>
            <div className="d-flex justify-content-center">
              <BarChart
                width={700}
                height={300}
                data={data}
                margin={{ top: 20, right: 30, left: 80, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="jenjang" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total_anggaran_rev" fill="#3366cc" />
              </BarChart>
            </div>
          </div>
        </div>

        {/* 3. Gabungan */}
        <div className="card shadow mb-4">
          <div className="card-body">
            <h4 className="text-center fw-bold mb-4">
              Revitalisasi Sekolah dan Anggaran per Jenjang ({namaKab})
            </h4>
            <div className="d-flex justify-content-center">
              <ComposedChart
                width={700}
                height={300}
                data={data}
                margin={{ top: 20, right: 80, left: 30, bottom: 5 }}
              >
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
                />
                <Line
                  yAxisId="right"
                  type="linear"
                  dataKey="total_anggaran_rev"
                  stroke="#3366cc"
                  strokeWidth={3}
                  dot={{ r: 5, strokeWidth: 3, fill: "#fff" }}
                />
              </ComposedChart>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevitalisasiDetailKab;
