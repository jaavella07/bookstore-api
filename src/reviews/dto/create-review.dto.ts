import { IsArray, IsNotEmpty, IsString, MinLength } from "class-validator"


export class CreateReviewDto {

    @IsString()
    @MinLength(3)
    comment: string

    @IsArray()
    @IsNotEmpty()
    rating: string[]
}
