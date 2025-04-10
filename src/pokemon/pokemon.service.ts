import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PokemonService {
  constructor(private prisma: PrismaService) {}

  private getPokemonImages(id: number) {
    return {
      padrao: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
      costas: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`,
      shiny: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${id}.png`,
      shinyCostas: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/${id}.png`,
      oficial: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
      dreamWorld: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`,
    };
  }

  async getAll(pagina: number, limite: number, nome?: string, tipos?: string) {
    const skip = (pagina - 1) * limite;
    const tiposArray = tipos ? tipos.split(',').map((t) => t.trim().toLowerCase()) : [];

    const whereCondition: any = {
      ...(nome && {
        nome: { contains: nome, mode: 'insensitive' },
      }),
      ...(tiposArray.length > 0 && {
        AND: tiposArray.map((tipo) => ({
          tipos: {
            some: {
              tipo: { nome: { equals: tipo, mode: 'insensitive' } },
            },
          },
        })),
      }),
    };

    const total = await this.prisma.pokemon.count({ where: whereCondition });
    const totalPaginas = Math.ceil(total / limite);

    const pokemons = await this.prisma.pokemon.findMany({
      where: whereCondition,
      skip,
      take: limite,
      include: {
        tipos: {
          select: {
            slot: true,
            tipo: { select: { nome: true } },
          },
          orderBy: { slot: 'asc' },
        },
        jogos: {
          select: {
            jogo: { select: { nome: true } },
          },
        },
      },
    });

    return {
      total,
      pagina,
      totalPaginas,
      limite,
      data: pokemons.map((p) => ({
        ...p,
        jogos: p.jogos.map((j) => j.jogo.nome),
        imagens: this.getPokemonImages(p.id),
        tipos: p.tipos.map((t) => ({
          slot: t.slot,
          nome: t.tipo.nome,
        })),
      })),
    };
  }

  async getById(identifier: string) {
    const isNumeric = !isNaN(Number(identifier));
  
    const pokemon = await this.prisma.pokemon.findFirst({
      where: isNumeric ? { id: Number(identifier) } : { nome: identifier },
      include: {
        tipos: {
          select: {
            slot: true,
            tipo: {
              select: {
                nome: true,
                vantagensComoAtacante: {
                  select: {
                    tipoDefensor: {
                      select: {
                        id: true,
                        nome: true,
                      },
                    },
                    multiplicador: true,
                  },
                  orderBy: {
                    tipoDefensor: { id: 'asc' }, // Ordenar por ID do tipo defensor
                  },
                },
                vantagensComoDefensor: {
                  select: {
                    tipoAtacante: {
                      select: {
                        id: true,
                        nome: true,
                      },
                    },
                    multiplicador: true,
                  },
                  orderBy: {
                    tipoAtacante: { id: 'asc' }, // Ordenar por ID do tipo atacante
                  },
                },
              },
            },
          },
          orderBy: { slot: 'asc' },
        },
        jogos: {
          select: {
            jogo: { select: { nome: true } },
          },
        },
      },
    });
  
    return pokemon
      ? {
          ...pokemon,
          jogos: pokemon.jogos.map((j) => j.jogo.nome),
          imagens: this.getPokemonImages(pokemon.id),
          tipos: pokemon.tipos.map((pokemonTipo) => ({
            ...pokemonTipo.tipo,
            vantagensComoAtacante: pokemonTipo.tipo.vantagensComoAtacante,
            vantagensComoDefensor: pokemonTipo.tipo.vantagensComoDefensor,
          })),
        }
      : null;
  }
  
  
}
