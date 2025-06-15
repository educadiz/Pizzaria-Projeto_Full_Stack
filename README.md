# README

### English Description
Fullstack system for managing a pizzeria with complete CRUD operations for clients, products, and orders. Features a Node.js + Express backend with SQLite3 database, ViaCEP API integration, and EJS frontend styled with Materialize CSS.

---

## 🍕 Pizzaria CRUD App

A aplicação simula o funcionamento básico de um sistema para uma pizzaria, permitindo o gerenciamento de clientes, produtos e pedidos por meio de operações CRUD.

---

## 🚀 Visão Geral

O objetivo principal é criar uma estrutura funcional para uma pizzaria digital, onde:

- **Clientes** podem ser cadastrados, editados e removidos.
- **Pizzas (produtos)** podem ser adicionadas, editadas ou removidas do sistema.
- **Pedidos** podem ser feitos relacionando clientes aos produtos escolhidos.

---

## 🛠️ Tecnologias Utilizadas

### Backend

- **Node.js**
- **Express** – Facilita a criação da API e o roteamento.
- **NPM** – Gerenciador de pacotes (versão 0.17.4 utilizada no projeto).
- Estrutura CRUD para: clientes, produtos e pedidos.
- O servidor BACKEND usado estará rodando na porta **4000** e deverá estar em visibilidade pública.
- SGBD **sqlite3** será usado para gerenciar o arquivo de banco de dados **/pizzariaDataBase.db**.
- A API **Via CEP** está implementada para complementação de endereços de forma automática através do CEP.

### Frontend

- Comunicação com o backend via requisições HTTP.
- Usou-se como base de estilo CSS, o framework [Materialize CSS](https://materializecss.com/).
- A aplicação FRONTEND usará a porta **3000** e deverá estar em visibilidade pública.
- Insira os dados de endereço de sua API Backend na variável contida em **/front/public/js/config.js**.

#### Bibliotecas / Recursos

- **AXIOS**
- **EJS**
- **SQLITE3**
- **API Via CEP**
- **API Open Street Map**

---

## 🔗 Estrutura de Comunicação

A aplicação é dividida entre cliente e servidor:

- O **frontend** envia requisições HTTP (GET, POST, PUT, DELETE) para o backend.
- O **backend (API Express)** processa essas requisições e interage com a base de dados.

---

## 🗄️ Estrutura do Banco de Dados

### Tabelas

- **Produtos**: Armazena informações sobre os produtos (pizzas) disponíveis.
- **Clientes**: Contém os dados dos clientes da pizzaria.
- **Pedidos**: Registra os pedidos realizados pelos clientes.

### Detalhes das Tabelas

#### Produtos

| Coluna    | Tipo    | Descrição                          |
|-----------|---------|------------------------------------|
| sabor     | TEXT    | Sabor da pizza                   |
| descricao | TEXT    | Descrição da pizza                |
| categoria | TEXT    | Categoria da pizza                 |
| tamanho   | TEXT    | Tamanho da pizza                   |
| preco     | REAL    | Preço da pizza                     |

#### Clientes

| Coluna      | Tipo    | Descrição                              |
|-------------|---------|----------------------------------------|
| nome        | TEXT    | Nome do cliente                        |
| email       | TEXT    | E-mail do cliente                     |
| telefone    | TEXT    | Telefone do cliente                   |
| CEP         | TEXT    | Código Postal (CEP)                  |
| rua         | TEXT    | Rua do endereço do cliente            |
| bairro      | TEXT    | Bairro do endereço do cliente         |
| cidade      | TEXT    | Cidade do endereço do cliente         |
| estado      | TEXT    | Estado do endereço do cliente         |
| complemento | TEXT    | Complemento do endereço do cliente    |

#### Pedidos

| Coluna            | Tipo    | Descrição                                      |
|-------------------|---------|------------------------------------------------|
| quantidade         | INTEGER | Quantidade de pizzas no pedido                |
| preco_total        | REAL    | Preço total do pedido                         |
| endereco_entrega   | TEXT    | Endereço de entrega do pedido                 |
| data_pedido        | TEXT    | Data em que o pedido foi realizado            |
| status             | TEXT    | Status atual do pedido (ex: Em andamento, Entregue) |

---

## 📂 Estrutura de Pastas

- **/back**: Contém o código-fonte do backend da aplicação.
- **/front**: Contém o código-fonte do frontend da aplicação.
- **/front/components/images**: Pasta para armazenamento de imagens.

---

## 👥 Criador do projeto

- **Eduardo Cadiz** - eduardo.cadiz@faculdadenovaroma.com.br
- 
---

## 🚀 Como Rodar o Projeto

### Backend

1. Navegue até a pasta `/back`.
2. Execute o comando `npm run dev` para iniciar o servidor.
3. Certifique-se de que a porta 4000 está liberada para modo público.

### Frontend

1. Navegue até a pasta `/front`.
2. Antes de iniciar, edite o arquivo `/front/public/js/config.js` e defina a variável `API_URL` com o endereço HTTP da sua aplicação Backend.
3. Execute o comando `npm start` para iniciar a aplicação Frontend.
4. Certifique-se de que a porta 3000 está liberada para modo público.

---

## 📧 Contato

Para mais informações, sugestões ou contribuições, entre em contato com os participantes do projeto através dos e-mails fornecidos acima.

---
