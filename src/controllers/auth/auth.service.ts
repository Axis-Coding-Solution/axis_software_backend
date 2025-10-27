import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto, RegisterUserDto } from 'src/definitions/dtos/auth';
import {
  CustomBadRequestException,
  CustomConflictException,
  CustomNotFoundException,
} from 'src/utils';
import { USER_MODEL, UserDocument } from 'src/schemas/commons/user';

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
      throw CustomConflictException('User already exist');
    }

    const salt = bcrypt.genSaltSync(10);
    const passwordHash = await bcrypt.hash(registerUserDto.password, salt);

    const newUser = this.userModel.create({
      ...registerUserDto,
      password: passwordHash,
    });
    if (!newUser) {
      throw CustomBadRequestException('User not created!');
    }
    return newUser;
  }

  async login(loginUserDto: LoginUserDto) {
    const findUser = await this.userModel.findOne({
      email: loginUserDto.email,
    });

    if (!findUser) {
      throw CustomNotFoundException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(
      loginUserDto.password,
      findUser.password,
    );

    if (!isPasswordValid) {
      throw CustomBadRequestException('Invalid credentials');
    }

    const { id, role } = findUser;
    const payload = { id, role };
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
