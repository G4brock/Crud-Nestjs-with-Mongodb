import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from '@prisma/client';
import { Model } from 'mongoose';
import { NotFoundError } from 'rxjs';
import { PokeDoc } from './schemas/pokemon.schema';

@Injectable()
export class AppService {
  constructor(@InjectModel("Poke") private pokeModel: Model<PokeDoc>) {}

  async create(pokemon: Pokemon) {
    const create = new this.pokeModel(pokemon)
    if(await this.validId(pokemon.id))
      return create.save()
    else
      throw new InternalServerErrorException()
  }

  async getAll(){
    const pokes = await this.pokeModel.find();
    let allPokes: Array<Pokemon> = [];

    for(let i = 0; i < pokes.length; i++){
      let poke = pokes[i];
      allPokes.push({
        id: poke.id,
        nome: poke.nome,
        tipo: poke.tipo
      })
    }

    return allPokes;
  }
  async update(pokemon: Pokemon, id){
    if(!(await this.validId(id))){
      await this.pokeModel.updateOne({"id": id}, {"nome": pokemon.nome, "tipo": pokemon.tipo})
    }
    else
      throw new NotFoundException()
  }
  async dell(id) {
    let poke = await this.getOne(id);
    if(poke.length > 0)
      await this.pokeModel.deleteOne({"id": poke[0].id})
    else
      throw new NotFoundException()
  }

  async getOne(id) {
    const poke = await this.pokeModel.find({"id": id})
    return poke;
  }

  async validId(id){
    if((await this.getOne(id)).length > 0){
      return false;
    }
    return true;
  }
}
