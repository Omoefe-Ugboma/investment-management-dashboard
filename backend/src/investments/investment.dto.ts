import { IsString, IsNumber, IsDate, IsEnum } from 'class-validator';

export class CreateInvestmentDto {
  @IsString()
    name!: string;

  @IsNumber()
    amount!: number;

  @IsDate()
    date!: Date;

  @IsEnum(['stock', 'crypto', 'mutual_fund', 'savings'])
    type!: string;
}