import { Module } from '@nestjs/common';
import { TipoService } from './tipo.service';
import { TipoController } from './tipo.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [TipoController],
  providers: [TipoService, PrismaService],
})
export class TipoModule {}
