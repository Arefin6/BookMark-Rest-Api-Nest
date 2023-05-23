import { Injectable,ForbiddenException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AuthDto } from "./dto";
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from '@nestjs/config';
import * as argon from 'argon2';

@Injectable()

export class AuthService{
 constructor(private primsa:PrismaService, 
  private jwt:JwtService,
  private config: ConfigService
  ){}  
 async signup (dto: AuthDto){
   // Generate the Password Hash
    const hash  = await argon.hash(dto.password);
   // save the user in the db
   try{
      const user = await this.primsa.user.create({
         data:{
            email:dto.email,
            password:hash
         }
       })
   
      //retutn the saved user 
       return this.signToken(user.id,user.password);
   }
   
    catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          // eslint-disable-next-line prettier/prettier
          throw new ForbiddenException('Duplicate Credentials');
        } else {
          throw error;
        }
      }
      throw error;
    }
 }
 async signIn(dto: AuthDto){
    // find USer By email
   const user = await this.primsa.user.findUnique({
      where:{
        email: dto.email
      },
    });
    // If Doesnt Exists Throw Exception
    if(!user){
      throw new ForbiddenException("Incorrect Email");
    }

    //compare Password
     
    const passwordValid  = await argon.verify(user.password,dto.password);
    
   // if Password Incorrect  throw exception
  
   if(!passwordValid){
      throw new ForbiddenException("Incoorect Password")
    }

    //send back user

    return this.signToken(user.id,user.email);
 }
  async signToken(userId:string,email:string):Promise<{access_Token: string}>{
    const payload ={
      sub: userId,
      email
    };
    const secret = this.config.get('JWT_SECRET')

    const token  = await this.jwt.signAsync(payload,{
      expiresIn:"15m",
      secret:secret
    });

    return {
      access_Token: token
    }
 }
}