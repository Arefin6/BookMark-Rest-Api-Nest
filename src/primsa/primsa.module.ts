import { Module,Global } from '@nestjs/common';
import { PrimsaService } from './primsa.service';

@Global()
@Module({
  providers: [PrimsaService],
  exports: [PrimsaService]
})
export class PrimsaModule {}
