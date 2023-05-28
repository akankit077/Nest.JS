import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SocketEventsGateway } from 'src/socket_events/socket_events.gateway';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private socketEventsGateway: SocketEventsGateway,
  ) {}

  async findAll(
    page: number,
    limit: number,
  ): Promise<{ rows: User[]; count: number }> {
    console.log('Find All Users Function Called');
    const { rows, count } = await this.userModel.findAndCountAll({
      offset: (page - 1) * limit,
      limit,
    });

    return { rows, count };
  }

  async findOne(id: number): Promise<User | object> {
    console.log('Find One User Function Called');
    const user = this.userModel.findOne({ where: { id } });
    return user ? user : { message: 'No user found' };
  }

  async findWithEmail(email: string) {
    console.log('Find User with Email Function Called');
    return this.userModel.findOne({ where: { email } });
  }

  async delete(id: number): Promise<any> {
    console.log('Delete User Function Called');
    return this.userModel.destroy({ where: { id } });
  }

  async create(createUserDto: CreateUserDto): Promise<User | null> {
    console.log('Create User Function Called');
    const user = this.userModel.create(createUserDto);
    this.socketEventsGateway.sendNotificationToAll(
      'newUserCreated',
      'New User is created',
    );
    return user;
  }

  async update(updateUserDto: UpdateUserDto, id: number): Promise<any> {
    console.log('Update User Function Called');
    return this.userModel.update(updateUserDto, {
      where: { id },
      returning: true,
    });
  }
}
