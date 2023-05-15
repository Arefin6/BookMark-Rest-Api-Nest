import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PrimsaModule } from "src/primsa/primsa.module";

@Module({
    imports:[PrimsaModule],
    controllers:[AuthController],
    providers:[AuthService]

})

export class AuthModule{}