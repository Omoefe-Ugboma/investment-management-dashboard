import { AppDataSource } from '../config/database';
import { Investment } from './investment.model';
import { User } from '../models/user.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '../exceptions/not-found.exception';
import { BadRequestException } from '../exceptions/bad-request.exception';
import { isErrorWithMessage, isErrorWithCode } from '../utils/error.util';

export class InvestmentService {
  private investmentRepo: Repository<Investment>;

  constructor() {
    this.investmentRepo = AppDataSource.getRepository(Investment);
  }

  async create(investmentData: Partial<Investment>, userId: string): Promise<Investment> {
    if (!userId) {
      throw new BadRequestException('User ID is required');
    }

    try {
      const investment = this.investmentRepo.create({
        ...investmentData,
        user: { id: userId },
      });
      return await this.investmentRepo.save(investment);
    } catch (error: unknown) {
      if (isErrorWithCode(error) && error.code === '23505') {
        throw new BadRequestException('Investment with these details already exists');
      }
      throw new Error(
        `Failed to create investment: ${
          isErrorWithMessage(error) ? error.message : 'Unknown error'
        }`
      );
    }
  }

  async findAll(userId: string): Promise<Investment[]> {
    if (!userId) {
      throw new BadRequestException('User ID is required');
    }

    try {
      return await this.investmentRepo.find({ 
        where: { user: { id: userId } },
        relations: ['user'],
        order: { date: 'DESC' }
      });
    } catch (error: unknown) {
      throw new Error(
        `Failed to fetch investments: ${
          isErrorWithMessage(error) ? error.message : 'Unknown error'
        }`
      );
    }
  }

    async findById(id: string, userId: string) {
    return this.investmentRepo.findOne({
      where: { 
        id,
        user: { id: userId } 
      }
    });
  }

  
  async findOne(id: string, userId: string): Promise<Investment> {
    if (!id || !userId) {
      throw new BadRequestException('Investment ID and User ID are required');
    }

    try {
      const investment = await this.investmentRepo.findOne({ 
        where: { id, user: { id: userId } },
        relations: ['user']
      });

      if (!investment) {
        throw new NotFoundException('Investment not found');
      }

      return investment;
    } catch (error: unknown) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(
        `Failed to fetch investment: ${
          isErrorWithMessage(error) ? error.message : 'Unknown error'
        }`
      );
    }
  }

  async update(
    id: string, 
    updateData: Partial<Investment>, 
    userId: string
  ): Promise<Investment> {
    if (!id || !userId) {
      throw new BadRequestException('Investment ID and User ID are required');
    }

    try {
      await this.investmentRepo.update(
        { id, user: { id: userId } }, 
        updateData
      );
      return await this.findOne(id, userId);
    } catch (error: unknown) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(
        `Failed to update investment: ${
          isErrorWithMessage(error) ? error.message : 'Unknown error'
        }`
      );
    }
  }

  async delete(id: string, userId: string): Promise<void> {
    if (!id || !userId) {
      throw new BadRequestException('Investment ID and User ID are required');
    }

    try {
      const result = await this.investmentRepo.delete({ 
        id, 
        user: { id: userId } 
      });

      if (result.affected === 0) {
        throw new NotFoundException('Investment not found');
      }
    } catch (error: unknown) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(
        `Failed to delete investment: ${
          isErrorWithMessage(error) ? error.message : 'Unknown error'
        }`
      );
    }
  }
}