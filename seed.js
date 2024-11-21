const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./gifts.db");

const gifts = [
    { name: "Jogo de Cama 1", status: "disponivel" },
    { name: "Jogo de Cama 2", status: "disponivel" },
    { name: "Jogo de Cama 3", status: "disponivel" },
    { name: "Jogo de Toalhas 1", status: "disponivel" },
    { name: "Jogo de Toalhas 2", status: "disponivel" },
    { name: "Mesinha Bar/Café", status: "disponivel" },
    { name: "Jogo de Copos", status: "disponivel" },
    { name: "Aparelho de Jantar", status: "disponivel" },
    { name: "Jogo de Bowl para Sopa/Sobremesa", status: "disponivel" },
    { name: "Fechadura Eletrônica", status: "disponivel" },
    { name: "Kit Lavabo", status: "disponivel" },
    { name: "Kit Banheiro Casal", status: "disponivel" },
    { name: "Fruteira de Mesa", status: "disponivel" },
    { name: "Kit Organizadores Para Ele", status: "disponivel" },
    { name: "Kit Organizadores Para Ela", status: "disponivel" },
    { name: "Aspirador de Pó", status: "disponivel" },
    { name: "Capacho", status: "disponivel" },
    { name: "2 Tapetes para Banheiro Antiderrapante", status: "disponivel" },
    { name: "Frigideira com Alça Removível", status: "disponivel" },
    { name: "Forma de Pão", status: "disponivel" },
    { name: "Coberdrom Dupla Face", status: "disponivel" },
    { name: "Escultura de Parede - Tam G", status: "disponivel" },
    { name: "Capas para Almofadas", status: "disponivel" },
    { name: "Lixeira + Limpador Lavabo", status: "disponivel" },
    { name: "Cadeira de Escritório", status: "disponivel" }
];

db.serialize(() => {
    gifts.forEach((gift) => {
        db.run("INSERT INTO gifts (name, status) VALUES (?, ?)", [gift.name, gift.status]);
    });
});

console.log("Presentes adicionados ao banco de dados.");
db.close();