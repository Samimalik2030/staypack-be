import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { OTP } from '../schema/otp.schema';
import { BcryptService } from 'src/shared/service/bcrypt.service';
import { OtpType } from '../types';

@Injectable()
export class OTPService {
  constructor(
    @InjectModel(OTP.name) private OTPModel: Model<OTP>,
    private bcryptService: BcryptService,
  ) {}

  async find(): Promise<OTP[]> {
    return await this.OTPModel.find();
  }

  /************************************************************************** */
  /************************** FIND ONE BY EMAIL AND TYPE  ******************* */
  /************************************************************************** */

  async findOneBy(email: string, type: OtpType): Promise<OTP | null> {
    return await this.OTPModel.findOne({ type: type, email });
  }

  /************************************************************************** */
  /************************** FIND BY ID ******************************* */
  /************************************************************************** */

  async findOneById(id: string): Promise<OTP | null> {
    return await this.OTPModel.findById(id);
  }

  /************************************************************************** */
  /************************** CREATE OTP AS PRIVATE ******************************* */
  /************************************************************************** */
  private async create(
    secretHash: string,
    email: string,
    type: OtpType,
  ): Promise<OTP> {
    const OTP = await this.OTPModel.create({
      email: email,
      type: type,
      hash: secretHash,
      expiry: new Date().getTime() + 60 * 60 * 1000,
    });
    return await OTP.save();
  }

  /************************************************************************** */
  /************************** REFRESH OTP ******************************* */
  /************************************************************************** */

  async refreshOTP(OTP: OTP): Promise<boolean> {
    const updated = await this.OTPModel.updateOne(
      { _id: OTP._id },
      { expiry: new Date().getTime() + 60 * 60 * 1000 },
    );
    return updated.acknowledged ? true : false;
  }

  /************************************************************************** */
  /************************** DELETE OTP ******************************* */
  /************************************************************************** */

  async deleteByEmail(email: string, type: OtpType): Promise<void> {
    await this.OTPModel.deleteMany({ type, email });
  }

  async delete(OTP: OTP): Promise<void> {
    await this.OTPModel.deleteOne({ _id: OTP._id });
  }
  /************************************************************************** */
  /************************** GENERATE OTP TO EXPOSE ******************************* */
  /************************************************************************** */

  async generate(email: string, type: OtpType): Promise<string> {
    const allowedEmails = ['test@gmail.com'];

    if (allowedEmails.includes(email)) {
      const secret = '123456';
      const secretHash = this.bcryptService.makeHash(secret);
      await this.deleteByEmail(email, type);
      await this.create(secretHash, email, type);
      return secret;
    }

    const secret = Math.floor(Math.random() * 1000000)
      .toString()
      .padEnd(6, Math.ceil(Math.random() * 9).toString());
    const secretHash = this.bcryptService.makeHash(secret);
    await this.deleteByEmail(email, type);
    await this.create(secretHash, email, type);
    return secret;
  }

  /************************************************************************** */
  /************************** VERIFY OTP ******************************* */
  /************************************************************************** */

  verify(OTP: OTP, secret: string): boolean {
    return this.bcryptService.compareHash(secret, OTP.hash);
  }

  /************************************************************************** */
  /********** CONSUME OTP AFTER VERIFICATION ******************************* */
  /************************************************************************** */

  async consume(OTP: OTP, secret: string): Promise<boolean> {
    if (this.verify(OTP, secret)) {
      await this.deleteByEmail(OTP.email, OTP.type);
      return true;
    }
    return false;
  }
}
