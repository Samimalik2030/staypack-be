import { Body, Controller, Get, NotAcceptableException, Patch, Post, UnprocessableEntityException } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { SignUpDto } from '../dto/sign-up.dto';
import { SignInDto } from '../dto/sign-in.dto';
import { forgotPasswordDto } from '../dto/forgotPassword.dto';
import { ResetPasswordDto } from '../dto/resetPassword.dto';



@Controller('users')
export class UserController {
    constructor(private readonly userService:UserService){}

    @Post("signUp")
    async signUp(@Body() body:SignUpDto){
        const foundUser = await this.userService.findByEmail(body.email)
        if(foundUser){
            throw new UnprocessableEntityException('User already exists')
        }
        const registeredUser = await this.userService.signUp(body)
        return registeredUser
    }

    @Post("sign-in")
    async signIn(@Body() data:SignInDto){
        const user = await this.userService.signIn(data)
        if(!user){
            throw new NotAcceptableException('invalid credential')
        }
        return user

    }
    @Post('forgotPassword')
    async forgotPassword(@Body() body:forgotPasswordDto){
        const user = await this.userService.forgotPassword(body)
        return user
    }
    @Patch('resetPassword')
    async resetPassword(@Body() body:ResetPasswordDto){
        const foundUser = await this.userService.updatePassword(body)
        return foundUser
    }
  
   
}
