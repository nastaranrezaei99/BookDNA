const express = require("express");
const bcrypt = require("bcryptjs");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const Fuse = require("fuse.js");
const session = require("express-session");
const app = express();
app.use(express.json());

app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET || "bookdna-local-development-only",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        maxAge: 24 * 60 * 60 * 1000
    }
}));

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
db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL
    )
`, function (err) {
    if (err) {
        console.error("Fehler beim Erstellen der users-Tabelle:", err.message);
    } else {
        console.log("Users-Tabelle ist bereit.");
    }
});


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


app.get("/books", function (req, res) {
    db.all(
        "SELECT * FROM books",
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


app.get("/search", function (req, res) {
    const text = (req.query.q || "").trim();

    if (!text) {
        res.json([]);
        return;
    }

    db.all(
        "SELECT * FROM books",
        function (err, rows) {
            if (err) {
                res.status(500).json({
                    error: err.message
                });
                return;
            }

            const fuse = new Fuse(rows, {
                keys: ["name", "author", "kategorie"],
                threshold: 0.6
            });

            const searchResults = fuse.search(text);

            const books = searchResults.map(function (result) {
                return result.item;
            });

            res.json(books);
        }
    );
});




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
app.post("/register", async function (req, res) {
    const { name, email, password } = req.body;

    if (
        typeof name !== "string" ||
        typeof email !== "string" ||
        typeof password !== "string" ||
        !name.trim() ||
        !email.trim() ||
        password.length < 8
    ) {
        return res.status(400).json({
            error: "Bitte alle Felder ausfüllen. Das Passwort muss mindestens 8 Zeichen haben."
        });
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    try {
        const passwordHash = await bcrypt.hash(password, 12);

        db.run(
            "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)",
            [cleanName, cleanEmail, passwordHash],
            function (err) {
                if (err) {
                    if (err.code === "SQLITE_CONSTRAINT") {
                        return res.status(409).json({
                            error: "Diese E-Mail-Adresse ist bereits registriert."
                        });
                    }

                    return res.status(500).json({
                        error: "Fehler bei der Registrierung."
                    });
                }

                res.status(201).json({
                    message: "Registrierung erfolgreich.",
                    user: {
                        id: this.lastID,
                        name: cleanName,
                        email: cleanEmail
                    }
                });
            }
        );
    } catch (err) {
        res.status(500).json({
            error: "Fehler bei der Registrierung."
        });
    }
});

app.post("/login", function (req, res) {
    const { email, password } = req.body;

    if (typeof email !== "string" || typeof password !== "string" ||
        !email.trim() || !password) {
        return res.status(400).json({
            error: "Bitte E-Mail und Passwort eingeben."
        });
    }

    db.get(
        "SELECT * FROM users WHERE email = ?",
        [email.trim().toLowerCase()],
        async function (err, user) {
            if (err) {
                return res.status(500).json({
                    error: "Datenbankfehler."
                });
            }

            if (!user) {
                return res.status(401).json({
                    error: "E-Mail oder Passwort ist falsch."
                });
            }

            try {
                const passwordCorrect = await bcrypt.compare(
                    password,
                    user.password_hash
                );

                if (!passwordCorrect) {
                    return res.status(401).json({
                        error: "E-Mail oder Passwort ist falsch."
                    });
                }

                req.session.regenerate(function (err) {
                    if (err) {
                        return res.status(500).json({
                            error: "Fehler beim Erstellen der Sitzung."
                        });
                    }

                    req.session.userId = user.id;

                    req.session.save(function (err) {
                        if (err) {
                            return res.status(500).json({
                                error: "Fehler beim Speichern der Sitzung."
                            });
                        }

                        res.json({
                            message: "Anmeldung erfolgreich.",
                            user: {
                                id: user.id,
                                name: user.name,
                                email: user.email
                            }
                        });
                    });
                });
            } catch (err) {
                res.status(500).json({
                    error: "Fehler bei der Anmeldung."
                });
            }
        }
    );
});

app.get("/me", function (req, res) {
    if (!req.session.userId) {
        return res.status(401).json({
            error: "Nicht angemeldet."
        });
    }

    db.get(
        "SELECT id, name, email FROM users WHERE id = ?",
        [req.session.userId],
        function (err, user) {
            if (err) {
                return res.status(500).json({
                    error: "Datenbankfehler."
                });
            }

            if (!user) {
                return res.status(401).json({
                    error: "Benutzer nicht gefunden."
                });
            }

            res.json({
                user: user
            });
        }
    );
});

app.post("/logout", function (req, res) {
    req.session.destroy(function (err) {
        if (err) {
            return res.status(500).json({
                error: "Fehler beim Abmelden."
            });
        }

        res.clearCookie("connect.sid");

        res.json({
            message: "Erfolgreich abgemeldet."
        });
    });
});






// Bewertungen laden
app.get("/books/id/:id/reviews", function (req, res) {
    const bookId = req.params.id;

    const sql = `
    SELECT
        reviews.id,
        reviews.rating,
        reviews.comment,
        reviews.created_at,
        users.name AS userName
    FROM reviews
    LEFT JOIN users
        ON reviews.user_id = users.id
    WHERE reviews.book_id = ?
    ORDER BY reviews.id DESC
`;

    db.all(sql, [bookId], function (err, reviews) {
        if (err) {
            res.status(500).json({
                error: "Bewertungen konnten nicht geladen werden."
            });
            return;
        }

        res.json(reviews);
    });
});


// Neue Bewertung erhalten
app.post("/books/id/:id/reviews", function (req, res) {
    const bookId = req.params.id;
    const rating = req.body.rating;
    const comment = req.body.comment;
    const userId = req.session.userId;



    if (!userId) {
        return res.status(401).json({
            error: "Bitte melde dich an, um eine Bewertung abzugeben."
        });
    }




    //Wegen SQL injection 
    const sql = `
    INSERT INTO reviews (book_id, user_id, rating, comment)
    VALUES (?, ?, ?, ?)
`;

    db.run(sql, [bookId, userId, rating, comment], function (err) {
        if (err) {
            console.error(err.message);

            return res.status(500).json({
                message: "Die Bewertung konnte nicht gespeichert werden."
            });
            
        }

        res.status(201).json({
            message: "Bewertung gespeichert."
        });
    });
});


// Server starten
app.listen(3000, function () {
    console.log("Server läuft auf Port 3000");
});



