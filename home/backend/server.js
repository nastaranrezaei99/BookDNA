const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();

const db = new sqlite3.Database(
    path.join(__dirname, "database.db"),
    function (err) {
        if (err) {
            console.error("Database connection error:", err.message);
        } else {
            console.log("Connected to SQLite database.");
        }
    }
);

/*
    دریافت یک کتاب بر اساس ID

    این Route باید قبل از /books/:category باشد.
*/
app.get("/books/id/:id", function (req, res) {
    const bookId = req.params.id;

    db.get(
        "SELECT * FROM books WHERE id = ?",
        [bookId],
        function (err, row) {
            if (err) {
                res.status(500).json({
                    error: err.message
                });
                return;
            }

            if (!row) {
                res.status(404).json({
                    error: "Book not found."
                });
                return;
            }

            res.json(row);
        }
    );
});

/*
    دریافت کتاب‌ها بر اساس Category
*/
app.get("/books/:category", function (req, res) {
    const category = req.params.category;

    db.all(
        `
            SELECT *
            FROM books
            WHERE LOWER(kategorie) = LOWER(?)
        `,
        [category],
        function (err, rows) {
            if (err) {
                res.status(500).json({
                    error: err.message
                });
                return;
            }

            res.json(rows);
        }
    );
});

/*
    جست‌وجوی کتاب بر اساس نام
*/
app.get("/search", function (req, res) {
    const text = req.query.q || "";

    db.all(
        `
            SELECT *
            FROM books
            WHERE LOWER(name) LIKE LOWER(?)
        `,
        [`%${text}%`],
        function (err, rows) {
            if (err) {
                res.status(500).json({
                    error: err.message
                });
                return;
            }

            res.json(rows);
        }
    );
});

/*
    دریافت Categoryهای موجود در Database
*/
app.get("/categories", function (req, res) {
    const sql = `
        SELECT
            kategorie AS name,
            COUNT(*) AS book_count
        FROM books
        WHERE kategorie IS NOT NULL
          AND TRIM(kategorie) != ''
        GROUP BY kategorie
        ORDER BY kategorie
    `;

    db.all(sql, [], function (err, rows) {
        if (err) {
            res.status(500).json({
                error: err.message
            });
            return;
        }

        res.json(rows);
    });
});

/*
    دریافت Celebrity Picks همراه با اطلاعات کتاب
*/
app.get("/celebrity-picks", function (req, res) {
    const sql = `
        SELECT
            celebrity_picks.id AS pick_id,
            celebrity_picks.celebrity_name AS celebrity,
            celebrity_picks.celebrity_img,
            books.id AS book_id,
            books.name,
            books.author,
            books.kategorie,
            books.beschreibung,
            books.img AS book_img
        FROM celebrity_picks
        INNER JOIN books
            ON celebrity_picks.book_id = books.id
        ORDER BY celebrity_picks.id
    `;

    db.all(sql, [], function (err, rows) {
        if (err) {
            res.status(500).json({
                error: err.message
            });
            return;
        }

        res.json(rows);
    });
});

app.listen(3000, function () {
    console.log("Server läuft auf Port 3000");
});