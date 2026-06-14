const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const app = express();

app.use(express.static(__dirname));

const db = new sqlite3.Database("./database.db");

app.get("/books/:category", function (req, res) {
    const category = req.params.category;

    db.all(
        "SELECT * FROM books WHERE LOWER(kategorie) = LOWER(?)",
        [category],
        function (err, rows) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }

            res.json(rows);
        }
    );
});


app.get("/search", function(req, res){
    const text = req.query.q;db.all("SELECT * FROM books WHERE name LIKE ?",["%" + text + "%"],function(err, rows){
            res.json(rows);
        }
    );

});
app.listen(3000, function () {
    console.log("Server läuft auf Port 3000");
});



