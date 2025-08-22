import React, { useEffect, useState } from "react";
import { Table, Spinner } from "react-bootstrap";

const NasionalTableView = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/provinsi/")
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetch provinsi:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <Spinner animation="border" />;

  return (
    <div style={{ maxHeight: "400px", overflowY: "auto" }}>
        <Table striped bordered hover responsive>
        <thead>
            <tr>
            <th>Provinsi</th>
            <th>Jenjang</th>
            <th>Banyak Sekolah Akan di Revitalisasi</th>
            <th>Anggaran</th>
            </tr>
        </thead>
        <tbody>
            {data.map((prov) => (
            <React.Fragment key={prov.kode_pro}>
                <tr>
                <td rowSpan={4}>Prov. {prov.nama_provinsi}</td>
                <td>PAUD</td>
                <td>{prov.total_paud}</td>
                <td>Rp {Number(prov.total_anggaran_paud).toLocaleString("id-ID")}</td>
                </tr>
                <tr>
                <td>SD</td>
                <td>{prov.total_sd}</td>
                <td>Rp {Number(prov.total_anggaran_sd).toLocaleString("id-ID")}</td>
                </tr>
                <tr>
                <td>SMP</td>
                <td>{prov.total_smp}</td>
                <td>Rp {Number(prov.total_anggaran_smp).toLocaleString("id-ID")}</td>
                </tr>
                <tr>
                <td>SMA</td>
                <td>{prov.total_sma}</td>
                <td>Rp {Number(prov.total_anggaran_sma).toLocaleString("id-ID")}</td>
                </tr>
            </React.Fragment>
            ))}
        </tbody>
        </Table>
    </div>
  );
};

export default NasionalTableView;
