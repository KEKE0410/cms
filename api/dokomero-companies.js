const db = require("../config/database");

module.exports = {
  company_all_data: (req, res) => {
    let query;
    query = `SELECT * FROM dokomero_companies`;
    db.query(query, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error retrieving data from database");
      } else {
        res.json(result);
      }
    });
  },
  company_search: (req, res) => {
    const value = req.params.value;
    const category = req.params.category;
    let query;
    query = `SELECT * FROM dokomero_companies WHERE ${category} = "${value}" `;
    db.query(query, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error retrieving data from database");
      } else {
        res.json(result);
      }
    });
  },
  company_lineData_search: (req, res) => {
    const id = req.params.id;
    let query;
    query = `SELECT * FROM dokomero_companies_linedata WHERE connection_id = "${id}" `;
    db.query(query, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error retrieving data from database");
      } else {
        res.json(result);
      }
    });
  },
};
