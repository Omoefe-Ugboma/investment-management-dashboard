import { Entity, Column } from "typeorm";
import { Investment } from "../investment.model";

@Entity('crypto_investments')
export class CryptoInvestment extends Investment {
  @Column()
    coinId!: string; // e.g., 'bitcoin'

  @Column({ type: 'decimal', precision: 20, scale: 10 })
    units!: number;
}