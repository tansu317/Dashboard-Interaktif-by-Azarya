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
    <div className="container my-4">
      <h4 className="mb-4 fw-bold text-center">
        Data Revitalisasi di Provinsi {provinsi}
      </h4>

      {/* Card Grid */}
      <div className="row g-3">
        {/* Total Sekolah */}
        <div className="col-md-6">
          <div className="card shadow-sm h-100">
            <div className="card-body text-center">
              <p className="text-muted small mb-1">Total Revitalisasi Sekolah</p>
              <h5 className="fw-bold">
                {data.total_sekolah.toLocaleString("id-ID")}
              </h5>
            </div>
          </div>
        </div>

        {/* Total Anggaran */}
        <div className="col-md-6">
          <div className="card shadow-sm h-100">
            <div className="card-body text-center">
              <p className="text-muted small mb-1">Total Anggaran Revitalisasi</p>
              <h5 className="fw-bold">{formatRupiah(data.total_anggaran)}</h5>
            </div>
          </div>
        </div>

        {/* PAUD */}
        <div className="col-md-6">
          <div className="card shadow-sm h-100">
            <div className="card-body text-center">
              <p className="text-muted small mb-1">PAUD</p>
              <h5 className="fw-bold">{data.total_paud.toLocaleString("id-ID")} sekolah</h5>
              <p className="text-muted small mb-0">
                {formatRupiah(data.total_anggaran_paud)}
              </p>
            </div>
          </div>
        </div>

        {/* SD */}
        <div className="col-md-6">
          <div className="card shadow-sm h-100">
            <div className="card-body text-center">
              <p className="text-muted small mb-1">SD</p>
              <h5 className="fw-bold">{data.total_sd.toLocaleString("id-ID")} sekolah</h5>
              <p className="text-muted small mb-0">
                {formatRupiah(data.total_anggaran_sd)}
              </p>
            </div>
          </div>
        </div>

        {/* SMP */}
        <div className="col-md-6">
          <div className="card shadow-sm h-100">
            <div className="card-body text-center">
              <p className="text-muted small mb-1">SMP</p>
              <h5 className="fw-bold">{data.total_smp.toLocaleString("id-ID")} sekolah</h5>
              <p className="text-muted small mb-0">
                {formatRupiah(data.total_anggaran_smp)}
              </p>
            </div>
          </div>
        </div>

        {/* SMA */}
        <div className="col-md-6">
          <div className="card shadow-sm h-100">
            <div className="card-body text-center">
              <p className="text-muted small mb-1">SMA</p>
              <h5 className="fw-bold">{data.total_sma.toLocaleString("id-ID")} sekolah</h5>
              <p className="text-muted small mb-0">
                {formatRupiah(data.total_anggaran_sma)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Pie */}
      {/* <div className="mt-5">
        <h4 className="text-center mb-3">
          Anggaran Revitalisasi Sekolah Berdasarkan Bentuk Pendidikan Provinsi {provinsi}
        </h4>
        <AnggaranPieChart data={data} />
      </div> */}
    </div>
  );
};

export default ProvinsiView;
