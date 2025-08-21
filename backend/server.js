const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const revitalisasiRoutes = require("./routes/revitalisasi");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api", revitalisasiRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
