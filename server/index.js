const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");

const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

/* =========================
   MULTER CONFIG
========================= */

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

/* =========================
   TEST ROUTE
========================= */

app.get("/", (req, res) => {
  res.send("Lost and Found API is running");
});

/* =========================
   REGISTER
========================= */

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = bcrypt.hashSync(
    password,
    10
  );

  const sql =
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

  db.query(
    sql,
    [name, email, hashedPassword],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "User registered successfully",
      });
    }
  );
});

/* =========================
   LOGIN
========================= */

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql =
    "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (result.length === 0) {
      return res.json({
        message: "User not found",
      });
    }

    const user = result[0];

    const validPassword =
      bcrypt.compareSync(
        password,
        user.password
      );

    if (!validPassword) {
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

/* =========================
   USERS
========================= */

app.get("/users", (req, res) => {
  db.query(
    "SELECT * FROM users",
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(result);
    }
  );
});

/* =========================
   LOST ITEMS
========================= */

app.post(
  "/lost-items",
  upload.single("image"),
  (req, res) => {
    console.log(req.body);
    console.log(req.file);

    const {
      user_id,
      item_name,
      description,
      date_lost,
      location,
    } = req.body;

    const image = req.file
      ? req.file.filename
      : null;

    const sql = `
      INSERT INTO lost_items
      (
        user_id,
        item_name,
        description,
        date_lost,
        location,
        image
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [
        user_id,
        item_name,
        description,
        date_lost,
        location,
        image,
      ],
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json(err);
        }

        res.json({
          message:
            "Lost item added successfully",
        });
      }
    );
  }
);

app.get("/lost-items", (req, res) => {
  const sql =
    "SELECT * FROM lost_items";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });
});

/* =========================
   FOUND ITEMS
========================= */

app.post(
  "/found-items",
  upload.single("image"),
  (req, res) => {
    const {
      user_id,
      item_name,
      description,
      date_found,
      location,
    } = req.body;

    const image = req.file
      ? req.file.filename
      : null;

    const sql = `
      INSERT INTO found_items
      (
        user_id,
        item_name,
        description,
        date_found,
        location,
        image
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [
        user_id,
        item_name,
        description,
        date_found,
        location,
        image,
      ],
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json(err);
        }

        res.json({
          message:
            "Found item added successfully",
        });
      }
    );
  }
);

app.get("/found-items", (req, res) => {
  const sql =
    "SELECT * FROM found_items";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });
});

/* =========================
   MATCH ITEMS
========================= */

app.get("/match-items", (req, res) => {
  db.query(
    "SELECT * FROM lost_items",
    (err, lostResults) => {
      if (err)
        return res.status(500).json(err);

      db.query(
        "SELECT * FROM found_items",
        (err, foundResults) => {
          if (err)
            return res.status(500).json(err);

          let matches = [];

          lostResults.forEach((lost) => {
            foundResults.forEach(
              (found) => {
                const lostWords =
                  lost.item_name
                    .toLowerCase()
                    .split(" ");

                const foundWords =
                  found.item_name
                    .toLowerCase()
                    .split(" ");

                let matchCount = 0;

                lostWords.forEach(
                  (word) => {
                    if (
                      foundWords.includes(word)
                    ) {
                      matchCount++;
                    }
                  }
                );

                const score =
                  Math.round(
                    (matchCount /
                      lostWords.length) *
                      100
                  );

                if (score >= 50) {
                  matches.push({
                    lost_item: lost,
                    found_item: found,
                    score,
                  });
                }
              }
            );
          });

          res.json(matches);
        }
      );
    }
  );
});

/* =========================
   STATS
========================= */

app.get("/stats", (req, res) => {
  db.query(
    "SELECT COUNT(*) AS lost FROM lost_items",
    (err, lostResult) => {
      if (err)
        return res.status(500).json(err);

      db.query(
        "SELECT COUNT(*) AS found FROM found_items",
        (err, foundResult) => {
          if (err)
            return res.status(500).json(err);

          res.json({
            lost: lostResult[0].lost,
            found: foundResult[0].found,
            matches: 0,
          });
        }
      );
    }
  );
});

/* =========================
   SERVER
========================= */

app.listen(5000, () => {
  console.log(
    "Server running on port 5000"
  );
});