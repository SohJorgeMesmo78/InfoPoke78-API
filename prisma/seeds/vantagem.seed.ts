import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

export async function seedVantagens() {
  console.log('⚔️ Buscando relações de vantagens da PokéAPI...');

  const tipos = await prisma.tipo.findMany();

  for (const tipoAtacante of tipos) {
    try {
      // Fazendo a requisição à API e verificando se o tipo existe
      const { data, status } = await axios.get(`https://pokeapi.co/api/v2/type/${tipoAtacante.id}`);

      // Verificando se a requisição foi bem-sucedida
      if (status !== 200 || !data || !data.damage_relations) {
        console.log(`⚠️ Tipo "${tipoAtacante.nome}" não encontrado ou sem relações de dano. Status: ${status}. Pulando...`);
        continue;
      }

      const relacoes = data.damage_relations;

      // Verifica se há alguma relação de dano para evitar tentativas desnecessárias
      const hasRelations =
        relacoes.double_damage_to.length > 0 ||
        relacoes.half_damage_to.length > 0 ||
        relacoes.no_damage_to.length > 0;

      if (!hasRelations) {
        console.log(`⚠️ Tipo "${tipoAtacante.nome}" não possui relações ofensivas. Pulando...`);
        continue;
      }

      const multiplicadores: Record<string, number> = {};

      // Preenchendo o dicionário de multiplicadores
      relacoes.double_damage_to.forEach((t: any) => {
        multiplicadores[t.name] = 2;
      });

      relacoes.half_damage_to.forEach((t: any) => {
        multiplicadores[t.name] = 0.5;
      });

      relacoes.no_damage_to.forEach((t: any) => {
        multiplicadores[t.name] = 0;
      });

      // Atualizando ou criando as vantagens no banco de dados
      for (const tipoDefensor of tipos) {
        const multiplicador = multiplicadores[tipoDefensor.nome] ?? 1;

        try {
          await prisma.vantagem.upsert({
            where: {
              tipoAtacanteId_tipoDefensorId: {
                tipoAtacanteId: tipoAtacante.id,
                tipoDefensorId: tipoDefensor.id,
              },
            },
            update: { multiplicador },
            create: {
              tipoAtacanteId: tipoAtacante.id,
              tipoDefensorId: tipoDefensor.id,
              multiplicador,
            },
          });
        } catch (err) {
          console.error(`❌ Erro ao atualizar ou criar vantagem entre "${tipoAtacante.nome}" e "${tipoDefensor.nome}":`, err);
        }
      }

      console.log(`✅ Vantagens para tipo "${tipoAtacante.nome}" processadas.`);
    } catch (err) {
      console.error(`❌ Erro ao processar tipo "${tipoAtacante.nome}":`);
    }
  }

  console.log('Seed de Vantagens finalizada! ✅');
}
