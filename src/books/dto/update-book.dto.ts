import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateBookDto extends PartialType(CreateBookDto) {

    @IsString()
    @IsOptional()
    title: string
    
    @IsString()
    @IsOptional()
    description: string

}
