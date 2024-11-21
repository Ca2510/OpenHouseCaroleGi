const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const db = new sqlite3.Database("./gifts.db");

app.use(cors());
app.use(bodyParser.json());

// Criação da tabela no banco de dados
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS gifts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            status TEXT NOT NULL
        )
    `);
});

// Endpoint para obter todos os presentes
app.get("/gifts", (req, res) => {
    db.all("SELECT * FROM gifts", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Endpoint para atualizar o status de um presente
app.post("/update-gift", (req, res) => {
    const { id, status } = req.body;
    if (!id || !status) {
        res.status(400).json({ error: "Dados inválidos" });
        return;
    }

    db.run(
        "UPDATE gifts SET status = ? WHERE id = ? AND status = 'disponivel'",
        [status, id],
        function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            if (this.changes === 0) {
                res.status(400).json({ error: "Presente já comprado ou não encontrado" });
                return;
            }
            res.json({ success: true });
        }
    );
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});