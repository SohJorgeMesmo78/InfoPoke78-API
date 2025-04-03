import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PokemonService {
  constructor(private prisma: PrismaService) { }

  async getAll(page: number, limit: number, nome?: string, tipos?: string) {
    const skip = (page - 1) * limit;
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
    const totalPages = Math.ceil(total / limit);
  
    const pokemons = await this.prisma.pokemon.findMany({
      where: whereCondition,
      skip,
      take: limit,
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
      page,
      totalPages,
      limit,
      data: pokemons.map((p) => ({
        ...p,
        jogos: p.jogos.map((j) => j.jogo.nome),
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
  
    return pokemon
      ? {
          ...pokemon,
          jogos: pokemon.jogos.map((j) => j.jogo.nome),
        }
      : null;
  }
  
}
