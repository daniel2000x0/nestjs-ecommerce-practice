import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateShoppingCartDto } from './dto/create-shopping-cart.dto';
import { UpdateShoppingCartDto } from './dto/update-shopping-cart.dto';
import { ShoppingCart } from './entities/shopping-cart.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Customer } from 'src/customers/entities/customer.entity';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class ShoppingCartService {
  // constructor
  constructor(
    //  injecta el repositorio  de  shopping cart
    @InjectRepository(ShoppingCart)
    // instancia  el  repositorio  de  shopping card para almacenar    los  datos
    private readonly shoppingCartRepository: Repository<ShoppingCart>,
    // injecta  el   repositorio  de  clente (customer)
    @InjectRepository(Customer)
    // instancia  el  repositorio  de  customer  para almacenar    los  datos
    private readonly customerRepository: Repository<Customer>,
    //  injecta   el  repositorio   de  product
    @InjectRepository(Product)
    // instancia  el  repositorio  de  product  para almacenar    los  datos
    private readonly productRepository: Repository<Product>,
  ) {}
  //  end constructor

  // -- metodo  para  generar un carrito  de   compras--
  async AddCart(dto: CreateShoppingCartDto) {
    // instancia   cliente   y  lkllama  el   metodo  de   encontrar   a el  cliente   que  buscara al   cliente  apartir   el  dogigo  num enviado
    const customer = await this.customerRepository.findOne({
      where: { customerid: dto.customerid },
    });
    //  valida  el   cliente  exista  si no   envia  un error
    if (!customer)
      throw new NotFoundException(`Customer #${dto.customerid} not found`);
    // instancia  elemento   objeto  producto  y  llamam el  metodo de repositoyry  producto para  buscar y  generarme el   elemento
    // apartir de  array   de ids  de productos   usando  in  de  typeorm
    const products = await this.productRepository.find({
      where: { productid: In(dto.productids) },
    });

    if (products.length === 0) {
      throw new NotFoundException('Not products found');
    }

    const cart = this.shoppingCartRepository.create({
      customer,
      products,
    });
    return this.shoppingCartRepository.save(cart);
  }

  async findAll() {
    return await this.shoppingCartRepository.find();
  }

  findOne(id: number) {
    return this.shoppingCartRepository.findOne({
      where: { serial: id },
      relations: ['customer', 'products'],
    });
  }
  //update  carrito de compras
  async update(id: number, updateShoppingCartDto: UpdateShoppingCartDto) {
    //  instancia  el  objeto   o constante   de  carrito de compras  y   llama al repositorio    find   para  buscar elementoo para update
    const shoppingCart = await this.shoppingCartRepository.findOne({
      where: { serial: id },
      relations: ['customer', 'products'],
    });

    if (!shoppingCart) {
      throw new NotFoundException(`Shopping cart #${id} not found`);
    }
    Object.assign(shoppingCart, updateShoppingCartDto);
    await this.shoppingCartRepository.save(shoppingCart);
    return shoppingCart;
  }

  async remove(id: number) {
    const shoppingCart = await this.shoppingCartRepository.findOne({
      where: { serial: id },
    });

    if (!shoppingCart) {
      throw new NotFoundException(`Shopping cart #${id} not found`);
    }

    await this.shoppingCartRepository.remove(shoppingCart);
    return `This action removes a #${id} shoppingCart`;
  }
}
