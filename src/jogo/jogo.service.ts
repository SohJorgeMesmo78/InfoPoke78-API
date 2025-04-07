import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JogoService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.jogo.findMany({
      include: {
        versao: {
          select: {
            nome: true,
          },
        },
      },
    });
  }  
}
