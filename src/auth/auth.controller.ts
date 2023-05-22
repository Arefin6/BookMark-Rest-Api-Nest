import {Body,Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";

@Controller('auth')

export class AuthController{
  constructor(private authService:AuthService){}

  @Post("signup")
  signup(@Body() dto: AuthDto){
    return this.authService.signup(dto)
  }
  @HttpCode(HttpStatus.OK)
  @Post("Signin")
   signIn(@Body() dto: AuthDto){
    return this.authService.signIn(dto)
   }
}