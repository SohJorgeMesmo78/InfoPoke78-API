# 🏆 InfoPoke78-API

**InfoPoke78-API** é uma API desenvolvida com **NestJS** e **Prisma ORM**, conectada a um banco **PostgreSQL**, que fornece informações sobre Pokémon. Os dados são baseados na [PokeAPI](https://pokeapi.co/).  

<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="100" alt="Nest Logo" />
</p>

## 🚀 Tecnologias  

- **[NestJS](https://nestjs.com/)** - Framework para Node.js com arquitetura modular  
- **[Prisma ORM](https://www.prisma.io/)** - ORM moderno para banco de dados  
- **PostgreSQL** - Banco de dados relacional  
- **Axios** - Cliente HTTP para comunicação com a PokeAPI  

## 🔥 Endpoints Disponíveis  

### ✅ Buscar todos os Pokémon (com paginação e filtro)  
`GET /pokemon?page=1&limit=10&nome=pika`  

### ✅ Buscar um Pokémon por ID ou Nome  
`GET /pokemon/{identifier}`  

## 🛠️ Como rodar o projeto  

### Instale as dependências  
```bash
npm install
