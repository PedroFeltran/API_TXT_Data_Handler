import { Router, Request, Response } from "express";
import { processarLinhasTXT } from "../utils/processarArquivo";

const router = Router();

// Definir a rota que vai processar o arquivo
router.post("/processar", async (req: Request, res: Response): Promise<void> => {
    try {
        // Verifica se há um arquivo anexado
        if (!req.file) {
            res.status(400).json({ error: "Nenhum arquivo foi enviado." });
            return; // Garante que a função termina aqui
        }

        // Caminho do arquivo enviado
        const caminhoArquivo = req.file.path;

        // Processa o arquivo TXT
        const registros = await processarLinhasTXT(caminhoArquivo);

        // Retorna os dados processados
        res.status(200).json(registros);
    } catch (error) {
        console.error("Erro ao processar o arquivo:", error);
        res.status(500).json({ error: "Erro ao processar o arquivo." });
    }
});

export default router;
