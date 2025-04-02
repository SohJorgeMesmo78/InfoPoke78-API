import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PokemonService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.pokemon.findMany();
  }

  async getById(id: number) {
    return this.prisma.pokemon.findUnique({ where: { id } });
  }

  async create(name: string) {
    return this.prisma.pokemon.create({ data: { name } });
  }
}
