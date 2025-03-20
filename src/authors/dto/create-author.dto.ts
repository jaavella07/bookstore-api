import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";



export class CreateAuthorDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    fullname: string
    
    @IsString()
    @IsOptional()
    @MinLength(10)
    bio: string


}
