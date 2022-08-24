const { Pool } = require("pg");
require("dotenv").config();

var pool;

// Use local database instead of heroku database for testing
// Need to start the db on Ubuntu with sudo service postgresql start
var isLocal = false;
if (isLocal) {
  pool = new Pool({
    user: "ink",
    host: "localhost",
    database: "pms_system",
    password: "test",
    port: 5432,
  });
} else {
  // pool = new Pool({
  //   connectionString: process.env.DATABASE_URL,
  //   ssl: {
  //     rejectUnauthorized: false,
  //   },
  // });
  pool = new Pool({
    user: "logcztdxlhtjbv",
    host: "ec2-54-158-219-119.compute-1.amazonaws.com",
    database: "d85ahqdide7q8a",
    password:
      "4332dc521a6be70b5091ff84c6e730a1a0d9ec211bdea3e0c3557fc1327ee953",
    port: "5432",
  });
}

pool.on("error", function (err, client) {
  console.error("idle client error", err.message, err.stack);
});

const getUsers = (request, response) => {
  pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
    if (error) {
      console.error("Error executing query", error.stack);
    } else {
      response.status(200).json(results.rows);
    }
  });
};

const getUserById = (request, response) => {
  const id = request.body.user;
  const password = request.body.password;

  pool.query(
    "SELECT * FROM users WHERE name = $1 AND password = $2",
    [id, password],
    (error, results) => {
      if (error) {
        console.log(error.stack);
        response.status(403).send("Login information was incorrect try again");
      } else {
        response.status(200).json(results.rows);
      }
    }
  );
};

const getPmsColor = (request, response) => {
  const restParams = [request.params.pmsIden, request.params.series];

  pool.query(
    "SELECT * FROM pms_colors WHERE pms_number = $1 AND series = $2",
    restParams,
    (error, results) => {
      if (error) {
        console.error("Error executing query", error.stack);
      } else {
        response.status(200).json(results.rows);
      }
    }
  );
};

const getComponentDetails = (request, response) => {
  const abvr = request.params.series;

  pool.query(
    "SELECT * FROM color_components WHERE abrv = $1",
    [abvr],
    (error, results) => {
      if (error) {
        console.error("Error executing query", error.stack);
      } else {
        response.status(200).json(results.rows);
      }
    }
  );
};

const getAllColorComponents = (request, response) => {
  pool.query("SELECT * FROM color_components", [], (error, results) => {
    if (error) {
      console.error("Error executing query", error.stack);
    } else {
      response.status(200).json(results.rows);
    }
  });
};

const getAllPmsEntries = (request, response) => {
  pool.query("SELECT * FROM pms_colors", [], (error, results) => {
    if (error) {
      console.error("Error executing query", error.stack);
    } else {
      response.status(200).json(results.rows);
    }
  });
};

const deletePmsNumber = (request, response) => {
  const restParams = [request.params.pmsIden, request.params.series];

  pool.query(
    "DELETE FROM pms_colors WHERE pms_number = $1 AND series = $2",
    restParams,
    (error, results) => {
      if (error) {
        console.error("Error executing deletion of entry", error.stack);
      } else {
        response.status(200).json(results.rows);
      }
    }
  );
};

// const createUser = (request, response) => {
//     const { name, email } = request.body;
//
//     pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
//         if (error) {
//             throw error
//         }
//         response.status(201).send(`User added with ID: ${result.insertId}`)
//     })
// }

const addPmsColor = (request, response) => {
  // var params = { pms_number, series, description, secondary_description, component1, quantity1, component2, quantity2, component3, quantity3,
  //     component4, quantity4, component5, quantity5, component6, quantity6, component7, quantity7, component8, quantity8,
  //     component9, quantity9, component10, quantity10,  component11, quantity11,component12, quantity12, component13,
  //     quantity13, component14, quantity14, component15, quantity15};// = request.body;//34 parameters

  const pms_number = request.body.pms_number;
  const series = request.body.series;
  const description = request.body.description;
  const secondary_description = request.body.secondary_description;

  const component1 = request.body.component1;
  const quantity1 = request.body.quantity1;

  const component2 = request.body.component2;
  const quantity2 = request.body.quantity2;

  const component3 = request.body.component3;
  const quantity3 = request.body.quantity3;

  const component4 = request.body.component4;
  const quantity4 = request.body.quantity4;

  const component5 = request.body.component5;
  const quantity5 = request.body.quantity5;

  const component6 = request.body.component6;
  const quantity6 = request.body.quantity6;

  const component7 = request.body.component7;
  const quantity7 = request.body.quantity7;

  const component8 = request.body.component8;
  const quantity8 = request.body.quantity8;

  const component9 = request.body.component9;
  const quantity9 = request.body.quantity9;

  const component10 = request.body.component10;
  const quantity10 = request.body.quantity10;

  const component11 = request.body.component11;
  const quantity11 = request.body.quantity11;

  const component12 = request.body.component12;
  const quantity12 = request.body.quantity12;

  const component13 = request.body.component13;
  const quantity13 = request.body.quantity13;

  const component14 = request.body.component14;
  const quantity14 = request.body.quantity14;

  const component15 = request.body.component15;
  const quantity15 = request.body.quantity15;

  pool.query(
    "INSERT INTO pms_colors (pms_number, series, description, secondary_description, component1, quantity1, component2, quantity2, component3, quantity3," +
      "        component4, quantity4, component5, quantity5, component6, quantity6, component7, quantity7, component8, quantity8" +
      "        , component9, quantity9, component10, quantity10, component11, quantity11, component12, quantity12, component13, quantity13, component14, quantity14, component15, quantity15)" +
      " VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34)",
    [
      pms_number,
      series,
      description,
      secondary_description,
      component1,
      quantity1,
      component2,
      quantity2,
      component3,
      quantity3,
      component4,
      quantity4,
      component5,
      quantity5,
      component6,
      quantity6,
      component7,
      quantity7,
      component8,
      quantity8,
      component9,
      quantity9,
      component10,
      quantity10,
      component11,
      quantity11,
      component12,
      quantity12,
      component13,
      quantity13,
      component14,
      quantity14,
      component15,
      quantity15,
    ],
    (error, results) => {
      if (error) {
        console.error("Error executing query", error.stack);
        response
          .status(400)
          .send(", " + description + " it likely already exists in the system");
      } else {
        response.status(201).send(`PMS color added with ID: ${results.id}`);
      }
    }
  );
};

