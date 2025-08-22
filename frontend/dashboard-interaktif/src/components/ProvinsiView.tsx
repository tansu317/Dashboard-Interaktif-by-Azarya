import { FC } from "react";

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

const ProvinsiView: FC<{ provinsi: string; data: ProvinsiData }> = ({ provinsi, data }) => {
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
      <h4 className="mb-5 fw-bold text-center">
        Data Revitalisasi di Provinsi {provinsi}
      </h4>

      {/* Card Grid */}
      <div className="row g-3">
        {items.map((item, idx) => (
          <div className="col-md-6" key={idx}>
            <div className="card shadow-sm h-100">
              <div className="card-body text-center">
                <p className="text-muted small mb-1">{item.label}</p>
                <h5 className="fw-bold">{item.value}</h5>
                {item.sub && (
                  <p className="text-muted small mb-0">{item.sub}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProvinsiView;
