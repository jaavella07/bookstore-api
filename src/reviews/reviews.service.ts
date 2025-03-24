import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ReviewsService {

  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>
  ) { }

  create(createReviewDto: CreateReviewDto) {

    const review = this.reviewRepository.create(createReviewDto)
    return this.reviewRepository.save(review);
  }

  async findAll() {
    return await this.reviewRepository.find();
  }

  async findOne(id: string) {

    const review = await this.reviewRepository.findOne({
      where: { id },
    });
    if (!review) throw new NotFoundException('Review not found');
    return review;
  }

  async update(id: string, updateReviewDto: UpdateReviewDto) {
    const review = await this.reviewRepository.findOne({
      where: { id },
    });

    if (!review) throw new NotFoundException('Review not found');

    Object.assign(review, updateReviewDto);
    return this.reviewRepository.save(review);
  }

  async remove(id: string) {

    const review = await this.findOne(id)
    this.reviewRepository.remove(review)
    return {
      message: 'Review removed'
    }
  }
}
