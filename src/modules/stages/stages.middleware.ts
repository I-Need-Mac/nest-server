import { Body, HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { decrypt } from '@/common/utils/security';
import HttpStatus from '@/common/types/status';

@Injectable()
export class DecryptionMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
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
    // // req.body 시 json이 읽히지 않아 임시 조치
    // json({
    //   verify: (req: any, res, buffer) => {
    //     if (Buffer.isBuffer(buffer)) {
    //       const rawBody = Buffer.from(buffer);
    //       req['parsedRawBody'] = rawBody;
    //     }
    //     return true;
    //   },
    // })(req, res as any, next);
  }
}
