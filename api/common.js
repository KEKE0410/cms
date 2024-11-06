const db = require("../config/database");

module.exports = {
  db_all_get: (req, res) => {
    const db_name = req.params.collection_name;
    const query = `SELECT * FROM ${db_name}`;

    db.query(query, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error retrieving data from database");
      } else {
        res.status(200).json(result);
      }
    });
  },

  db_id_get: (req, res) => {
    const db_name = req.params.collection_name;
    const id = req.params.id;

    const query = `SELECT * FROM ${db_name} WHERE id = ${id}`;

    db.query(query, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error retrieving data from database");
      } else if (result.length > 0) {
        res.status(200).json(result[0]);
      } else {
        res.status(404).send("Record not found");
      }
    });
  },
};
