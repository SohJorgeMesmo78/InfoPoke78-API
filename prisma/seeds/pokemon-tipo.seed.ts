import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

export async function seedPokemonTipos(pokemonId: number, pokemonNome: string) {
  console.log(`🦖🔥 Associando tipos ao Pokémon: ${pokemonNome}`);

  try {
    const detalhes = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonNome}`);

    const tipos = await Promise.all(
      detalhes.data.types.map(async (t: any) => {
        const tipo = await prisma.tipo.findUnique({ where: { nome: t.type.name } });
        return tipo ? { tipoId: tipo.id, slot: t.slot } : null;
      })
    );

    await prisma.pokemonTipo.createMany({
      data: tipos
        .filter((t) => t !== null)
        .map((t) => ({
          pokemonId: pokemonId,
          tipoId: t!.tipoId,
          slot: t!.slot,
        })),
      skipDuplicates: true,
    });

    console.log(`🦖🔥✅ Tipos associados a: ${pokemonNome}`);
  } catch (error) {
    console.error(`❌ Erro ao associar tipos ao Pokémon ${pokemonNome}:`, error);
  }
}
