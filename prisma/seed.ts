import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

async function main() {
  console.log('Buscando dados da PokéAPI...');

  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');//Alterar para pegar todos depois 100000

    for (const pokemon of response.data.results) {
      const detalhes = await axios.get(pokemon.url);

      await prisma.pokemon.upsert({
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

      console.log(`Inserido: ${pokemon.name}`);
    }

    console.log('Seed finalizada com sucesso! 🚀');
  } catch (error) {
    console.error('Erro ao buscar dados da PokéAPI:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
