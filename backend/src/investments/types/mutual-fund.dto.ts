import { Entity, Column } from "typeorm";
import { Investment } from "../investment.model";

@Entity('mutual_fund_investments')
export class MutualFundInvestment extends Investment {
  @Column()
    fundId!: string;

  @Column({ type: 'decimal', precision: 10, scale: 4 })
    nav!: number; // Net Asset Value
}