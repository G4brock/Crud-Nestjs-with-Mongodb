import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PokeSchema } from './schemas/pokemon.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/pokemon'),
    MongooseModule.forFeature([{name: "Poke", schema: PokeSchema}])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
