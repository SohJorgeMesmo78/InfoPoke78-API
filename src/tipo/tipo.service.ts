import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TipoService {
  constructor(private prisma: PrismaService) {}

  async getAllTipos() {
    return this.prisma.tipo.findMany();
  }

  async getTipoById(id: number) {
    const tipo = await this.prisma.tipo.findUnique({
      where: { id: id },
      include: {
        vantagensComoAtacante: {
          select: {
            tipoDefensor: true,
            multiplicador: true,
          },
          orderBy: {
            tipoDefensorId: 'asc',
          },
        },
        vantagensComoDefensor: {
          select: {
            tipoAtacante: true, 
            multiplicador: true,
          },
          orderBy: {
            tipoAtacanteId: 'asc',
          },
        },
      },
    });

    if (!tipo) {
      throw new NotFoundException(`Tipo com id ${id} não encontrado`);
    }

    return tipo;
  }
}
