import { Entity, Column } from 'typeorm';
import { Investment } from '../investment.model';

@Entity('stock_investments')
export class StockInvestment extends Investment {
  @Column()
    ticker!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
    shares!: number;

  @Column({ nullable: true })
  dividendYield?: number;
}