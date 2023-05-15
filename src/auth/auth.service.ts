import { Injectable,ForbiddenException } from "@nestjs/common";
import { PrimsaService } from "src/primsa/primsa.service";
import { AuthDto } from "./dto";
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as argon from 'argon2';

@Injectable()

export class AuthService{
 constructor(private primsa:PrimsaService){}  
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
   
       delete user.password;
   
      //retutn the saved user 
       return user;
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
 signIn (){
    // find USer By email
    // If Doesnt Exists Throw Exception


    //compare Password
    // if Password Incorrect  throw exception


    //send back user

    // find User 
    return{msg:"I have singn In"};
 }
}