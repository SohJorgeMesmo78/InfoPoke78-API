import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { PokemonModule } from './pokemon/pokemon.module';
import { TipoModule } from './tipo/tipo.module';
import { JogoModule } from './jogo/jogo.module';

@Module({
  imports: [
    PrismaModule, 
    PokemonModule, 
    TipoModule, JogoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
