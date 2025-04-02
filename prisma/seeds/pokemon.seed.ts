import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

export async function seedPokemons() {
  console.log('Buscando dados dos Pokémon da PokéAPI...');

  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');

    for (const pokemon of response.data.results) {
      const detalhes = await axios.get(pokemon.url);

      // Buscando os tipos do Pokémon com seus slots
      const tipos = await Promise.all(
        detalhes.data.types.map(async (t: any) => {
          const tipo = await prisma.tipo.findUnique({ where: { nome: t.type.name } });
          return tipo ? { tipoId: tipo.id, slot: t.slot } : null;
        })
      );

      // Criando o Pokémon
      const novoPokemon = await prisma.pokemon.upsert({
        where: { nome: pokemon.name },
        update: {},
        create: {
          nome: pokemon.name,
          peso: detalhes.data.weight / 10,
          altura: detalhes.data.height / 10,
          experiencia: detalhes.data.base_experience,
          inicial: detalhes.data.is_default,
        },
      });

      // Associando os tipos ao Pokémon
      for (const tipo of tipos.filter((t) => t !== null)) {
        await prisma.pokemonTipo.upsert({
          where: {
            pokemonId_tipoId: { pokemonId: novoPokemon.id, tipoId: tipo!.tipoId },
          },
          update: {},
          create: {
            pokemonId: novoPokemon.id,
            tipoId: tipo!.tipoId,
            slot: tipo!.slot,
          },
        });
      }

      console.log(`Inserido: ${pokemon.name}`);
    }

    console.log('Seed de Pokémon finalizada! 👾');
  } catch (error) {
    console.error('Erro ao buscar Pokémon:', error);
  }
}
