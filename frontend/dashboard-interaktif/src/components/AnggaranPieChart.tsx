import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#3366cc", "#ff9900", "#109618", "#dc3912"];

const formatRupiah = (num: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(num);

const AnggaranPieChart = ({ data }: { data: any }) => {
  if (!data) return <p>Data tidak tersedia</p>;

  const chartData = [
    { name: "PAUD", value: Number(data.total_anggaran_paud) || 0 },
    { name: "SD", value: Number(data.total_anggaran_sd) || 0 },
    { name: "SMP", value: Number(data.total_anggaran_smp) || 0 },
    { name: "SMA", value: Number(data.total_anggaran_sma) || 0 },
  ];

  return (
    <div className="flex justify-center items-center">
      <PieChart width={1000} height={400}>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={130}
          innerRadius={70}
          label={({ name, value, percent }) =>
            `${name}: ${(percent * 100).toFixed(2)}% (${formatRupiah(value)})`
          }
        >
          {chartData.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value: number) => formatRupiah(value)} />
        <Legend />
      </PieChart>
    </div>
  );
};

export default AnggaranPieChart;
