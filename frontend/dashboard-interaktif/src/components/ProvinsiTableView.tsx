import React, { useState, useEffect } from "react";
import { Card, Table } from "react-bootstrap";
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
  anggaran_rev_paud: string;
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
        <div style={{ maxHeight: "400px", overflowY: "auto" }}>
          <Table striped bordered hover responsive>
            <thead className="table sticky-top">
              <tr>
                <th>Kab / Kota</th>
                <th>Jenjang</th>
                <th>Banyak Sekolah Akan di Revitalisasi</th>
                <th>Anggaran</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => (
                <React.Fragment key={idx}>
                  <tr>
                    <td rowSpan={4} className="fw-bold align-middle">
                      {row.nama_wilayah}
                    </td>
                    <td>PAUD</td>
                    <td>{row.jml_rev_paud}</td>
                    <td>{formatRupiah(Number(row.anggaran_rev_paud))}</td>
                  </tr>
                  <tr>
                    <td>SD</td>
                    <td>{row.jml_rev_sd}</td>
                    <td>{formatRupiah(Number(row.anggaran_rev_sd))}</td>
                  </tr>
                  <tr>
                    <td>SMP</td>
                    <td>{row.jml_rev_smp}</td>
                    <td>{formatRupiah(Number(row.anggaran_rev_smp))}</td>
                  </tr>
                  <tr>
                    <td>SMA</td>
                    <td>{row.jml_rev_sma}</td>
                    <td>{formatRupiah(Number(row.anggaran_rev_sma))}</td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </Table>
        </div>
      
)};

export default ProvinsiTableView;
