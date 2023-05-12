import { Injectable } from "@nestjs/common";

@Injectable()

export class AuthService{
 signup (){
    return{msg:"I have singned Up"}
 }
 signIn (){
    return{msg:"I have singn In"};
 }
}