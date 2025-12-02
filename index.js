import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

// ⭐ Importante: aquí vas a pegar tu API Key de Supercell
const API_KEY = process.env.CLASH_API_KEY; // Render la guarda aquí

app.use(cors());
app.use(express.json());

// 🔥 RUTA PARA CONSULTAR UN JUGADOR
app.get("/player/:tag", async (req, res) => {
    try {
        const tag = req.params.tag.replace("#", "%23");

        const apiRes = await fetch(
            `https://api.clashroyale.com/v1/players/%23${tag}`,
            {
                headers: {
                    "Authorization": `Bearer ${API_KEY}`
                }
            }
        );

        const data = await apiRes.json();
        res.json(data);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al obtener datos del jugador" });
    }
});

// 🔥 RUTA PARA OBTENER EL BATTLELOG
app.get("/player/:tag/battles", async (req, res) => {
    try {
        const tag = req.params.tag.replace("#", "%23");

        const apiRes = await fetch(
            `https://api.clashroyale.com/v1/players/%23${tag}/battlelog`,
            {
                headers: {
                    "Authorization": `Bearer ${API_KEY}`
                }
            }
        );

        const data = await apiRes.json();
        res.json(data);

    } catch (err) {
        res.status(500).json({ error: "Error al obtener battlelog" });
    }
});


app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});
