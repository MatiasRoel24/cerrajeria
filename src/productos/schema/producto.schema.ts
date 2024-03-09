import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true
})
export class Producto {
    @Prop({
        required: true,
        unique: true,
        trim: true
    })
    titulo: string;

    @Prop()
    descripcion: string;

    @Prop({
        required: true,
    })
    precio: number;

    @Prop({
        required: true,
    })
    stock: number;

    @Prop({
        required: true,
    })
    categoria: string;
};

export const ProductoSchema = SchemaFactory.createForClass(Producto);