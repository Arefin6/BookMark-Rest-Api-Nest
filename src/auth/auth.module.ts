import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrage } from "src/strategy";

@Module({
    imports:[PrismaModule,JwtModule.register({})],
    controllers:[AuthController],
    providers:[AuthService,JwtStrage]
})

export class AuthModule{}