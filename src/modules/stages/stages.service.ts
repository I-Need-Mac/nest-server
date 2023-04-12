import { Injectable } from '@nestjs/common';
import { Stages } from './stages.entity';

@Injectable()
export class StagesService {
  private stage: Stages[] = [];

  create(stageData: any) {
    this.stage.push({
      ...stageData,
    });
  }
}
