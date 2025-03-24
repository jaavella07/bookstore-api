import { PartialType } from '@nestjs/mapped-types';
import { CreateReviewDto } from './create-review.dto';
import { IsString, MinLength } from 'class-validator';

export class UpdateReviewDto extends PartialType(CreateReviewDto) {

    @IsString()
    @MinLength(5)
    comment: string
}
