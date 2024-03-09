import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto } from './schema/producto.schema';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  /**
   * Wrapper para crear un nuevo producto.
   *
   * @param { CreateProductoDto } createProductoDto - Datos del nuevo producto.
   * @returns { Object } - Objeto del producto recién creado.
   * @example
   * {
   *   "titulo": "Cerradura travex",
   *   "descripcion": "Cerradura mecánica",
   *   "precio": 20,
   *   "stock": 10,
   *   "categoria": "Cerradura",
   *   "_id": "65e764e6275e99bd7b4ea435",
   *   "createdAt": "2024-03-05T18:31:02.266Z",
   *   "updatedAt": "2024-03-05T18:31:02.266Z",
   *   "__v": 0
   * }
   */
  @Post()
  create(@Body() createProductoDto: CreateProductoDto): object {
    return this.productosService.create(createProductoDto);
  }

  /**
   * Wrapper que devuelve todos los productos.
   *
   * @returns { object } - Todos los productos.
   * @example
   * [
   *   {
   *       "_id": "65e762605802a233058462ee",
   *       "titulo": "Cerradura smart",
   *       "descripcion": "Cerradura totalmente inteligente",
   *       "precio": 200,
   *       "stock": 50,
   *       "Categoria": "Cerradura"
   *   }
   * ]
   */
  @Get()
  findAll(): object {
    return this.productosService.findAll();
  }

  /**
   * Wrapper que devuelve el producto segun el ID.
   *
   * @param { id } id - Identificador del producto a buscar.
   * @returns { Object } - Producto buscado.
   * @example
   *  {
   *     "_id": "65e762605802a233058462ee",
   *     "titulo": "Cerradura smart",
   *     "descripcion": "Cerradura totalmente inteligente",
   *     "precio": 200,
   *     "stock": 50,
   *     "Categoria": "Cerradura"
   *  }
   */
  @Get(':id')
  findOne(@Param('id') id: number): object {
    return this.productosService.findOne(id);
  }

  /**
   * Wrapper para actualizar un producto segun el ID.
   *
   * @param { id } id - Identificador del producto a modificar.
   * @param { updateProductoDto } updateProductoDto - Objeto con los datos a modificar.
   * @returns { Object } - Producto modificado.
   * @example
   *  {
   *     "_id": "65e762605802a233058462ee",
   *     "titulo": "Cerradura smart",
   *     "descripcion": "Cerradura totalmente inteligente",
   *     "precio": 200,
   *     "stock": 50,
   *     "Categoria": "Cerradura"
   *  }
   */
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateProductoDto: UpdateProductoDto): object {
    return this.productosService.update(id, updateProductoDto);
  }

  /**
   * Wrapper para eliminar un producto según su ID.
   *
   * @param { number } id - Identificador del producto a eliminar.
   * @returns { Object } - Producto eliminado.
   * @example
   * {
   *   "_id": "65e764e6275e99bd7b4ea435",
   *   "titulo": "Cerradura travex",
   *   "descripcion": "Cerradura mecanica",
   *   "precio": 20,
   *   "stock": 10,
   *   "categoria": "Cerradura",
   *   "createdAt": "2024-03-05T18:31:02.266Z",
   *   "updatedAt": "2024-03-05T18:31:02.266Z",
   *   "__v": 0
   * }
   */
  @Delete(':id')
  remove(@Param('id') id: number): object {
    return this.productosService.remove(id);
  }
}
