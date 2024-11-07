const express = require("express");
const { db_id_get, db_all_get } = require("./api/common");
const {
  station_all_data,
  station_search,
  station_platformdata_search,
  station_platformdata_next_search,
  station_platformdata_oldmelody_search,
  station_add_data,
  station_platformdata_add,
  station_platformdata_next_add,
  station_platformdata_oldmelody_add,
} = require("./api/dokomero-stations");
const {
  company_all_data,
  company_search,
  company_lineData_search,
} = require("./api/dokomero-companies");
const { sound_id_search } = require("./api/dokomero-melody");
require("dotenv").config();

const app = express();
const PORT = process.env.API_PORT;
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.get("/", (req, res) => {
  res.status(404).send("404 not found");
});

app.get("/test/body", (req, res) => {
  res.status(200).json(req.body);
});

app.get("/api/:collection_name", (req, res) => {
  db_all_get(req, res);
});

app.get("/api/:collection_name/:id", (req, res) => {
  db_id_get(req, res);
});

app.get("/api/dokomero/company", (req, res) => {
  company_all_data(req, res);
});

app.get("/api/dokomero/company/:category/:value", (req, res) => {
  company_search(req, res);
});

app.get("/api/dokomero/components/company/linedata/:id", (req, res) => {
  company_lineData_search(req, res);
});

app.get("/api/dokomero/station", (req, res) => {
  station_all_data(req, res);
});

app.post("/api/dokomero/station", (req, res) => {
  station_add_data(req, res);
});

app.get("/api/dokomero/station/:category/:value", (req, res) => {
  station_search(req, res);
});

app.get("/api/dokomero/components/station/platformdata/:id", (req, res) => {
  station_platformdata_search(req, res);
});

app.post("/api/dokomero/components/station/platformdata/", (req, res) => {
  station_platformdata_add(req, res);
});

app.get(
  "/api/dokomero/components/station/platformdata-next/:id",
  (req, res) => {
    station_platformdata_next_search(req, res);
  }
);

app.post("/api/dokomero/components/station/platformdata-next/", (req, res) => {
  station_platformdata_next_add(req, res);
});

app.get(
  "/api/dokomero/components/station/platformdata-oldmelody/:id",
  (req, res) => {
    station_platformdata_oldmelody_search(req, res);
  }
);

app.post(
  "/api/dokomero/components/station/platformdata-oldmelody",
  (req, res) => {
    station_platformdata_oldmelody_add(req, res);
  }
);

app.get("/api/dokomero/components/sound/:id", (req, res) => {
  sound_id_search(req, res);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
