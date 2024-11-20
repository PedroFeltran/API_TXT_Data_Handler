Esta API foi desenvolvida para processar arquivos TXT contendo dados relacionados à atracação de navios e fornecer informações estruturadas a partir desses dados. Ela oferece um endpoint para enviar um arquivo TXT, que será lido e processado em diferentes tipos de registros.

Funcionalidades
  Processamento de Arquivos TXT: A API lê e processa arquivos TXT contendo 
  registros sobre escalas, containers, cargas, eventos e serviços de atracação.
  
  Estruturação de Dados: Os dados extraídos são organizados em diferentes tipos de registros 
  (Tipo_1, Tipo_2, Tipo_3, Tipo_4, Tipo_5, Tipo_6), com campos específicos para cada tipo.
  
  Retorno de Dados: Após o processamento, os dados são retornados em formato JSON, 
  facilitando a análise e utilização das informações.

Endpoints
  POST /processar: Envia um arquivo TXT para processamento.
    Parâmetros: Arquivo TXT (anexo como multipart/form-data).
    Resposta: JSON contendo os dados estruturados extraídos do arquivo.

Envie um arquivo TXT para o endpoint /processar utilizando ferramentas como Postman ou qualquer cliente HTTP.

