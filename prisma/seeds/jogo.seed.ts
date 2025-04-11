import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

export async function seedJogos() {
  console.log('🎮 Buscando dados dos jogos da PokéAPI...');

  try {
    const response = await axios.get('https://pokeapi.co/api/v2/version');

    for (const jogo of response.data.results) {
      const jogoDetalhado = await axios.get(jogo.url);
      const versaoName = jogoDetalhado.data.version_group.name;

      const versao = await prisma.versao.findUnique({
        where: { nome: versaoName },
      });

      await prisma.jogo.upsert({
        where: { nome: jogo.name },
        update: {},
        create: {
          nome: jogo.name,
          versaoId: versao?.id,
        },
      });

      console.log(`Jogo inserido: ${jogo.name} (versão: ${versaoName})`);
    }

    console.log('Seed de Jogos finalizada! ✅');
  } catch (error) {
    console.error('Erro ao buscar Jogos:', error);
  }
}
