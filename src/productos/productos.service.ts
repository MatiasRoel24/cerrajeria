import { Injectable } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Producto } from './schema/producto.schema';
import { Model } from 'mongoose';
import { validateMongooseId } from 'src/utils/moongose.validations';
import { handleErrors } from 'src/utils/errors';

@Injectable()
export class ProductosService {
  private location = 'productos.service';
  constructor(@InjectModel(Producto.name) private productoModel: Model<Producto>) {}

  /**
   * Metodo para crea un nuevo producto y guardalo en la bdd.
   *
   * @param { CreateProductoDto } createProductoDto - Datos del nuevo producto.
   * @return { Promise<Producto> } - Nuevo producto.
   */
  async create(createProductoDto: CreateProductoDto): Promise<Producto>{
    try {
      const newProduct = new this.productoModel(createProductoDto);
      const savedProduct = await newProduct.save();

      // TODO: LOGGER 
      console.log("Producto creado: ", savedProduct);

      return savedProduct;
    } catch (error) {
      // TODO: LOGGER
      handleErrors(this.location,'create', error.message);
    }
    
  }

  /**
   * Metodo que devuelve todos los producto de la bdd.
   *
   * @return { Promise<Producto[]> } - Todos los productos
   */
  async findAll(): Promise<Producto[]> {
    try {
      const products = await this.productoModel.find();

      // TODO: LOGGER
      console.log('Se encontraron los productos correctamente');
      
      return products;
    } catch (error) {
      // TODO: LOGGER
      handleErrors(this.location,'findAll', error.message);
    }
  }

  /**
   * Metodo que el producto segun el ID.
   *
   * @param { id } id - Identificador del producto.
   * @return { Promise<Producto> } - Producto.
   */
  async findOne(id: number): Promise<Producto> {
    // TODO: LOGGER
    if(!validateMongooseId(id)) handleErrors(this.location, 'findOne', 'ID no válido');
    
    try {
      const product = await this.productoModel.findById({ _id: id });

      console.log('Se encontro correctamente el producto')

      return product; 
    } catch (error) {
      handleErrors(this.location, 'findOne', error.message);
    }
  }

  /**
   * Metodo que actualiza un producto segun el ID.
   *
   * @param { id } id - Identificador del producto.
   * @param { UpdateProductoDto } updateProductoDto - Datos del producto a actualizar.
   * @return { Promise<Producto> } - Actualizacion del producto.
   */
  async update(id: number, updateProductoDto: UpdateProductoDto): Promise<Producto> {
    // TODO: LOGGER
    if(!validateMongooseId(id)) handleErrors(this.location, 'update', 'ID no válido');

    try {
      const updatedProduct = await this.productoModel.findOneAndUpdate(
        { _id: id },
        updateProductoDto,
        { new: true }
      );
  
      // TODO: LOGGER
      console.log('Se actualizo correctamente el producto con id: ', id);
  
      return updatedProduct;
    } catch (error) {
      handleErrors(this.location, 'update', error.message);
    }
  }
  
  /**
   * Metodo que actualiza un producto segun el ID.
   *
   * @param { id } id - Identificador del producto.
   * @return { Promise<Producto> } - Producto eliminado.
   */
  async remove(id: number): Promise<Producto> {
    // TODO: LOGGER
    if(!validateMongooseId(id)) handleErrors(this.location, 'remove', 'ID no válido');
  
    try {
      const deletedProduct = await this.productoModel.findByIdAndDelete({ _id: id });
      
      // TODO: LOGGER
      console.log('Producto eliminado:', deletedProduct);
  
      return deletedProduct;
    } catch (error) {
      handleErrors(this.location, 'remove', error.message);
    }
  }
}
