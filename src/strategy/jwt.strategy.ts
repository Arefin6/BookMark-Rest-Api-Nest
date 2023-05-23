import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from "../prisma/prisma.service";
@Injectable()
export class JwtStrage extends PassportStrategy(Strategy,'jwt'){

    constructor(private prisma:PrismaService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: "TorNani",
          });
    }

    async validate(payload:any ){

      console.log('Access Token.Strategy : '+payload);
      // let str = JSON.stringify(payload);
      // str = JSON.stringify(payload, null, 4); // (Optional) beautiful indented output.
      // console.log(str);
     //  await this.prisma.u
      const user = await this.prisma.user.findUnique({
        where: {
          email: payload.email,
        },
        select:{
          email: true,
          id: true,
        }
      })
      return user;
    }
}