import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateHostDTO } from '../dto/updateHost.dto';
import { User } from 'src/user/schema/user.schema';
import { CreateHostDTO } from '../dto/create-host.dto';
import { Host } from '../schema/host.mongo';

@Injectable()
export class HostService {
    constructor(@InjectModel(Host.name) private readonly hostModel: Model<Host>){}
    
    async getAllHosts(){
        const allHosts = await this.hostModel.find()
        return allHosts
    }
    async store(data:CreateHostDTO,user:User){
        console.log(data,'data')
        const createdHost = await this.hostModel.create({
            personalInformation:data,
            user:user
        })
     
        console.log(createdHost,'created hosst')
        return createdHost
    }
    async getHost(id:string):Promise<Host|null>{
        const foundedHost = await this.hostModel.findById(id).populate('user') 
        return foundedHost  
    }
    async findOne(data:Partial<Host>){
        console.log(data)
        const foundedHost = await this.hostModel.findOne(data).populate('user')
        return foundedHost
    }
    
    async update(id:string,data:UpdateHostDTO){
        const host = await this.hostModel.findByIdAndUpdate(id,data,{
            returnDocument:'after'
        })
        let hostObject;
        if(host)
            hostObject = host.toObject()
        const values = Object.values(hostObject)
        const ifAllValueExist = values.every((value) =>value !==null)
        const updatedHost = await this.hostModel.findByIdAndUpdate(id,{
           status:ifAllValueExist?"Active":"Draft"
        },{
            returnDocument:'after'
        }).populate('user')
        return updatedHost
    }
    async delete(id:string){
        const deletedHost = await this.hostModel.findByIdAndDelete(id)
        return deletedHost
    }
}
