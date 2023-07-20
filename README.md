# CRUD-postgres
This is a simple CRUD (Create, Read, Update, Delete) operation project in Node.js, utilizing Express.js, PostgreSQL, and the pg(node-postgres) library.

## Table in database
|eid|ename|gender|address|salary|eposition|
|---|-----|------|-------|------|---------|
|INTEGER, PK|VARCHAR(30)|VARCHAR(10)|VARCHAR(30)|INTEGER|VARCHAR(30)|

## API endpoints

| HTTP Method | Endpoint                | Description                                       |
|-------------|-------------------------|---------------------------------------------------|
| POST        | /employee/add           | Add a new employee to the database.              |
| GET         | /employee/              | Get a list of all employees.                     |
| GET         | /employee/:id           | Get a specific employee's information by ID.     |
| PUT         | /employee/update/:id    | Update an existing employee's information.       |
| DELETE      | /employee/delete/:id    | Remove an employee from the database by ID.      |
