import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

export async function seedVersoes() {
    console.log('📦 Buscando versões (version-groups)...');
  
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/version-group');
  
      for (const versao of response.data.results) {
        await prisma.versao.upsert({
          where: { nome: versao.name },
          update: {},
          create: {
            nome: versao.name,
          },
        });
  
        console.log(`Versão inserida: ${versao.name}`);
      }
  
      console.log('✅ Seed de Versões finalizada!');
    } catch (error) {
      console.error('Erro ao buscar Versões:', error);
    }
  }
  