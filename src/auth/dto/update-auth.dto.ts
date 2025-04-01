import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthDto } from './create-auth.dto copy';


export class UpdateAuthDto extends PartialType(CreateAuthDto) {}
