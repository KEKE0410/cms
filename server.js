require("dotenv").config();
const express = require("express");
const {
  db_id_get,
  db_all_get,
} = require("./api/common");
const { station_all_data_get } = require("./api/dokomero-stations");

const app = express();
const PORT = 5000;

app.get("/", (req, res) => {
  res.status(404).send("404 not found");
});

app.get("/api/:collection_name", (req, res) => {
  db_all_get(req, res);
});

app.get("/api/:collection_name/:id", (req, res) => {
  db_id_get(req, res);
});

app.get("/api/dokomero/station/all", (req, res) => {
    station_all_data_get(req, res);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
