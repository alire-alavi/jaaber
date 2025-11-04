import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma-clients/jb-auth';
import { PrismaService } from '../prisma/prisma.service';
import { hash } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(data: Prisma.userCreateInput) {
    return this.prismaService.user.create({
      data: {
        ...data,
        password: await hash(data.password, 10),
      },
    });
  }

  async getUsers() {
    return this.prismaService.user.findMany();
  }

  async getUser(args: Prisma.userWhereUniqueInput) {
    return this.prismaService.user.findFirstOrThrow({
      where: args,
    });
  }
}
