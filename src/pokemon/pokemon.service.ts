import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PokemonService {
  constructor(private prisma: PrismaService) {}

  async getAll(page: number, limit: number, nome?: string) {
    const skip = (page - 1) * limit;

    return this.prisma.pokemon.findMany({
      where: nome
        ? {
            nome: {
              contains: nome,
              mode: 'insensitive',
            },
          }
        : {},
      skip,
      take: limit,
    });
  }

  async getById(identifier: string) {
    const isNumeric = !isNaN(Number(identifier));

    return this.prisma.pokemon.findFirst({
      where: isNumeric ? { id: Number(identifier) } : { nome: identifier },
    });
  }
}
