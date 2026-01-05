import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) { }

  async createMessage(data: {
    content: string;
    roomId: number;
    userId: number;
  }) {
    return this.prisma.message.create({
      data,
      include: { user: true },
    });
  }

  async getMessages(roomId: number, page = 1, limit = 20) {
    return this.prisma.message.findMany({
      where: { roomId },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });
  }
}
