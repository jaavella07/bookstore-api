import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class CategoriesService {

  constructor(
    @InjectRepository(Category)
    private categotiesRepository: Repository<Category>
  ) { }

  create(createCategoryDto: CreateCategoryDto) {

    try {
      const author = this.categotiesRepository.create(createCategoryDto)
      return this.categotiesRepository.save(author);

    } catch (error) {
      // this.logger.error(error)
      throw new InternalServerErrorException('Error creating author')
    }
  }

  async findAll(paginationDto: PaginationDto) {

    const { limit, offset } = paginationDto
    return await this.categotiesRepository.find({
      take: limit,
      skip: offset
    });
  }

  async findOne(id: string) {

    const category = await this.categotiesRepository.findOne({
      where: { id },
    });
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categotiesRepository.findOne({
      where: { id },
    });

    if (!category) throw new NotFoundException('Category not found');

    Object.assign(category, updateCategoryDto);
    return this.categotiesRepository.save(category);
  }

  async remove(id: string) {

    const category = await this.findOne(id)
    this.categotiesRepository.remove(category)
    return {
      message: 'Category removed'
    }
  }
}