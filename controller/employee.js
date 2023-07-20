const pg = require("pg");

const config = {
  user: process.env.USER, //'postgres' by default
  host: "127.0.0.1",
  database: "company", // name of the database in postgres
  password: process.env.PASSWORD, //password add during installation of postgres
  port: 5432, //default postgres
};

const pool = new pg.Pool(config);

//add new employee record
const addEmployee = (req, res) => {
  const addEmployeeQuery = `INSERT INTO employee (
        ename, gender, address, salary, eposition)
        VALUES ($1,$2,$3,$4,$5) RETURNING *`;
  const { name, gender, address, salary, position } = req.body;
  pool.query(
    addEmployeeQuery,
    [name, gender, address, salary, position],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.status(200).json({
        message: "Add succesful",
        data: result.rows[0],
      });
    }
  );
};

//get all employee records
const getAllEmployees = (req, res) => {
  const getAllEmployeesQuery = `SELECT * FROM employee`;
  pool.query(getAllEmployeesQuery, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.status(200).json({
      message: "All employee",
      data: result.rows,
    });
  });
};

//get individual employee records using id
const getEmployeeById = (req, res) => {
  const getEmployeeByIdQuery = "SELECT * FROM employee WHERE eid = $1";
  const { id } = req.params;

  pool.query(getEmployeeByIdQuery, [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      if (result.rows.length === 0) {
        res.status(404).json({
          message: "Employee not found",
        });
      } else {
        res.status(200).json({
          message: "Employee found",
          data: result.rows[0],
        });
      }
    }
  });
};

//update individual employee records using id
const updateEmployee = (req, res) => {
  const updateEmployeeQuery = `UPDATE employee SET ename=$1, gender=$2, address=$3, salary=$4, eposition=$5 WHERE eid=$6 RETURNING *`;
  const { name, gender, address, salary, position } = req.body;
  const { id } = req.params;
  pool.query(
    updateEmployeeQuery,
    [name, gender, address, salary, position, id],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.status(200).json({
        message: "Update succesful",
        data: result.rows[0],
      });
    }
  );
};

//delete individual employee records using id
const removeEmployeeById = (req, res) => {
  const removeEmployeeByIdQuery =
    "DELETE FROM employee WHERE eid = $1 RETURNING *";
  const { id } = req.params;

  pool.query(removeEmployeeByIdQuery, [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      if (result.rows.length === 0) {
        res.status(404).json({
          message: "Employee not found",
        });
      } else {
        res.status(200).json({
          message: "Deleted employee",
          data: result.rows[0],
        });
      }
    }
  });
};

module.exports = {
  addEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  removeEmployeeById,
};
