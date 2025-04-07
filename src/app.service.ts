import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>InfoPoke78-API</title>
        <style>
          :root {
            --primaria: #DA9200;
            --secundaria: #507fff;
            --fundo: #121212;
            --fundo2: #1E1E1E;
            --texto: #EAEAEA;
            --texto2: #B0B0B0;
          }

          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: var(--fundo);
            color: var(--texto);
            margin: 0;
            padding: 24px;
          }

          h1 {
            color: var(--primaria);
            font-size: 2rem;
          }

          h2 {
            color: var(--secundaria);
            margin-top: 2rem;
            font-size: 1.5rem;
          }

          section {
            margin-bottom: 24px;
          }

          ul {
            list-style-type: none;
            padding: 0;
          }

          li {
            background-color: var(--fundo2);
            margin: 6px 0;
            padding: 14px;
            border-radius: 8px;
            color: var(--texto2);
          }

          li strong {
            color: var(--texto);
          }

          a {
            color: var(--secundaria);
            text-decoration: none;
          }

          a:hover {
            text-decoration: underline;
          }

          em {
            color: var(--texto2);
          }
        </style>
      </head>
      <body>
        <h1>Bem-vindo à InfoPoke78-API!</h1>
        <p>Esta API fornece informações detalhadas sobre Pokémon, utilizando dados da <a href="https://pokeapi.co/" target="_blank">PokeAPI</a>.</p>

        <section>
          <h2>Endpoints Disponíveis</h2>
          <ul>
            <li>
              <strong>GET /pokemon</strong><br>
              Retorna uma lista de Pokémon com paginação e filtros opcionais por nome.<br>
              <em>Parâmetros:</em>
              <ul>
                <li><strong>page</strong> (number): Número da página para paginação.</li>
                <li><strong>limit</strong> (number): Quantidade de resultados por página.</li>
                <li><strong>nome</strong> (string): Filtra Pokémon pelo nome.</li>
              </ul>
            </li>
            <li>
              <strong>GET /pokemon/:identifier</strong><br>
              Retorna detalhes de um Pokémon específico pelo ID ou nome.<br>
              <em>Parâmetros:</em>
              <ul>
                <li><strong>identifier</strong> (string): ID ou nome do Pokémon.</li>
              </ul>
            </li>
            <li>
              <strong>GET /tipos</strong><br>
              Retorna uma lista de todos os tipos de Pokémon disponíveis.
            </li>
            <li>
              <strong>GET /jogos</strong><br>
              Retorna uma lista de todos os jogos Pokémon disponíveis.
            </li>
          </ul>
        </section>

        <section>
          <h2>Documentação</h2>
          <p>Para mais informações, visite o repositório no GitHub: <a href="https://github.com/SohJorgeMesmo78/InfoPoke78-API" target="_blank">InfoPoke78-API</a></p>
        </section>
      </body>
      </html>
    `;
  }
}
