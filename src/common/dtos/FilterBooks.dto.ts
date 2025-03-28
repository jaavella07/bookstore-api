import { IsOptional, IsString } from "class-validator";
import { PaginationDto } from "./pagination.dto";



export class FilterBooksDto extends PaginationDto {
    
    @IsOptional()
    @IsString()
    title?: string;

}