import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator"



export class CreateBookDto {

    @IsString()
    @MinLength(3)
    @IsNotEmpty()
    title: string
    
    @IsString()
    @MinLength(3)
    @IsOptional()
    description: string
    
    @IsString()
    @IsNotEmpty()
    authorId: string
    
    @IsNotEmpty()
    @IsString()
    categoryId: string
    
    @IsString()
    @IsNotEmpty()
    reviewId: string

}
