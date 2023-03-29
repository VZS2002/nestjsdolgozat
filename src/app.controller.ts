import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Render,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AppService } from './app.service';
import AccountDto from './dto/account.dto';
import OwnerDto from './dto/owner.dto';
import Account from './entities/account.entity';
import Owner from './entities/owner.entity';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private dataSource: DataSource,
  ) {}

  @Get()
  @Render('index')
  index() {
    return { message: 'Welcome to the homepage' };
  }

  @Get('/owners')
  async getOwners() {
    const ownerRepo = this.dataSource.getRepository(Owner);
    return ownerRepo.find();
  }

  @Get('/accounts')
  async getAccounts() {
    const accountRepo = this.dataSource.getRepository(Account);
    return accountRepo.find();
  }

  @Post('/owners')
  async addOwner(@Body() ownerDto: OwnerDto) {
    const ownerRepo = this.dataSource.getRepository(Owner);
    const owner = new Owner();
    owner.fullName = ownerDto.fullName;
    owner.business = ownerDto.business;
    await ownerRepo.save(owner);
  }

  @Post('/accounts')
  async addAccount(@Body() accountDto: AccountDto) {
    const accountRepo = this.dataSource.getRepository(Account);
    const account = new Account();
    account.accountNumber = accountDto.accountNumber;
    account.balance = accountDto.balance;
    await accountRepo.save(account);
  }

  @Delete('/owners/:id')
  async deleteOwner(@Param('id') id: number) {
    const ownerRepo = this.dataSource.getRepository(Owner);
    const owner = await ownerRepo.findOneBy({ id });
    await ownerRepo.remove(owner);
  }

  @Delete('/accounts/:id')
  async deleteaccount(@Param('id') id: number) {
    const accountRepo = this.dataSource.getRepository(Account);
    const account = await accountRepo.findOneBy({ id });
    await accountRepo.remove(account);
  }

  @Patch('accounts/:id')
  async updateAccountById(
    @Param('id') id: number,
    @Body() AccountDto: AccountDto,
  ) {
    const accountRepo = this.dataSource.getRepository(Account);
    const account = await accountRepo.findOneBy({ id: id });
    account.accountNumber = AccountDto.accountNumber;
    account.balance = AccountDto.balance;
    return accountRepo.save(account);
  }

  @Patch('owners/:id')
  async updateOwnerById(@Param('id') id: number, @Body() OwnerDto: OwnerDto) {
    const ownerRepo = this.dataSource.getRepository(Owner);
    const owner = await ownerRepo.findOneBy({ id: id });
    owner.fullName = OwnerDto.fullName;
    owner.business = OwnerDto.business;
    return ownerRepo.save(owner);
  }

  // @Post('/transfer/:sourceId/:targetId')
  //async transfer(@Param('sourceId') sourceId : number, @Param('targetId') targetId : number
}
