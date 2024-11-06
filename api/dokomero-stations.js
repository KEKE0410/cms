const db = require("../config/database_promise");

module.exports = {
  station_all_data_get: async (req, res) => {
    const error = (err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    };

    try {
      const [stations] = await db.query(`SELECT * FROM dokomero_stations`);

      const finishedResult = await Promise.all(
        stations.map(async (station) => {
          // Fetch platform data
          const [platformDataS] = await db.query(
            `SELECT * FROM dokomero_stations_platformdata WHERE connection_id = ?`,
            [station.id]
          );

          // Combine platform data with old melody data
          const platformData = await Promise.all(
            platformDataS.map(async (platformChild) => {
              const [oldMelodyData] = await db.query(
                `SELECT * FROM dokomero_stations_platformdata_oldmelody WHERE connection_id = ?`,
                [platformChild.id]
              );

              return { ...platformChild, old_melody: oldMelodyData };
            })
          );

          return {
            ...station,
            platformData,
          };
        })
      );

      res.status(200).json(finishedResult); // Send the final result as JSON
    } catch (err) {
      error(err); // Error handling if any query fails
    }
  },
};
