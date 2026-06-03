const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Lost and Found API is running");
});

app.post("/register", (req, res) => {
    const { name, email, password } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 10);

    const sql =
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

    db.query(
        sql,
        [name, email, hashedPassword],
        (err, result) => {
            if (err) {
                return res.json(err);
            }

            res.json({
                message: "User registered successfully"
            });
        }
    );
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], (err, result) => {
        if (err) {
            return res.json({ error: err });
        }

        if (result.length === 0) {
            return res.json({
                message: "User not found",
            });
        }

        const user = result[0];

        const isMatch = bcrypt.compareSync(
            password,
            user.password
        );

        if (!isMatch) {
            return res.json({
                message: "Wrong password",
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
            },
            "secretkey"
        );

        res.json({
            message: "Login successful",
            token,
        });
    });
});

app.get("/users", (req, res) => {
    db.query("SELECT * FROM users", (err, result) => {
        if (err) {
            return res.json(err);
        }

        res.json(result);
    });
});

app.post("/register", (req, res) => {
    const { name, email, password } = req.body;

    const sql =
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

    db.query(sql, [name, email, password], (err, result) => {
        if (err) {
            return res.json(err);
        }

        res.json({
            message: "User registered successfully"
        });
    });
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], (err, result) => {
        if (err) {
            return res.json(err);
        }

        if (result.length === 0) {
            return res.json({
                message: "User not found"
            });
        }

        const user = result[0];

        const validPassword = bcrypt.compareSync(
            password,
            user.password
        );

        if (!validPassword) {
            return res.json({
                message: "Wrong password"
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            "secretkey"
        );

        res.json({
            message: "Login successful",
            token: token
        });
    });
});

app.post("/lost-items", (req, res) => {
    const {
        user_id,
        item_name,
        description,
        date_lost,
        location
    } = req.body;

    const sql = `
        INSERT INTO lost_items
        (user_id, item_name, description, date_lost, location)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [user_id, item_name, description, date_lost, location],
        (err, result) => {
            if (err) {
                return res.json(err);
            }

            res.json({
                message: "Lost item added successfully"
            });
        }
    );
});

app.get("/lost-items", (req, res) => {
    db.query(
        "SELECT * FROM lost_items",
        (err, result) => {
            if (err) {
                return res.json(err);
            }

            res.json(result);
        }
    );
});

app.post("/lost-items", (req, res) => {
    const {
        user_id,
        item_name,
        description,
        date_lost,
        location
    } = req.body;

    const sql = `
        INSERT INTO lost_items
        (user_id, item_name, description, date_lost, location)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [user_id, item_name, description, date_lost, location],
        (err, result) => {
            if (err) {
                return res.json(err);
            }

            res.json({
                message: "Lost item added successfully"
            });
        }
    );
});

app.get("/lost-items", (req, res) => {
    db.query(
        "SELECT * FROM lost_items",
        (err, result) => {
            if (err) {
                return res.json(err);
            }

            res.json(result);
        }
    );
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});