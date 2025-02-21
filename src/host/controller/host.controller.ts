import { Body, Controller, Delete, Get, NotAcceptableException, NotFoundException, Param, Patch, Post, Req, UnauthorizedException, UnprocessableEntityException, UseGuards } from '@nestjs/common';
import { HostService } from '../service/host.service';
import { CreateHostDTO } from '../dto/create-host.dto';
import { UpdateHostDTO } from '../dto/updateHost.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { Request } from 'express';
import { UserService } from 'src/user/service/user.service';
import { Role } from 'src/user/types';

@Controller('host')
@ApiTags()
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class HostController {
    constructor(private readonly hostService:HostService,private readonly userService:UserService){}

     @Get()
     async getAllHosts(){
        const allHosts = await this.hostService.getAllHosts()
        return allHosts
     }
     @Post()
     async store(@Body() body:CreateHostDTO,@Req() req:Request){
        const user = req.user
        const host = await this.hostService.findOne({
            user:user
        })
        if(host){
            throw new UnprocessableEntityException('host already exists')
        }
       await this.userService.update(user.id,{
            role:Role.HOST
        })

        console.log('sami')
        const storedHost = await this.hostService.store(body,user)
        return storedHost
     }
     @Get(":id")
     async getHost(@Param("id") id:string,@Req() req:Request){
        const user = req.user
        const foundHost = await this.hostService.getHost(id)
        if(!foundHost){
            throw new NotFoundException('Host is not found')
        }
        return foundHost
     }
     @Patch("id")
     async update(@Param("id") id:string,@Body() body:UpdateHostDTO,@Req() req:Request){
        const user = req.user
        const checkHost = await this.hostService.getHost(id)
        if(!checkHost){
            throw new NotFoundException('You are not allow to update this host')
        }
        const canUpdate = user.id === checkHost.user.id
        if(!canUpdate){
            throw new UnauthorizedException('You are not allow to update this host ')
        }
        const updatedHost = await this.hostService.update(id,body)
        return updatedHost
     }
     @Delete("id")
     async delete(@Param('id') id:string,@Req() req:Request){
        const user  = req.user
        const checkHost = await this.hostService.getHost(id)
        if(!checkHost){
            throw new NotFoundException('You are not allow to delete this host')
        }
        const canDelete = user.id === checkHost.user.id
        if(!canDelete){
            throw new UnauthorizedException('you are not allow to delete this host')
        }
        const deletedHost = await this.hostService.delete(id)
       await this.userService.update(user.id,{
            role:Role.STANDARD_USER
        })
      return deletedHost
     }
}
