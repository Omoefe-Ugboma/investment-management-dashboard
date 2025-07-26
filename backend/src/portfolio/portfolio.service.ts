import { AppDataSource } from '../config/database';
import { Investment } from '../investments/investment.model';

export class PortfolioService {
  private investmentRepo = AppDataSource.getRepository(Investment);

  async getPortfolioSummary(userId: string) {
    const investments = await this.investmentRepo.find({
      where: { user: { id: userId } },
    });

    // Define the type for the accumulator
    const byType: Record<string, number> = investments.reduce((acc, inv) => {
      acc[inv.type] = (acc[inv.type] || 0) + inv.amount;
      return acc;
    }, {} as Record<string, number>); // Type assertion here

    const totalValue = investments.reduce((sum, inv) => sum + inv.amount, 0);

    return { totalValue, byType };
  }
}