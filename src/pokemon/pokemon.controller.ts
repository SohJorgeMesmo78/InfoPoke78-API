import { Controller, Get, Param, Query } from '@nestjs/common';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(private pokemonService: PokemonService) {}

  @Get()
  async getAll(
    @Query('page') page = '1',
    @Query('limit') limit = '10',
    @Query('nome') nome?: string,
  ) {
    return this.pokemonService.getAll(Number(page), Number(limit), nome);
  }

  @Get(':identifier')
  async getById(@Param('identifier') identifier: string) {
    return this.pokemonService.getById(identifier);
  }
}
