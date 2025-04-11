import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

export async function seedPokemonJogos(pokemonId: number, pokemonNome: string) {
  console.log(`🎮 Associando jogos ao Pokémon: ${pokemonNome}`);

  try {
    const detalhes = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonNome}`);

    const jogos = await Promise.all(
      detalhes.data.game_indices.map(async (g: any) => {
        const jogo = await prisma.jogo.findUnique({ where: { nome: g.version.name } });
        return jogo ? jogo.id : null;
      })
    );

    await prisma.pokemonJogo.createMany({
      data: jogos
        .filter((j) => j !== null)
        .map((j) => ({
          pokemonId: pokemonId,
          jogoId: j!,
        })),
      skipDuplicates: true,
    });

    console.log(`Jogos associados a: ${pokemonNome} ✅`);
  } catch (error) {
    console.error(`❌ Erro ao associar jogos ao Pokémon ${pokemonNome}:`, error);
  }
}
