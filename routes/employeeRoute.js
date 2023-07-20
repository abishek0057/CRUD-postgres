const express = require("express");
const router = express.Router();
const {
  addEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  removeEmployeeById,
} = require("../controller/employee");

router.post("/add", addEmployee);
router.get("/", getAllEmployees);
router.get("/:id", getEmployeeById);
router.put("/update/:id", updateEmployee);
router.delete("/delete/:id", removeEmployeeById);

module.exports = router;
