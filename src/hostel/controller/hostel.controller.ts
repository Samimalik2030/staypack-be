import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Req, UnauthorizedException, UnprocessableEntityException, UseGuards } from '@nestjs/common';
import { HostelService } from '../service/hostel.service';
import { UserService } from 'src/user/service/user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { UpdateHostelDTO } from '../dto/update-hostel.dto';
import { Request } from 'express';
import { CreateHostelDTO } from '../dto/createhHostel.dto';
import { HostService } from 'src/host/service/host.service';

@Controller('hostels')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Hostel')
export class HostelController {
    constructor(private readonly hostelService:HostelService,
        private readonly userService:UserService,
    private readonly hostService:HostService
){}
  
    @Get()
    async getAllHostels(){
        return await this.hostelService.getAllHostels()
    }

    @Post()
    async store(@Body () body:CreateHostelDTO,@Req() req:Request){
        console.log(body,'body')
        const user = req.user
        console.log(user,'user  ')
        const foundHost = await this.hostService.findOne({
            user:user
        })
        if(!foundHost){
            throw new NotFoundException("Host not found")
        }
      const  hostel =  await this.hostelService.create(body,foundHost)
       
        return hostel
    }


    @Get(":id")
    async getHostel(@Param() id:string,@Req() req:Request){
        const user = req.user
        const foundHostel = await this.hostelService.getHostel(id)
       if(!foundHostel){
        throw new NotFoundException('Hostel is not found')
       }
       return foundHostel
    }

@Patch(":id")
async update(
    @Param('id') id:string,
    @Body() body:UpdateHostelDTO,@Req() req:Request
){
    const user = req.user
    const checkHostel = await this.hostelService.getHostel(id)
    if(!checkHostel){
        throw new NotFoundException('you are not allow to update this hostel')
    }
    const canUpdate = user.id ===checkHostel.host.id
    if(!canUpdate){
        throw new UnauthorizedException('You are not allow to update this hostel')
    }
    const updatedHostel = await this.hostelService.update(id,body)
    return updatedHostel
}

    @Delete(":id")
    async delete(id:string,@Req() req:Request){
        const user = req.user
        const checkHostel = await this.hostelService.getHostel(id)
        if(!checkHostel){
            throw new NotFoundException('you are not allow to delete this hostel')
        }
        const canDelete = user.id === checkHostel.host.id
        if(!canDelete){
            throw new UnauthorizedException('You are not allow to delete this hostel')
        }
        const deletedHostel = await this.hostelService.delete(id)
        return deletedHostel
    }
    



}
