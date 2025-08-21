const pool = require("../db");

// List data nasional / Agregasi Nasional
const getNasional = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT SUM (jml_rev_paud) as total_paud,
            SUM(jml_rev_sd) as total_sd,
            SUM(jml_rev_smp) as total_smp,
            SUM(jml_rev_sma) as total_sma,
            SUM(total_jml_rev_sekolah) as total_sekolah,
            SUM(anggaran_rev_paud) as total_anggaran_paud,
            SUM(anggaran_rev_sd) as total_anggaran_sd,
            SUM(anggaran_rev_smp) as total_anggaran_smp,
            SUM(anggaran_rev_sma) as total_anggaran_sma,
            SUM(total_anggaran_rev) as total_anggaran
        FROM revitalisasi`
        );

        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message})
    }
};

// List Provinsi
const getProvinsi = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
          kab.kode_pro,
          prov.nama_wilayah AS nama_provinsi,
          SUM(kab.jml_rev_paud) AS total_paud,
          SUM(kab.jml_rev_sd) AS total_sd,
          SUM(kab.jml_rev_smp) AS total_smp,
          SUM(kab.jml_rev_sma) AS total_sma,
          SUM(kab.total_jml_rev_sekolah) AS total_sekolah,
          SUM(kab.anggaran_rev_paud) AS total_anggaran_paud,
          SUM(kab.anggaran_rev_sd) AS total_anggaran_sd,
          SUM(kab.anggaran_rev_smp) AS total_anggaran_smp,
          SUM(kab.anggaran_rev_sma) AS total_anggaran_sma,
          SUM(kab.total_anggaran_rev) AS total_anggaran
      FROM revitalisasi kab
      JOIN revitalisasi prov 
          ON kab.kode_pro = prov.kode_pro 
        AND prov.tingkat_label = 'provinsi'
      WHERE kab.tingkat_label = 'kabupaten'
      GROUP BY kab.kode_pro, prov.nama_wilayah
      ORDER BY prov.nama_wilayah;

    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Detail Provinsi diambil dari tiap kabupaten
const getProvinsiById = async (req, res) => {
  try {
    const { kode_pro } = req.params;
    const result = await pool.query(`
      SELECT kode_pro, SUM (jml_rev_paud) as total_paud,
            SUM(jml_rev_sd) as total_sd,
            SUM(jml_rev_smp) as total_smp,
            SUM(jml_rev_sma) as total_sma,
            SUM(total_jml_rev_sekolah) as total_sekolah,
            SUM(anggaran_rev_paud) as total_anggaran_paud,
            SUM(anggaran_rev_sd) as total_anggaran_sd,
            SUM(anggaran_rev_smp) as total_anggaran_smp,
            SUM(anggaran_rev_sma) as total_anggaran_sma,
            SUM(total_anggaran_rev) as total_anggaran
      FROM revitalisasi 
      WHERE kode_pro = $1 AND tingkat_label = 'kabupaten'
      GROUP BY (kode_pro)
    `, [kode_pro]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// List Kabupaten dalam Provinsi
const getKabupatenByProv = async (req, res) => {
  try {
    const { kode_pro } = req.params;
    const result = await pool.query(`
      SELECT *
      FROM revitalisasi
      WHERE kode_pro = $1 AND tingkat_label = 'kabupaten'
    `, [kode_pro]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Detail Kabupaten
const getKabupatenById = async (req, res) => {
  try {
    const { kode_pro, kode_kab } = req.params;
    const result = await pool.query(`
      SELECT * FROM revitalisasi 
      WHERE kode_pro = $1 AND kode_kab = $2 AND tingkat_label = 'kabupaten'
    `, [kode_pro, kode_kab]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Agregasi Nasional per jenjang
const getNasionalByJenjang = async (req, res) => {
  try{

    const { jenjang } = req.params;

    let colRev, colAnggaran;
    switch (jenjang.toLowerCase()) {
      case "paud":
        colRev = "jml_rev_paud";
        colAnggaran = "anggaran_rev_paud";
        break;
      case "sd":
        colRev = "jml_rev_sd";
        colAnggaran = "anggaran_rev_sd";
        break;
      case "smp":
        colRev = "jml_rev_smp";
        colAnggaran = "anggaran_rev_smp";
        break;
      case "sma":
        colRev = "jml_rev_sma";
        colAnggaran = "anggaran_rev_sma";
        break;
      default:
        return res.status(400).json({ error: "Jenjang tidak valid" });
    }

    const query = `
      SELECT 
        SUM(${colRev}) AS total_rev, 
        SUM(${colAnggaran}) AS total_anggaran
      FROM revitalisasi
    `;
    const result = await pool.query(query);

    res.json({
      jenjang,
      total_rev: result.rows[0].total_rev,
      total_anggaran: result.rows[0].total_anggaran
    });
  }catch(err){
    res.status(500).json({ error: err.message });
  }
}

// Agregasi Provinsi per Jenjang
 const getProvinsiByJenjang = async (req, res) => {
  try {
    const { kode_pro, jenjang } = req.params;

    let colRev, colAnggaran;
    switch (jenjang.toLowerCase()) {
      case "paud":
        colRev = "jml_rev_paud";
        colAnggaran = "anggaran_rev_paud";
        break;
      case "sd":
        colRev = "jml_rev_sd";
        colAnggaran = "anggaran_rev_sd";
        break;
      case "smp":
        colRev = "jml_rev_smp";
        colAnggaran = "anggaran_rev_smp";
        break;
      case "sma":
        colRev = "jml_rev_sma";
        colAnggaran = "anggaran_rev_sma";
        break;
      default:
        return res.status(400).json({ error: "Jenjang tidak valid. Gunakan: paud, sd, smp, sma" });
    }

    const query = `
      SELECT 
        SUM(${colRev}) AS total_rev, 
        SUM(${colAnggaran}) AS total_anggaran
      FROM revitalisasi
      WHERE kode_pro = $1
    `;

    const result = await pool.query(query, [kode_pro]);

    res.json({
      kode_pro,
      jenjang,
      total_rev: result.rows[0].total_rev,
      total_anggaran: result.rows[0].total_anggaran
    });
  } catch (err) {
    console.error("Error getProvinsiByJenjang:", err);
    res.status(500).json({ error: err.message });
  }
};

const getKpi = async (req, res) => {
  try{
    // Total sekolah & anggaran
    const totalRes = await pool.query(`
      SELECT 
        SUM(total_jml_rev_sekolah)::int AS total_sekolah,
        SUM(total_anggaran_rev)::bigint AS total_anggaran
      FROM revitalisasi
      WHERE tingkat_label = 'kabupaten'
    `);
    const totalData = totalRes.rows[0];

    // Provinsi dengan sekolah terbanyak
    const provRes = await pool.query(`
      SELECT 
        kode_pro,
        nama_wilayah,
        SUM(total_jml_rev_sekolah)::int AS jumlah
      FROM revitalisasi
      WHERE tingkat_label = 'kabupaten'
      GROUP BY kode_pro, nama_wilayah
      ORDER BY jumlah DESC
      LIMIT 1
    `);
    const provTop = provRes.rows[0];

    // Kabupaten/Kota dengan anggaran terbesar
    const kabRes = await pool.query(`
      SELECT 
        kode_kab,
        nama_wilayah,
        MAX(total_anggaran_rev)::bigint AS anggaran
      FROM revitalisasi
      WHERE tingkat_label = 'kabupaten'
      GROUP BY kode_kab, nama_wilayah
      ORDER BY anggaran DESC
      LIMIT 1
    `);

    const kabTop = kabRes.rows[0];

    res.json({
      totalSekolah: totalData.total_sekolah,
      totalAnggaran: totalData.total_anggaran,
      provinsiTop: {
        nama: provTop.nama_wilayah,
        jumlah: provTop.jumlah,
      },
      kabupatenTop: {
        nama: kabTop.nama_wilayah,
        anggaran: kabTop.anggaran,
      },
    });

  }catch(err){
    res.status(500).json({ error: err.message });
  }
}



module.exports = {
  getNasional,
  getProvinsi,
  getProvinsiById,
  getKabupatenByProv,
  getKabupatenById,
  getNasionalByJenjang,
  getProvinsiByJenjang,
  getKpi
};