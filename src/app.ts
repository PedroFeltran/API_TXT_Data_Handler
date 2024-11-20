import express from "express";
import bodyParser from "body-parser";
import processarRoutes from "./routes/processar";

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Rotas
app.use("/processar", processarRoutes);

// Inicializar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
