import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()

export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ){}  // Dependency Injection for the User Repository

  async create(createUserDto: CreateUserDto) 
  {
     const hasedPassword = await bcrypt.hash(createUserDto.password, 10);

     const user = this.usersRepository.create({
      email : createUserDto.email,
      password : hasedPassword,
      name : createUserDto.name
     });
     return this.usersRepository.save(user);  // context.savechanges() gibi c# dan 
    }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return this.usersRepository.findOneBy({id});
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
      await this.usersRepository.update(id, updateUserDto);
      return this.usersRepository.findOneBy({id});
  }

  remove(id: number) {
    return this.usersRepository.delete(id);
  }
  
  async findByEmail(email : string)
  {
    return this.usersRepository.findOneBy({email});
  } // bu method auth service içinde kullanılacak, email ile user bulmak için.
}
// CRUD İŞLEMLERİNİN YAPILDIĞI SERVİS ( USER ) 