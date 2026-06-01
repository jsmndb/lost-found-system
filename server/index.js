const express = require("express");
const cors = require("cors");

const app = express();

const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "lost_found"
});

db.connect((err) => {
    if (err) {
        console.log("Database connection failed:", err);
    } else {
        console.log("Connected to MySQL (XAMPP)");
    }
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Lost and Found API is running");
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});