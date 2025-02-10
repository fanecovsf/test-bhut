## Tecnologias Utilizadas

- **Koa.Js**
- **Redis**
- **BullMQ**
- **Docker**

---

## Estrutura do `docker-compose`

- **app** - Aplicação principal, responsável por todos os endpoints.
- **redis** - Banco NoSQL e mensageria, usado em conjunto com o BullMQ.
- **token-worker** - Worker responsável por gerar e atualizar o token do usuário integrado.
- **vehicle-worker** - Worker responsável por gerar os logs dos veículos por um webhook.

---

## Instruções de Uso

1. Crie o arquivo `.env.prod` na pasta raiz (mesma pasta onde o arquivo `.env.dev` está) e defina as variáveis de ambiente:
    
    ```env
    BHUT_LOGIN=meu_usuario # No meu caso, gustavo.faneco
    BHUT_PASSWORD=minha_senha
    REDIS_HOST=redis
    REDIS_PORT=6379
    ```

2. Build e subida dos containers:
    ```sh
    docker compose up --build
    ```
    *(Ou qualquer outra variante do comando)*

3. Após a inicialização, a aplicação estará disponível em **`localhost:3000`**.
    - O arquivo `postman_collection.json` contém a collection dos endpoints a serem usados.
    - A variável de ambiente `url` no Postman deve ser configurada como **`localhost:3000`**.

---

## Endpoints

### **Autenticação**
- `GET /v1/integration/token` - Verifica o token de autenticação.

### **Gerenciamento de Veículos**
- `GET /v1/integration/api/car` - Recupera os carros da API integrada.
- `POST /v1/integration/api/car` - Cria um novo carro na API integrada.

### **Logs**
- `GET /logs` - Recupera os logs criados via webhook, após a criação de cada carro.

---

## Considerações

- **Redis como mensageria e banco NoSQL**: Optei por utilizar o Redis tanto para mensageria quanto para armazenamento de logs, reduzindo a complexidade do build. Outra alternativa seria utilizar MongoDB com Mongoose.
- **Uso do Koa.js**: Escolhi o Koa.js em vez do Express por ser mais leve e possuir menos dependências, o que simplifica a aplicação.
- **Timezone dos campos de data**: Os campos `data_hora_criacao` e `data_hora_processamento` retornam com timezone, ou seja, por padrão estarão em **UTC-0**.
