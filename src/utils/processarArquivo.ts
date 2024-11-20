import fs from "fs";
import readline from "readline";

interface Registro {
    [key: string]: any[];
}

export async function processarLinhasTXT(caminhoArquivo: string): Promise<Registro> {
    const registros: Registro = {
        Tipo_1: [],
        Tipo_2: [],
        Tipo_3: [],
        Tipo_4: [],
        Tipo_5: [],
        Tipo_6: []
    };

    const arquivoStream = fs.createReadStream(caminhoArquivo, { encoding: "latin1" });
    const rl = readline.createInterface({
        input: arquivoStream,
        crlfDelay: Infinity
    });

    let contadorId: { [key: string]: number } = {
        Tipo_1: 1,
        Tipo_2: 1,
        Tipo_3: 1,
        Tipo_4: 1,
        Tipo_5: 1,
        Tipo_6: 1
    };

    for await (const linha of rl) {
        const tipoRegistro = linha[0];

        const processarDados = (tipo: string, dados: any) => {
            dados["ID"] = contadorId[tipo];
            registros[tipo].push(dados);
            contadorId[tipo]++;
        };

        if (tipoRegistro === "1") {
            processarDados("Tipo_1", {
                TIPO_REGISTRO: tipoRegistro,
                NUMERO_ESCALA: linha.slice(1, 12).trim(),
                CODIGO_IMO: linha.slice(12, 22).trim(),
                NOME_EMBARCACAO: linha.slice(22, 77).trim(),
                DATA_PREV_ATRACACAO: linha.slice(77, 85).trim(),
                DATA_EFET_ATRACACAO: linha.slice(85, 93).trim(),
                ESCALA_BLOQUEADA: linha.slice(93, 94).trim(),
                COD_TIPO_BLOQUEIO_ESCALA: linha.slice(94, 96).trim(),
                DESCRICAO_BLOQUEIO_ESCALA: linha.slice(96, 342).trim(),
                NUMERO_VIAGEM: linha.slice(342, 352).trim(),
                DATA_DEADLINE_DTSC: linha.slice(352, 360).trim(),
                HORA_DEADLINE_DTSC: linha.slice(360, 366).trim()
            });
        } else if (tipoRegistro === "2") {
            processarDados("Tipo_2", {
                TIPO_REGISTRO: tipoRegistro,
                ID_MANIFESTO: linha.slice(1, 14).trim(),
                TIPO_MANIFESTO: linha.slice(14, 15).trim(),
                NUMERO_MANIFESTO: linha.slice(15, 29).trim(),
                CODIGO_PORTO: linha.slice(29, 34).trim(),
                DATA_EMISSAO: linha.slice(34, 42).trim()
            });
        } else if (tipoRegistro === "3") {
            processarDados("Tipo_3", {
                TIPO_REGISTRO: tipoRegistro,
                NUMERO_ESCALA: linha.slice(1, 12).trim(),
                ID_CONTAINER: linha.slice(12, 27).trim(),
                NUMERO_CONTEINER: linha.slice(27, 41).trim(),
                TIPO_CONTAINER: linha.slice(41, 44).trim(),
                STATUS: linha.slice(44, 45).trim(),
                CODIGO_PORTO_ORIGEM: linha.slice(45, 50).trim(),
                CODIGO_PORTO_DESTINO: linha.slice(50, 55).trim(),
                DATA_EMBARQUE: linha.slice(55, 63).trim(),
                DATA_DESCARGA: linha.slice(63, 71).trim()
            });
        } else if (tipoRegistro === "4") {
            processarDados("Tipo_4", {
                TIPO_REGISTRO: tipoRegistro,
                ID_CARGA: linha.slice(1, 14).trim(),
                TIPO_CARGA: linha.slice(14, 16).trim(),
                DESCRICAO_CARGA: linha.slice(16, 116).trim(),
                PESO: linha.slice(116, 125).trim(),
                VOLUME: linha.slice(125, 134).trim(),
                CODIGO_PORTO_ORIGEM: linha.slice(134, 139).trim(),
                CODIGO_PORTO_DESTINO: linha.slice(139, 144).trim()
            });
        } else if (tipoRegistro === "5") {
            processarDados("Tipo_5", {
                TIPO_REGISTRO: tipoRegistro,
                NUMERO_ESCALA: linha.slice(1, 12).trim(),
                EVENTO: linha.slice(12, 42).trim(),
                DATA_EVENTO: linha.slice(42, 50).trim(),
                HORA_EVENTO: linha.slice(50, 56).trim()
            });
        } else if (tipoRegistro === "6") {
            processarDados("Tipo_6", {
                TIPO_REGISTRO: tipoRegistro,
                NUMERO_ESCALA: linha.slice(1, 12).trim(),
                ID_SERVICO: linha.slice(12, 20).trim(),
                DESCRICAO_SERVICO: linha.slice(20, 120).trim(),
                VALOR: linha.slice(120, 130).trim(),
                DATA_EXECUCAO: linha.slice(130, 138).trim()
            });
        } else {
            console.warn(`Registro desconhecido: ${linha}`);
        }
    }

    return registros;
}
