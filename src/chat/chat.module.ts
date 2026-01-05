import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PrismaModule } from "src/prisma/prisma.module";
import { ChatService } from "./chat.service";
import { ChatGateway } from "./chat.gateway";

@Module({
  imports: [PrismaModule, JwtModule.register({ secret: 'super-secret' })],
  providers: [ChatService, ChatGateway],
})
export class ChatModule { }
