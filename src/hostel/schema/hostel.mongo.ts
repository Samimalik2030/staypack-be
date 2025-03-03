import { BaseSchema } from "src/app/decorators/base.schema";
import { HostelInformation, HostelInformationMongoSchema, } from "./hostel-information.schema";
import { ApiProperty } from "@nestjs/swagger";
import { Prop } from "@nestjs/mongoose";
import { HostelPolicies } from "./hostelPolicies.schema";

import { MongoFactory } from "src/app/decorators/mongo-factory";
import { Transform } from "class-transformer";
import { Schema } from "mongoose";
import { transformObjectId } from "src/app/decorators/objectToId";
import { EmenitiesAndService, } from "./amenities&service.schema";
import { GoogleAddress,  } from "./googleAddress.schema";
import { MongoSchema } from "src/app/decorators/mongo.schema";
import { Host } from "src/host/schema/host.mongo";

@MongoSchema()
export class Hostel extends BaseSchema {


    @Prop({ type:HostelInformation,default:null })
    @ApiProperty({ type: () => HostelInformation })
    hostelInformation: HostelInformation;

    @Prop({ type: HostelPolicies ,default:null})
    @ApiProperty({ type: () => HostelPolicies })
    hostelPolicies: HostelPolicies;

    @Prop({ type: EmenitiesAndService,default:null })
    @ApiProperty({ type: () => EmenitiesAndService })
    anemitiesAndService: EmenitiesAndService;



    @Prop({ type: Schema.Types.ObjectId, ref: "Host" })
    @Transform(transformObjectId)
    host:Host

    @Prop({ type: String, default: "Draft" })
    @ApiProperty({ type: String })
    status: String;

}
export const HostelSchema = MongoFactory.createSchema(Hostel)