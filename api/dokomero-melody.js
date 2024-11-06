const db = require("../config/database");

module.exports = {
  sound_id_search: (req, res) => {
    const id = req.params.id;
    let query;
    query = `SELECT * FROM sounds WHERE id = ${id}`;

    db.query(query, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error retrieving data from database");
      } else {
        res.status(200).json(result);
      }
    });
  },
};
