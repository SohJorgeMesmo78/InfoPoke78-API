import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

async function main() {
  console.log('Buscando dados da PokéAPI...');

  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=10000');

    const pokemons = response.data.results.map((pokemon: any, index: number) => ({
      id: index + 1,
      nome: pokemon.name,
    }));

    console.log('Inserindo Pokémon no banco de dados...');

    for (const pokemon of pokemons) {
      await prisma.pokemon.upsert({
        where: { id: pokemon.id },
        update: {},
        create: pokemon,
      });
    }

    console.log('Seed finalizada com sucesso! 🚀');
  } catch (error) {
    console.error('Erro ao buscar dados da PokéAPI:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
