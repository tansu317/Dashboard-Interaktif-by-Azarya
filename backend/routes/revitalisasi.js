const express = require("express");
const router = express.Router();
const {
  getNasional,
  getProvinsi,
  getProvinsiById,
  getKabupatenByProv,
  getKabupatenById,
  getNasionalByJenjang,
  getProvinsiByJenjang,
  getKpi,
} = require("../controllers/revitalisasiController");

router.get("/nasional", getNasional);
router.get("/provinsi", getProvinsi);
router.get("/provinsi/:kode_pro", getProvinsiById);
router.get("/kabupaten/:kode_pro", getKabupatenByProv);
router.get("/kabupaten/:kode_pro/:kode_kab", getKabupatenById);
router.get("/nasional/jenjang/:jenjang", getNasionalByJenjang);
router.get("/provinsi/:kode_pro/jenjang/:jenjang", getProvinsiByJenjang);
router.get("/nasional/kpi", getKpi);

module.exports = router;
