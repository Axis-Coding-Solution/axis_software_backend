import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { USER_MODEL, UserDocument } from 'src/schemas/user-schema';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from 'src/defination/dtos/user/register-user.dto';
import { LoginUserDto } from 'src/defination/dtos/user/login.dto';
// import { generateToken } from 'src/utils';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(USER_MODEL) private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService,
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

    const { id, role } = findUser;
    const payload = { id, role };
    console.log('🚀 ~ AuthService ~ login ~ id:', id);
    const token = await this.generateToken(payload);
    delete findUser.password;

    return { findUser, token };
  }

  //? generate tokens
  async generateToken(payload) {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_KEY,
      expiresIn: process.env.TOKEN_EXPIRE_IN,
    });

    return accessToken;
  }
}
