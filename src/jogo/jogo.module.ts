import { Module } from '@nestjs/common';
import { JogoController } from './jogo.controller';
import { JogoService } from './jogo.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [JogoController],
  providers: [JogoService]
})
export class JogoModule {}
