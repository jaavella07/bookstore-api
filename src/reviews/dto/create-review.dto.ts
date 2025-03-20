import { IsArray, IsString, MinLength } from "class-validator"


export class CreateReviewDto {

    @IsString()
    @MinLength(5)
    comment: string

    @IsArray()
    rating: string[]
}
