
# 📄 Mock API - Consulta e Download de Boletos

Esta é uma API simulada (mock) para fins de desenvolvimento e testes, que reproduz o comportamento de uma API real para consulta de contratos, parcelas e geração de boletos (em formato PDF).

---

## 🔧 Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [ts-node-dev](https://github.com/wclr/ts-node-dev)

---

## ▶️ Como Executar

```bash
# Instalar dependências
npm install

# Rodar em modo de desenvolvimento
npm run dev
```

A API estará disponível em:
**[http://localhost:3000](http://localhost:3000)**

---

## 📌 Estrutura dos Endpoints

### 1. `GET /contracts/:identification/:year/:month/:day`

Retorna os contratos associados ao CPF/CNPJ informado.

**Exemplo:**


```GET /contracts/12345678900/2004/12/28```

**Resposta:**

```json
{
  "situacao": 1,
  "mensagem": "",
  "contador": 1,
  "nome": "Fulano de Tal",
  "cpf": "12345678900",
  "contratos": [
    {
      "numero": 242570089,
      "cpf_cnpj": "12345678900",
      "tipo": 1
    }
  ]
}
```

---

### 2. `GET /installments/:identification/:contract_num`

Retorna todas as parcelas associadas a um contrato.

**Exemplo:**


```GET /installments/12345678900/242570089```


**Resposta:**

```json
{
  "situacao": 0,
  "mensagem": "",
  "contador": 10,
  "cpf_cnpj": 12345678900,
  "numeroContrato": 242570089,
  "parcelas": [
    {
      "numero": 1,
      "dataVencimento": "2024-10-10T00:00:00",
      "situacao": 1
    },
    ...
  ]
}
```

---

### 3. `GET /receipts/:identification/:contract_num/:installment_num`

Realiza o **download do boleto** da parcela, caso ela esteja disponível (situação `0`).

**Exemplo:**

```
GET /receipts/12345678900/242570089/10
```

* Retorna o arquivo PDF se a parcela estiver liberada.
* Caso contrário, retorna erro 403 com mensagem explicativa.

---

## ❌ Simulação de Erros

Você pode forçar erros utilizando a query `?error=` em qualquer endpoint:

| Código | Descrição                                      |
| ------ | ---------------------------------------------- |
| 310    | Many Redirects                                 |
| 401    | Unauthorized (token inválido)                  |
| 403    | Parcela bloqueada (há mais de 1 mês em aberto) |
| 408    | Timeout                                        |
| 500    | Erro inesperado                                |

**Exemplo:**

```
GET /contracts/12345678900/2004/12/28?error=403
```

---

## 📂 Estrutura de Pastas

```
src/
├── routes/
│   ├── contracts.ts
│   ├── installments.ts
│   └── receipts.ts
├── middlewares/
│   └── simulateError.ts
├── tests/
│   └── test-api.rest      # Arquivo de testes usando extensão REST Client.
├── media/
│   └── boleto.pdf         # Arquivo mock retornado no /receipts
└── app.ts                 # Arquivo principal
```

## 📌 Observações

* A API **não persiste dados** (tudo é mock).
* Ideal para frontends ou backends que estão em desenvolvimento e precisam simular uma API de boletos.
