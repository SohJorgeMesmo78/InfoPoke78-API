import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(private pokemonService: PokemonService) {}

  @Get()
  async getAll() {
    return this.pokemonService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.pokemonService.getById(Number(id));
  }

  @Post()
  async create(@Body('name') name: string) {
    return this.pokemonService.create(name);
  }
}
