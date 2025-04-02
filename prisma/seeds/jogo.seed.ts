import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

export async function seedJogos() {
  console.log('Buscando dados dos jogos da PokéAPI...');

  try {
    const response = await axios.get('https://pokeapi.co/api/v2/version-group');

    for (const jogo of response.data.results) {
      await prisma.jogo.upsert({
        where: { nome: jogo.name },
        update: {},
        create: {
          nome: jogo.name,
        },
      });

      console.log(`Inserido: ${jogo.name}`);
    }

    console.log('Seed de Jogos finalizada! 🎮');
  } catch (error) {
    console.error('Erro ao buscar Jogos:', error);
  }
}
