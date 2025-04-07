import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import { seedPokemonJogos } from './pokemon-jogo.seed';
import { seedPokemonTipos } from './pokemon-tipo.seed';

const prisma = new PrismaClient();

export async function seedPokemon() {
  console.log('🦖 Buscando dados dos Pokémon da PokéAPI...');

  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');

    for (const pokemon of response.data.results) {
      const detalhes = await axios.get(pokemon.url);

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

      console.log(`✅ Inserido: ${pokemon.name}`);

      await seedPokemonTipos(novoPokemon.id, pokemon.name);
      await seedPokemonJogos(novoPokemon.id, pokemon.name);
    }

    console.log('🦖✅ Seed de Pokémon finalizada! 🎉');
  } catch (error) {
    console.error('❌ Erro ao buscar Pokémon:', error);
  } finally {
    await prisma.$disconnect();
  }
}
