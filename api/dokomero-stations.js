const db = require("../config/database");

module.exports = {
  station_all_data: (req, res) => {
    let query;
    query = `SELECT * FROM dokomero_stations`;
    db.query(query, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error retrieving data from database");
      } else {
        res.json(result);
      }
    });
  },

  station_add_data: (req, res) => {
    let query;
    const {
      station_name,
      company,
      uuid,
      message,
      created_by_id,
      updated_by_id,
    } = req.body;
    query = `INSERT INTO dokomero_stations (station_name, company, uuid, message, created_at, updated_at, created_by_id, updated_by_id) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(
      query,
      [
        station_name,
        company,
        uuid,
        message,
        new Date(),
        new Date(),
        created_by_id,
        updated_by_id,
      ],
      (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error inserting data into database");
        } else {
          res.json(result);
        }
      }
    );
  },

  station_search: (req, res) => {
    const value = req.params.value;
    const category = req.params.category;
    let query;
    query = `SELECT * FROM dokomero_stations WHERE ${category} = "${value}" `;
    db.query(query, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error retrieving data from database");
      } else {
        res.json(result);
      }
    });
  },

  station_platformdata_search: (req, res) => {
    const id = req.params.id;
    let query;
    query = `SELECT * FROM dokomero_stations_platformdata WHERE connection_id = "${id}" `;
    db.query(query, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error retrieving data from database");
      } else {
        res.json(result);
      }
    });
  },

  station_platformdata_add: (req, res) => {
    let query;
    const {
      connection_id,
      platform,
      line_name,
      melody_id,
      close_id,
      arrival_id,
      direction,
      switch_type,
    } = req.body;
    query = `INSERT INTO dokomero_stations_platformdata (connection_id, platform, line_name, melody_id,close_id,arrival_id,direction,switch_type) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(
      query,
      [
        connection_id,
        platform,
        line_name,
        melody_id,
        close_id,
        arrival_id,
        direction,
        switch_type,
      ],
      (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error inserting data into database");
        } else {
          res.json(result);
        }
      }
    );
  },

  station_platformdata_next_search: (req, res) => {
    const id = req.params.id;
    let query;
    query = `SELECT * FROM dokomero_stations_platformdata_next WHERE connection_id = "${id}" `;
    db.query(query, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error retrieving data from database");
      } else {
        res.json(result);
      }
    });
  },

  station_platformdata_next_add: (req, res) => {
    let query;
    const { connection_id, description, platform, station_id } = req.body;
    query = `INSERT INTO dokomero_stations_platformdata_next (connection_id,description,platform,station_id) 
             VALUES (?, ?, ?, ?)`;
    db.query(
      query,
      [connection_id, description, platform, station_id],
      (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error inserting data into database");
        } else {
          res.json(result);
        }
      }
    );
  },

  station_platformdata_oldmelody_search: (req, res) => {
    const id = req.params.id;
    let query;
    query = `SELECT * FROM dokomero_stations_platformdata_oldmelody WHERE connection_id = "${id}" `;
    db.query(query, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error retrieving data from database");
      } else {
        res.json(result);
      }
    });
  },

  station_platformdata_oldmelody_add: (req, res) => {
    let query;
    const { connection_id, melody_id } = req.body;
    query = `INSERT INTO dokomero_stations_platformdata_oldmelody (connection_id,melody_id) 
             VALUES (?, ?)`;

    db.query(query, [connection_id, melody_id], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error inserting data into database");
      } else {
        res.json(result);
      }
    });
  },
};
