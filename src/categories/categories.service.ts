import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {

  constructor(
    @InjectRepository(Category)
    private categotiesRepository: Repository<Category>
  ) { }

  create(createCategoryDto: CreateCategoryDto) {

    const author = this.categotiesRepository.create(createCategoryDto)
    return this.categotiesRepository.save(author);
  }

  async findAll() {
    return await this.categotiesRepository.find();
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