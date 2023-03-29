import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export default class AccountDto {
  @IsNotEmpty()
  @IsString()
  accountNumber: string;

  @IsNotEmpty()
  @IsInt()
  balance: number;
}
