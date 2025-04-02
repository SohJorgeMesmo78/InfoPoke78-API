import { Controller, Get } from '@nestjs/common';
import { TipoService } from './tipo.service';

@Controller('tipos')
export class TipoController {
  constructor(private readonly tipoService: TipoService) {}

  @Get()
  async getAllTipos() {
    return this.tipoService.getAllTipos();
  }
}
