import { Injectable } from '@nestjs/common';
//  import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrimsaService extends PrismaClient {
   constructor(){
    super({
        datasources:{
            db:{
                url:"mongodb+srv://arefin6:01715250516arefin@cluster0.8pkoh.mongodb.net/bookmarkapp?retryWrites=true&w=majority"
            }
        }
    })
   }
}
