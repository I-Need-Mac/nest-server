import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { decrypt } from '@/common/utils/security';
import HttpStatus from '@/common/types/status';
import * as BodyParser from 'body-parser';

@Injectable()
export class DecryptionMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    BodyParser.raw({ type: '*/*' })(req, res, next);
    const { data } = req.body;
    console.log('in middleware', data);

    if (data == null) {
      throw new HttpException('Invalid data', HttpStatus.INVALID_BODY);
    }
    try {
      const decryptedData = JSON.parse(decrypt(data));
      console.log('in middle ware :: ', decryptedData);
      req.body = decryptedData;
      next();
    } catch (e) {
      throw new HttpException('Invalid data', HttpStatus.INVALID_BODY);
    }
  }
}
