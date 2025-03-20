import { IsNotEmpty, IsString, MinLength,  } from "class-validator";



export class CreateCategoryDto {


    @IsString()
    @MinLength(3)
    @IsNotEmpty()
    name: string

}
