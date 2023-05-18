import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from "src/prisma/prisma.service";

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
      // await this.prisma.user.
      const user = await this.prisma.user.findFirst({
        where: {
          email: payload.email,
        },
        select:{
          email: true,
          id: true,
        }
      })
      console.log("\nFirst Guard Will be Checked: ",user,"\nGuard-Payload: ",payload);
      return user;
    }
}