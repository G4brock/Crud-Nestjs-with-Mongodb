import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type PokeDoc = PokeClass & Document;

@Schema()
export class PokeClass {
    @Prop({ required: true})
    id: number;

    @Prop({ required: true })
    tipo: string;

    @Prop({ required:true })
    nome: string;
}

export const PokeSchema = SchemaFactory.createForClass(PokeClass);