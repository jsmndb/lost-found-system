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

app.post("/found-items", (req, res) => {
    const {
        user_id,
        item_name,
        description,
        date_found,
        location
    } = req.body;

    const sql = `
        INSERT INTO found_items
        (user_id, item_name, description, date_found, location)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [user_id, item_name, description, date_found, location],
        (err, result) => {
            if (err) {
                return res.json(err);
            }

            res.json({
                message: "Found item added successfully"
            });
        }
    );
});

    app.get("/found-items", (req, res) => {
    const sql = "SELECT * FROM found_items";

    db.query(sql, (err, results) => {
        if (err) {
        return res.status(500).json(err);
        }

        res.json(results);
    });
    });

    app.get("/lost-items", (req, res) => {
    const sql = "SELECT * FROM lost_items";

    db.query(sql, (err, results) => {
        if (err) {
        return res.status(500).json(err);
        }

        res.json(results);
    });
    });

app.post("/found-items", (req, res) => {
  const { user_id, item_name, description, date_found, location } = req.body;

  const sql =
    "INSERT INTO found_items (user_id, item_name, description, date_found, location) VALUES (?, ?, ?, ?, ?)";

  db.query(
    sql,
    [user_id, item_name, description, date_found, location],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({ message: "Found item added successfully" });
    }
  );
});

    app.get("/match-items", (req, res) => {
    const lostSql = "SELECT * FROM lost_items";
    const foundSql = "SELECT * FROM found_items";

    db.query(lostSql, (err, lostResults) => {
        if (err) return res.status(500).json(err);

        db.query(foundSql, (err, foundResults) => {
        if (err) return res.status(500).json(err);

        let matches = [];

        lostResults.forEach((lost) => {
            foundResults.forEach((found) => {

            const lostWords = lost.item_name.toLowerCase().split(" ");
            const foundWords = found.item_name.toLowerCase().split(" ");

            let matchCount = 0;

            lostWords.forEach(word => {
                if (foundWords.includes(word)) {
                matchCount++;
                }
            });

            const totalWords = lostWords.length;

            const score = Math.round((matchCount / totalWords) * 100);

            // ONLY SHOW GOOD MATCHES
            if (score >= 50) {
                matches.push({
                lost_item: lost,
                found_item: found,
                score: score
                });
            }

            });
        });

        res.json(matches);
        });
    });
    });

        app.get("/stats", (req, res) => {

    const lostQuery = "SELECT COUNT(*) AS lostCount FROM lost_items";
    const foundQuery = "SELECT COUNT(*) AS foundCount FROM found_items";

    db.query(lostQuery, (err, lostResult) => {
        if (err) return res.status(500).json(err);

        db.query(foundQuery, (err, foundResult) => {
        if (err) return res.status(500).json(err);

        res.json({
            lost: lostResult[0].lostCount,
            found: foundResult[0].foundCount
        });
        });

    });

    });

app.listen(5000, () => {
    console.log("Server running on port 5000");
});