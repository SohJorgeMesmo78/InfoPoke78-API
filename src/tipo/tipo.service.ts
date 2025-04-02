import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TipoService {
  constructor(private prisma: PrismaService) {}

  async getAllTipos() {
    return this.prisma.tipo.findMany();
  }
}
