# DNCommerce

![Imagem do Projeto](https://via.placeholder.com/800x400/007ACC/FFFFFF?text=DNCommerce+Backend+API)

Uma API backend completa para e-commerce construída com Node.js, Express, TypeScript e PostgreSQL. Este projeto oferece uma base robusta para gerenciar clientes, produtos, estoque, pedidos e operações de vendas.

## 🚀 Funcionalidades

- **Gestão de Clientes**: Operações CRUD completas para dados de clientes
- **Catálogo de Produtos**: Gerenciar inventário de produtos com preços e descrições
- **Gestão de Estoque**: Rastrear níveis de inventário e movimentações de estoque
- **Processamento de Pedidos**: Lidar com criação, rastreamento e gerenciamento de pedidos
- **Analytics de Vendas**: Rastrear dados de vendas e gerar relatórios
- **API RESTful**: Endpoints de API limpos e intuitivos
- **Migrações de Banco**: Gerenciamento automatizado de esquema de banco com Drizzle ORM
- **Type Safety**: Implementação completa em TypeScript com validação Zod
- **Suporte Docker**: Deploy fácil com Docker Compose
- **Validação de Dados**: Validação robusta de entrada com Zod
- **CORS Configurado**: Suporte para requisições cross-origin
- **Estrutura Modular**: Arquitetura organizada em módulos independentes

## 🛠️ Stack Tecnológica

- **Runtime**: Node.js com ES Modules
- **Framework**: Express.js v5.1.0
- **Linguagem**: TypeScript v5.8.3
- **Banco de Dados**: PostgreSQL
- **ORM**: Drizzle ORM v0.44.4
- **Validação**: Zod v4.0.14
- **Containerização**: Docker & Docker Compose
- **CORS**: cors v2.8.5
- **Driver PostgreSQL**: postgres v3.4.7

## 📋 Pré-requisitos

Antes de executar este projeto, certifique-se de ter o seguinte instalado:

- [Node.js](https://nodejs.org/) (v18 ou superior)
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)
- [Git](https://git-scm.com/)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

## 🚀 Início Rápido

### 1. Clonar o Repositório

```bash
git clone <url-do-repositorio>
cd DNCommerce
```

### 2. Configuração do Ambiente

Crie um arquivo `.env` no diretório raiz com as seguintes variáveis:

```env
PORT=3333
DB_USER=docker
DB_PASSWORD=docker
DB_NAME=dncommerce
DB_URL=postgresql://docker:docker@localhost:5432/dncommerce
```

### 3. Iniciar o Banco de Dados

```bash
docker-compose up -d
```

### 4. Instalar Dependências

```bash
npm install
```

### 5. Executar Migrações do Banco

```bash
npx drizzle-kit push
```

### 6. Iniciar o Servidor de Desenvolvimento

```bash
npm run dev
```

A API estará disponível em `http://localhost:3333`

## 📚 Endpoints da API

### Health Check
- `GET /health` - Verifica se a API está funcionando

### Clientes
- `GET /customers` - Obter todos os clientes
- `POST /customers` - Criar um novo cliente
- `GET /customers/:id` - Obter cliente por ID
- `PUT /customers/:id` - Atualizar cliente
- `DELETE /customers/:id` - Deletar cliente

### Produtos
- `GET /products` - Obter todos os produtos
- `POST /products` - Criar um novo produto
- `GET /products/:id` - Obter produto por ID
- `PUT /products/:id` - Atualizar produto
- `DELETE /products/:id` - Deletar produto

### Estoque
- `GET /stocks` - Obter todos os registros de estoque
- `POST /stocks` - Criar nova entrada de estoque
- `GET /stocks/:id` - Obter estoque por ID
- `PUT /stocks/:id` - Atualizar estoque
- `DELETE /stocks/:id` - Deletar estoque

### Pedidos
- `GET /orders` - Obter todos os pedidos
- `POST /orders` - Criar um novo pedido
- `GET /orders/:id` - Obter pedido por ID
- `PUT /orders/:id` - Atualizar pedido
- `DELETE /orders/:id` - Deletar pedido

### Vendas
- `GET /sales` - Obter todos os registros de vendas
- `POST /sales` - Criar novo registro de venda
- `GET /sales/:id` - Obter venda por ID
- `PUT /sales/:id` - Atualizar venda
- `DELETE /sales/:id` - Deletar venda

## 📝 Exemplos de Uso da API

### Criar um Cliente
```bash
curl -X POST http://localhost:3333/customers \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@email.com",
    "password": "senha123"
  }'
```

### Criar um Produto
```bash
curl -X POST http://localhost:3333/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Smartphone XYZ",
    "description": "Smartphone com câmera de 48MP",
    "price": "1299.99"
  }'
```

### Criar um Pedido
```bash
curl -X POST http://localhost:3333/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customerId": "uuid-do-cliente",
    "products": [
      {
        "productId": "uuid-do-produto",
        "quantity": 2,
        "price": "1299.99"
      }
    ],
    "total": "2599.98"
  }'
```

## 🏗️ Estrutura do Projeto

```
DNCommerce/
├── src/                       # Código fonte TypeScript
│   ├── app/                   # Módulos da aplicação
│   │   ├── customer/          # Gestão de clientes
│   │   │   ├── customer-controller.ts
│   │   │   ├── customer-routes.ts
│   │   │   └── customer-service.ts
│   │   ├── product/           # Gestão de produtos
│   │   │   ├── product-controller.ts
│   │   │   ├── product-routes.ts
│   │   │   └── product-service.ts
│   │   ├── stock/             # Gestão de estoque
│   │   │   ├── stock-controller.ts
│   │   │   ├── stock-product-controller.ts
│   │   │   ├── stock-routes.ts
│   │   │   └── stock-service.ts
│   │   ├── order/             # Processamento de pedidos
│   │   │   ├── order-controllers.ts
│   │   │   ├── order-routes.ts
│   │   │   └── order-services.ts
│   │   └── sale/              # Gestão de vendas
│   │       ├── sales-controllers.ts
│   │       ├── sales-routes.ts
│   │       └── sales-services.ts
│   ├── db/                    # Configuração do banco de dados
│   │   ├── connection.ts      # Conexão com o banco
│   │   ├── migrations/        # Migrações do banco
│   │   └── schema/            # Esquemas do banco
│   │       ├── customer.ts
│   │       ├── products.ts
│   │       ├── orders.ts
│   │       ├── stocks.ts
│   │       ├── sales.ts
│   │       └── relations.ts
│   ├── routes/                # Definições de rotas
│   │   └── index.ts           # Roteador principal
│   ├── env.ts                 # Validação de variáveis de ambiente
│   └── server.ts              # Ponto de entrada da aplicação
├── dist/                      # Código JavaScript compilado
├── docker-compose.yml         # Configuração dos serviços Docker
├── drizzle.config.ts          # Configuração do Drizzle ORM
├── package.json               # Dependências do projeto
├── tsconfig.json             # Configuração do TypeScript
└── README.md                 # Documentação do projeto
```

## 🔧 Scripts Disponíveis

- `npm start` - Inicia o servidor de produção
- `npm run dev` - Inicia o servidor de desenvolvimento com hot reload
- `npx drizzle-kit push` - Aplica mudanças no esquema do banco
- `npx drizzle-kit generate` - Gera novos arquivos de migração
- `npx drizzle-kit studio` - Abre o Drizzle Studio (interface gráfica)

## 🗄️ Esquema do Banco de Dados

A aplicação utiliza as seguintes entidades principais:

### **Customers (Clientes)**
- `id`: UUID único do cliente
- `name`: Nome do cliente
- `email`: Email único do cliente
- `password`: Senha do cliente (hash)
- `createdAt`: Data de criação
- `sale_id`: Referência para vendas

### **Products (Produtos)**
- `id`: UUID único do produto
- `name`: Nome do produto
- `description`: Descrição do produto
- `price`: Preço (decimal com 2 casas)
- `createdAt`: Data de criação

### **Stocks (Estoque)**
- Gerenciamento de níveis de inventário
- Controle de entrada e saída de produtos

### **Orders (Pedidos)**
- Processamento e rastreamento de pedidos
- Relacionamento com clientes e produtos

### **Sales (Vendas)**
- Registros de vendas e analytics
- Relacionamento com clientes

### **Tabelas de Relacionamento**
- **Order Products**: Relacionamento pedido-produto
- **Stock Products**: Relacionamento estoque-produto

## 🐳 Deploy com Docker

O projeto inclui configuração Docker Compose para deploy fácil:

```bash
# Iniciar todos os serviços
docker-compose up -d

# Parar todos os serviços
docker-compose down

# Visualizar logs
docker-compose logs -f

# Rebuildar containers
docker-compose up -d --build

# Acessar container do banco
docker-compose exec dncommerce-pg psql -U docker -d dncommerce
```

## 🔒 Variáveis de Ambiente

| Variável | Descrição | Padrão | Obrigatório |
|----------|-----------|---------|-------------|
| `PORT` | Porta do servidor | `3333` | Não |
| `DB_USER` | Usuário do banco | - | Sim |
| `DB_PASSWORD` | Senha do banco | - | Sim |
| `DB_NAME` | Nome do banco | - | Sim |
| `DB_URL` | URL completa de conexão | - | Sim |

### Exemplo de arquivo `.env`:
```env
# Configurações do Servidor
PORT=3333

# Configurações do Banco de Dados
DB_USER=docker
DB_PASSWORD=docker
DB_NAME=dncommerce
DB_URL=postgresql://docker:docker@localhost:5432/dncommerce
```

## 🧪 Testando a API

### Usando cURL
```bash
# Testar health check
curl http://localhost:3333/health

# Listar todos os produtos
curl http://localhost:3333/products

# Criar um novo produto
curl -X POST http://localhost:3333/products \
  -H "Content-Type: application/json" \
  -d '{"name": "Produto Teste", "price": "99.99"}'
```

### Usando Postman/Insomnia
1. Importe a collection da API
2. Configure a base URL: `http://localhost:3333`
3. Teste os endpoints disponíveis


## 📝 Licença

Este projeto está licenciado sob a Licença ISC - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👥 Autores

- **Pedro Ferreira**

## 🙏 Agradecimentos

- Construído com práticas modernas de Node.js e TypeScript
- Esquema de banco gerenciado com Drizzle ORM
- Containerizado com Docker
- Validação robusta com Zod
- Arquitetura modular e escalável


**Nota**: Este é um projeto de API backend. Você precisará de uma aplicação frontend para interagir com os endpoints da API.
