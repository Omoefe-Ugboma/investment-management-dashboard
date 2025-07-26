import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../models/user.entity';

@Entity('investments')
export abstract class Investment {
  @PrimaryGeneratedColumn('uuid')
    id!: string;

  @Column()
    name!: string;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
    amount!: number;

  @Column()
    date!: Date;

  @ManyToOne(() => User, (user) => user.investments)
    user!: User;

  @Column()
    type!: string; // 'stock', 'crypto', 'mutual_fund', 'savings'
}