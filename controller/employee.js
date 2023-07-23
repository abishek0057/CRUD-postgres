const pg = require("pg");

const config = {
  user: process.env.USER, //'postgres' by default
  host: "127.0.0.1",
  database: "company", // name of the database in postgres
  password: process.env.PASSWORD, //password add during installation of postgres
  port: 5432, //default postgres port
};

const pool = new pg.Pool(config);

//add new employee record
const addEmployee = async (req, res) => {
  const addEmployeeQuery = `INSERT INTO employee (
        ename, gender, address, salary, eposition)
        VALUES ($1,$2,$3,$4,$5) RETURNING *`;
  const { name, gender, address, salary, position } = req.body;
  try {
    const result = await pool.query(addEmployeeQuery, [
      name,
      gender,
      address,
      salary,
      position,
    ]);
    res.status(200).json({
      message: "Add successful",
      data: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error occurred while adding employee" });
  }
};

//get all employee records
const getAllEmployees = async (req, res) => {
  const getAllEmployeesQuery = `SELECT * FROM employee`;
  try {
    const result = await pool.query(getAllEmployeesQuery);
    res.status(200).json({
      message: "All employees",
      data: result.rows,
    });
  } catch (error) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error occurred while fetching employees" });
  }
};

//get individual employee records using id
const getEmployeeById = async (req, res) => {
  const getEmployeeByIdQuery = "SELECT * FROM employee WHERE eid = $1";
  const { id } = req.params;
  const result = await pool.query(getEmployeeByIdQuery, [id]);
  try {
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
  } catch (error) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error occurred while fetching employees" });
  }
};

//update individual employee records using id
const updateEmployee = async (req, res) => {
  const updateEmployeeQuery = `UPDATE employee SET ename=$1, gender=$2, address=$3, salary=$4, eposition=$5 WHERE eid=$6 RETURNING *`;
  const { name, gender, address, salary, position } = req.body;
  const { id } = req.params;
  try {
    const result = await pool.query(updateEmployeeQuery, [
      name,
      gender,
      address,
      salary,
      position,
      id,
    ]);

    res.status(200).json({
      message: "Update successful",
      data: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error occurred while updating employee" });
  }
};

//delete individual employee records using id
const removeEmployeeById = async (req, res) => {
  const removeEmployeeByIdQuery =
    "DELETE FROM employee WHERE eid = $1 RETURNING *";
  const { id } = req.params;

  try {
    const result = await pool.query(removeEmployeeByIdQuery, [id]);
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
  } catch (error) {
    console.error(err);
    res.status(500).json({ message: "Error occurred while deleting employee" });
  }
};

module.exports = {
  addEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  removeEmployeeById,
};
