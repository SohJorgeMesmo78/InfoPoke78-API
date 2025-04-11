import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

export async function seedTipos() {
  console.log('🔥 Buscando tipos da PokéAPI...');

  try {
    const response = await axios.get('https://pokeapi.co/api/v2/type');
    
    const tipos = response.data.results.map((tipo: any, index: number) => ({
      id: index + 1,
      nome: tipo.name,
    }));

    for (const tipo of tipos) {
      await prisma.tipo.upsert({
        where: { nome: tipo.nome },
        update: {},
        create: tipo,
      });

      console.log(`Inserido: ${tipo.nome}`);
    }

    console.log('Seed de Tipos finalizada! ✅');
  } catch (error) {
    console.error('Erro ao buscar Tipos:', error);
  }
}
