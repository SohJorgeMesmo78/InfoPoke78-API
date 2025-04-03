import { PrismaClient } from '@prisma/client';
import { seedPokemon } from './seeds/pokemon.seed';
import { seedTipos } from './seeds/tipo.seed';
import { seedJogos } from './seeds/jogo.seed';
import { seedPokemonJogos } from './seeds/pokemon-jogo.seed';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando Seed do Banco de Dados...');
  
  await seedJogos();
  await seedTipos();
  await seedPokemon();

  console.log('🌱 Seed Finalizada!');
}

main()
  .catch((error) => {
    console.error('Erro na Seed:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
