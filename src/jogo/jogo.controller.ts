import { Controller, Get } from '@nestjs/common';
import { JogoService } from './jogo.service';

@Controller('jogos')
export class JogoController {
  constructor(private jogoService: JogoService) {}

  @Get()
  async getAll() {
    return this.jogoService.getAll();
  }
}
