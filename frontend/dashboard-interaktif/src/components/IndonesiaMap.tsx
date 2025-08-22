import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import indonesiaGeoJson from "../data/38 Provinsi Indonesia - Provinsi.json";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import NasionalView from "../components/NasionalView";
import ProvinsiView from "../components/ProvinsiView";
import ProvinsiTableView from "./ProvinsiTableView";
import NasionalTableView from "./NasionalTableView";
import AnggaranPieChart from "./AnggaranPieChart";
import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import RevitalisasiBarLineChartProv from "./RevitalisasiBarLineChartProv";
import RevitalisasiBarLineChartKab from "./RevitalisasiBarLineChartKab";

const IndonesiaMap = () => {
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [selectedKodeProv, setSelectedKodeProv] = useState<string | null>(null);
  const [nasionalData, setNasionalData] = useState<any>(null);
  const [provinsiData, setProvinsiData] = useState<any>(null);

  useEffect(() => {
    const fetchNasional = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/nasional");
        const data = await res.json();
        setNasionalData(data);
      } catch (err) {
        console.error("Gagal fetch nasional:", err);
      }
    };
    fetchNasional();
  }, []);

  useEffect(() => {
    if (!selectedKodeProv) return;
    const fetchProvinsi = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/provinsi/${selectedKodeProv}`
        );
        const data = await res.json();
        setProvinsiData(data);
      } catch (err) {
        console.error("Gagal fetch provinsi:", err);
      }
    };
    fetchProvinsi();
  }, [selectedKodeProv]);

  const onEachFeature = (feature: any, layer: any) => {
    layer.on({
      click: () => {
        setSelectedProvince(feature.properties.PROVINSI);
        setSelectedKodeProv(feature.properties.KODE_PROV);
      },
    });
  };

  return (
    <Container fluid className="py-4">
      {/* Header */}
      <Row className="mb-3 text-center">
        <Col>
          <h3>Project Pembuatan Dashboard Interaktif (Typescript React - Node JS)</h3>
          <h5>
            oleh: Azarya Kairossutan Sacri Pusaka Dami |{" "}
            <a href="mailto:sutandami@gmail.com">sutandami@gmail.com</a> |{" "}
            <a
              href="https://www.linkedin.com/in/azarya-dami"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </h5>
        </Col>
      </Row>

      {/* Atas: Map + Data */}
      <Row>
        {/* Kiri: Map */}
        <Col md={7}>
          <Card className="shadow-sm">
            <Card.Header>
              <h5 className="mb-0">Revitalisasi Sarana Belajar Mengajar</h5>
              <small>Persebaran Program Revitalisasi Sekolah Nasional</small>
            </Card.Header>
            <Card.Body>
              <MapContainer
                center={[-2.5, 120]}
                zoom={3.5}
                minZoom={4}
                maxZoom={8}
                scrollWheelZoom={false}
                style={{ width: "100%", height: "500px" }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <GeoJSON data={indonesiaGeoJson as any} onEachFeature={onEachFeature} />
              </MapContainer>
            </Card.Body>
          </Card>
        </Col>

        {/* Kanan: Info Nasional / Provinsi */}
        <Col md={5}>
          <Card className="shadow-sm h-100">
            <Card.Header>
              <h5 className="mb-0">
                {selectedProvince ? `Data ${selectedProvince}` : "Data Nasional"}
              </h5>
            </Card.Header>
            <Card.Body style={{ maxHeight: "500px", overflowY: "auto" }}>
              {selectedProvince && selectedKodeProv ? (
                provinsiData ? (
                  <ProvinsiView provinsi={selectedProvince} data={provinsiData} />
                ) : (
                  <p>Memuat data provinsi...</p>
                )
              ) : nasionalData ? (
                <NasionalView data={nasionalData} />
              ) : (
                <p>Memuat data nasional...</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Kedua: Tabel + Pie Chart */}
      <Row className="mt-4">
        {/* Kiri: Tabel */}
        <Col md={7}>
          <Card className="shadow-sm">
            <Card.Header>
              {selectedKodeProv && selectedKodeProv ? (
                <h5 className="mb-0">Tabel Revitalisasi Sekolah Provinsi {selectedProvince}</h5>
              ) : (
                <h5 className="mb-0">Tabel Revitalisasi Sekolah Nasional</h5>
              )}
              
              {/* <small>Persebaran Program Revitalisasi Sekolah Nasional</small> */}
            </Card.Header>
            <Card.Body>
              {selectedProvince && selectedKodeProv ? (
                <ProvinsiTableView
                  kodeProvinsi={selectedKodeProv}
                  namaProvinsi={selectedProvince}
                />
              ) : (
                <NasionalTableView/>
              )}
            </Card.Body>  
          </Card>
        </Col>

        {/* Kanan: Pie Chart */}
        <Col md={5}>
          <Card className="shadow-sm">
            <Card.Header>
              <h6 className="mb-0">
                {selectedProvince ? `Anggaran Revitalisasi Sekolah Berdasarkan Bentuk Pendidikan ${selectedProvince}` : "Anggaran Revitalisasi Sekolah Berdasarkan Bentuk Pendidikan - Nasional"}
              </h6>
            </Card.Header>
            <Card.Body style={{ maxHeight: "500px", overflowY: "auto" }}>
              {selectedProvince && selectedKodeProv ? (
                provinsiData ? (
                  <AnggaranPieChart data={provinsiData} />
                ) : (
                  <p>Memuat data provinsi...</p>
                )
              ) : nasionalData ? (
                <AnggaranPieChart data={nasionalData} />
              ) : (
                <p>Memuat data nasional...</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
          <Card className="shadow-sm">
            <Card.Header>
              {selectedKodeProv && selectedKodeProv ? (
                <h5 className="mb-0">Banyaknya Revitalisasi Sekolah berdasarkan Anggaran Revitalisasi Berdasarkan Provinsi {selectedProvince}</h5>
              ) : (
                <h5 className="mb-0">Banyaknya Revitalisasi Sekolah berdasarkan Anggaran Revitalisasi Berdasarkan Provinsi - Nasional</h5>
              )}
              
            </Card.Header>
            <Card.Body>
              {selectedProvince && selectedKodeProv ? (
                <RevitalisasiBarLineChartKab kode_pro={selectedKodeProv}/>
              ) : (
                <RevitalisasiBarLineChartProv/>
              )}
            </Card.Body>  
          </Card>
      </Row>

    </Container>
  );
};

export default IndonesiaMap;
