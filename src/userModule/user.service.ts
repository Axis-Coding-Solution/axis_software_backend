import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { USER_MODEL, UserDocument } from 'src/schemas/user-schema';
import { RegisterUserDto } from './dto/registerUserDto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/loginDto';
import { generateToken } from 'src/utils/generateToken';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(USER_MODEL) private readonly userModel: Model<UserDocument>,
  ) {}
  async register(registerUserDto: RegisterUserDto) {
    const userExist = await this.userModel.exists({
      email: registerUserDto.email,
    });
    if (userExist) {
      throw new ConflictException('User already Exist');
    }

    const salt = bcrypt.genSaltSync(10);
    const passwordHash = await bcrypt.hash(registerUserDto.password, salt);

    try {
      const newUser = this.userModel.create({
        ...registerUserDto,
        password: passwordHash,
      });
      if (!newUser) {
        throw new BadRequestException('User not created!');
      }
      return newUser;
    } catch (error) {
      if (error.name === 'ValidationError') {
        throw new BadRequestException(error.errors);
      }
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const findUser = await this.userModel.findOne({
      email: loginUserDto.email,
    });

    if (!findUser) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(
      loginUserDto.password,
      findUser.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials');
    }

    try {
      const { id } = findUser;
      const payload = { id };
      const token = generateToken(payload);
      delete findUser.password;

      return { findUser, token };
    } catch (error) {
      if (error.name === 'ValidationError') {
        throw new BadRequestException(error);
      }
    }
  }
}
