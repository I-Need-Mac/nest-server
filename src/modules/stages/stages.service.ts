import { Injectable } from '@nestjs/common';
import { Stages } from './stages.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class StagesService {
  constructor(@InjectRepository(Stages) private stageRepository: Repository<Stages>) {
    this.stageRepository = stageRepository;
  }

  async create(stage: Partial<Stages>): Promise<Stages> {
    return this.stageRepository.save(stage);
  }

  async update(stage_id: number, stageData: Partial<Stages>): Promise<Stages> {
    const stage = await this.stageRepository.findOne({ where: { id: stage_id } });
    stage.is_clear = stageData.is_clear;
    stage.is_finished = true;
    stage.play_time = stageData.play_time;
    await this.stageRepository.save(stage);
    return stage;
  }

  async lastStageSelect(steam_id: string): Promise<Stages> {
    return await this.stageRepository.findOne({
      where: { steam_id: steam_id },
      order: { created_at: 'DESC' },
    });
  }

  async highStageSelect(steam_id: string): Promise<Stages> {
    return await this.stageRepository.findOne({
      where: { steam_id: steam_id },
      order: { stage: 'DESC' },
    });
  }

  async stageRankingSelect() {
    const list = this.stageRepository.query(`
      select 
        (@rank := @rank + 1) as ranking, 
        a.* 
      from 
        (select
        s.steam_id, 
          MAX(s.stage) as stage,
          u.name
      from stages as s
      inner join users as u
      on s.steam_id = u.steam_id
      where s.is_clear = 1
      group by s.steam_id
      order by stage desc) a, 
      (select @rank := 0 ) as b
      limit 50
    `);

    return list;
  }

  async userStageRankingSelect(steam_id: string) {
    const list = this.stageRepository.query(`
      SELECT c.* FROM 
        (SELECT (@rank := @rank + 1) as ranking, a.* FROM 
          (SELECT
            s.steam_id, 
            MAX(s.stage) as stage,
            u.name
          FROM stages as s
          INNER JOIN users as u
          on s.steam_id = u.steam_id
          WHERE s.is_clear = 1
          group by s.steam_id
          order by stage desc) a, 
          (SELECT @rank := 0 ) as b) c
        WHERE c.steam_id = '${steam_id}'
    `);

    return list;
  }
}