const updatePmsColor = (request, response) => {
  // var params = { pms_number, series, description, secondary_description, component1, quantity1, component2, quantity2, component3, quantity3,
  //     component4, quantity4, component5, quantity5, component6, quantity6, component7, quantity7, component8, quantity8,
  //     component9, quantity9, component10, quantity10,  component11, quantity11,component12, quantity12, component13,
  //     quantity13, component14, quantity14, component15, quantity15};// = request.body;//34 parameters

  const pms_number = request.body.pms_number;
  const series = request.body.series;
  const description = request.body.description;
  const secondary_description = request.body.secondary_description;

  const component1 = request.body.component1;
  const quantity1 = request.body.quantity1;

  const component2 = request.body.component2;
  const quantity2 = request.body.quantity2;

  const component3 = request.body.component3;
  const quantity3 = request.body.quantity3;

  const component4 = request.body.component4;
  const quantity4 = request.body.quantity4;

  const component5 = request.body.component5;
  const quantity5 = request.body.quantity5;

  const component6 = request.body.component6;
  const quantity6 = request.body.quantity6;

  const component7 = request.body.component7;
  const quantity7 = request.body.quantity7;

  const component8 = request.body.component8;
  const quantity8 = request.body.quantity8;

  const component9 = request.body.component9;
  const quantity9 = request.body.quantity9;

  const component10 = request.body.component10;
  const quantity10 = request.body.quantity10;

  const component11 = request.body.component11;
  const quantity11 = request.body.quantity11;

  const component12 = request.body.component12;
  const quantity12 = request.body.quantity12;

  const component13 = request.body.component13;
  const quantity13 = request.body.quantity13;

  const component14 = request.body.component14;
  const quantity14 = request.body.quantity14;

  const component15 = request.body.component15;
  const quantity15 = request.body.quantity15;

  pool.query(
    "UPDATE pms_colors SET pms_number = $1, series = $2, description = $3, secondary_description = $4, component1 = $5, quantity1 = $6, component2 = $7, quantity2 = $8, component3 = $9, quantity3 = $10," +
      "        component4 = $11, quantity4 = $12, component5 = $13, quantity5 = $14, component6 = $15, quantity6 = $16, component7 = $17, quantity7 = $18, component8 = $19, quantity8 = $20" +
      "        , component9 = $21, quantity9 = $22, component10= $23, quantity10 = $24, component11 = $25, quantity11 = $26, component12 = $27, quantity12 = $28, component13 = $29," +
      " quantity13 = $30, component14 = $31, quantity14 = $32, component15 = $33, quantity15 = $34 WHERE pms_number = $1 AND series = $2",
    [
      pms_number,
      series,
      description,
      secondary_description,
      component1,
      quantity1,
      component2,
      quantity2,
      component3,
      quantity3,
      component4,
      quantity4,
      component5,
      quantity5,
      component6,
      quantity6,
      component7,
      quantity7,
      component8,
      quantity8,
      component9,
      quantity9,
      component10,
      quantity10,
      component11,
      quantity11,
      component12,
      quantity12,
      component13,
      quantity13,
      component14,
      quantity14,
      component15,
      quantity15,
    ],
    (error, results) => {
      if (error) {
        console.error("Error executing query", error.stack);
        response.status(400).send(", " + description);
      } else {
        response.status(201).send(`PMS color added with ID: ${results.id}`);
      }
    }
  );
};

// const deleteUser = (request, response) => {
//     const id = parseInt(request.params.id)
//
//     pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
//         if (error) {
//             throw error
//         }
//         response.status(200).send(`User deleted with ID: ${id}`)
//     })
// }

module.exports = {
  getUserById: getUserById,
  getPmsColor: getPmsColor,
  getComponentDetails: getComponentDetails,
  addPmsColor: addPmsColor,
  getAllColorComponents: getAllColorComponents,
  getAllPmsEntries: getAllPmsEntries,
  updatePmsColor: updatePmsColor,
  deletePmsNumber: deletePmsNumber,
  //createUser:createUser,
  //updateUser:updateUser,
  //deleteUser:deleteUser,
};
