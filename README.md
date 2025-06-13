# Projeto Serverless com LocalStack

Este projeto simula uma arquitetura serverless utilizando **Docker**, **LocalStack**, **Node.js** e serviços da **AWS** localmente (SQS + DynamoDB). Ele inclui uma API REST e um worker que consome mensagens da fila.

---

## 🚀 Passos para subir o ambiente

1. **Clone o projeto** (ou extraia o `.zip`);
- [https://github.com/lucas62/serveless-localstack](https://github.com/lucas62/serveless-localstack)

2. **Execute o comando abaixo no diretório raiz**:

```bash
docker-compose up --build
```

Esse comando irá:

- Criar a fila `UserQueue` e a tabela `Users` no LocalStack via `init-localstack.sh`;
- Subir a API na porta `3000`;
- Iniciar o worker que consome mensagens da fila.

---

## 📦 Testando a API

Um script com chamadas `curl` está disponível para facilitar os testes:

```bash
sh test-api.sh
```

### Ou manualmente:

#### Criar usuário (`POST /users`)

```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Lucas", "email": "lucas@example.com"}'
```

#### Listar usuários (`GET /users`)

```bash
curl http://localhost:3000/users
```

---

## ☁️ Aplicação dos Conceitos de Computação em Nuvem

O projeto aplica conceitos fundamentais de computação em nuvem, especialmente arquitetura **serverless**, simulando recursos da AWS localmente:

| Conceito | Aplicação |
|---------|-----------|
| **Serviços gerenciados** | Uso do **DynamoDB** (armazenamento) e **SQS** (mensageria) via LocalStack. |
| **Escalabilidade** | Arquitetura desacoplada com API e Worker independentes permite escalar separadamente. |
| **Event-driven** | A API envia eventos para a fila SQS e o worker consome, processando-os assíncronamente. |
| **Desacoplamento** | O uso de fila elimina dependência direta entre a API e o banco de dados. |
| **Infraestrutura como Código** | Provisionamento automatizado via `docker-compose.yml` e script de inicialização. |

---

## 📁 Estrutura do Projeto

```
projeto/
├── api/                  # API REST Express
│   ├── index.js
│   ├── aws.js
│   ├── Dockerfile
│   └── package.json
├── worker/               # Worker que consome mensagens do SQS
│   ├── index.js
│   ├── aws.js
│   ├── Dockerfile
│   └── package.json
├── init-localstack.sh    # Script para criar fila e tabela no LocalStack
├── test-api.sh           # Script de teste com curl
└── docker-compose.yml    # Orquestração do ambiente
```
