import { Controller, Get, Param } from '@nestjs/common';
import { TipoService } from './tipo.service';

@Controller('tipos')
export class TipoController {
  constructor(private readonly tipoService: TipoService) {}

  @Get()
  async getAllTipos() {
    return this.tipoService.getAllTipos();
  }

  @Get(':id')
  async getTipoById(@Param('id') id: string) {
    const tipoId = Number(id);
    if (isNaN(tipoId)) {
      throw new Error('ID inválido');
    }
    return this.tipoService.getTipoById(tipoId);
  }
}
