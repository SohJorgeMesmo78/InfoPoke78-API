import { Controller, Get, Param, Query } from '@nestjs/common';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(private pokemonService: PokemonService) { }

  @Get()
  async getAll(
    @Query('pagina') pagina = '1',
    @Query('limite') limite = '10',
    @Query('nome') nome?: string,
    @Query('tipo') tipo?: string,
  ) {
    return this.pokemonService.getAll(Number(pagina), Number(limite), nome, tipo);
  }
  
  @Get(':identifier')
  async getById(@Param('identifier') identifier: string) {
    return this.pokemonService.getById(identifier);
  }
}
