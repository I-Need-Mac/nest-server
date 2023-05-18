import { Controller } from '@nestjs/common';

import { AssetsService } from './assets.service';

@Controller('assets')
export class AssetsController {
  constructor(private AssetsService: AssetsService) {}
}
