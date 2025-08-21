import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import indonesiaGeoJson from '../data/38 Provinsi Indonesia - Provinsi.json';
import { useState, useEffect } from 'react';
import "leaflet/dist/leaflet.css";
import NasionalView from "../components/NasionalView";
import ProvinsiView from "../components/ProvinsiView";
import ProvinsiTableView from './ProvinsiTableView';

const IndonesiaMap = () => {
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [selectedKodeProv, setSelectedKodeProv] = useState<string | null>(null);
  const [nasionalData, setNasionalData] = useState<any>(null);
  const [provinsiData, setProvinsiData] = useState<any>(null);

  // Fetch data nasional ketika komponen pertama kali load
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

  // Fetch data provinsi ketika provinsi dipilih
  useEffect(() => {
    if (!selectedKodeProv) return;
    const fetchProvinsi = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/provinsi/${selectedKodeProv}`);
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
    <div className="flex flex-col w-full h-screen">
        <h3>Project Pembuatan Dashboard Interaktif (Typescript React - Node JS)</h3>
        <h4>oleh: Azarya Kairossutan Sacri Pusaka Dami | sutandami@gmail.com | https://www.linkedin/in/azarya-dami</h4>
        {/* Map Area */}
        <div className="flex justify-center p-4">
            <h1>Revitalisasi Sarana Belajar Mengajar</h1>
            <h2>Persebaran Program Revitalisasi Sekolah Nasional</h2>
            <MapContainer
            center={[-2.5, 120]}
            zoom={3.5}
            minZoom={4}
            maxZoom={8}
            scrollWheelZoom={false}
            style={{ width: "1000px", height: "400px" }}
            >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <GeoJSON data={indonesiaGeoJson as any} onEachFeature={onEachFeature} />
            </MapContainer>
        </div>

        {/* Sidebar (Provinsi / Nasional Info) */}
        <div className="p-4 overflow-y-auto w-full max-w-5xl mx-auto">
            {selectedProvince && selectedKodeProv ? (
            <>
                {/* Ringkasan Provinsi */}
                {provinsiData ? (
                <ProvinsiView provinsi={selectedProvince} data={provinsiData} />
                ) : (
                <p>Memuat data provinsi...</p>
                )}

                {/* Tabel Kabupaten/Kota */}
                <div className="mt-6">
                <ProvinsiTableView
                    kodeProvinsi={selectedKodeProv}
                    namaProvinsi={selectedProvince}
                />
                </div>
            </>
            ) : nasionalData ? (
            <NasionalView data={nasionalData} />
            ) : (
            <p>Memuat data nasional...</p>
            )}
        </div>
    </div>
  );
};

export default IndonesiaMap;
