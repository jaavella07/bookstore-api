import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthorDto } from './create-author.dto';
import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateAuthorDto extends PartialType(CreateAuthorDto) {

    @IsString()
    @MinLength(3)
    @IsNotEmpty()
    fullname: string
    
    @IsString()
    @MinLength(3)
    @IsOptional()
    bio: string

}
