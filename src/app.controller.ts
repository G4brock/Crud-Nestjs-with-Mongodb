import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Pokemon } from '@prisma/client';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('create')
  create(@Body() pokemon: Pokemon) {
    return this.appService.create(pokemon);
  }

  @Get()
  read() {
    return this.appService.getAll()
  }

  @Put("/update/:id")
  update(
    @Body() pokemon:Pokemon,
    @Param() params
  ) {
    return this.appService.update(pokemon, params.id);
  }

  @Delete('dell/:id')
  delete(@Param() params) {
    return this.appService.dell(params.id)
  }
}
