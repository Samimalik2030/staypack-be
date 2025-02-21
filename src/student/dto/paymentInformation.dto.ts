import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";


export class UpdatePaymentInformationDTO {
    @ApiProperty({ type: String, default: "Credit Card" }) // Default value: A common payment method
    @IsString()
    @IsNotEmpty()
    paymentMethod: string;
  
    @ApiProperty({ type: String, default: "Premium Plan" }) // Default value: A sample subscription plan
    @IsString()
    @IsNotEmpty()
    subscriptionPlan: string;
  }