import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  makeHash(payload: string) {
    return bcrypt.hashSync(payload, bcrypt.genSaltSync());
  }

  compareHash(payload: string, hash: string) {
    return bcrypt.compareSync(payload, hash);
  }
}
