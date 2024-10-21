import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { EmployeeItems } from './employee-items.schema';
import { EmployeeItemsRepository } from './employee-items.repository';

@Controller('employee-items')
export class EmployeeItemsController {
  constructor(
    private readonly employeeItemsRepository: EmployeeItemsRepository
  ) {}

  @Get('list')
  async getEmployeeItemsList(): Promise<EmployeeItems[]> {
    return this.employeeItemsRepository.getEmployeeItemList();
  }

  @Post()
  async createEmployeeItems(
    @Body() employeeItems: EmployeeItems
  ): Promise<EmployeeItems> {
    return this.employeeItemsRepository.createEmployeeItem(employeeItems);
  }

  @Put(':id')
  async updateEmployeeItems(
    @Param('id') id: string,
    @Body() employeeItems: EmployeeItems
  ): Promise<void> {
    await this.employeeItemsRepository.updateEmployeeItem(id, employeeItems);
  }

  @Delete(':id')
  async deleteEmployeeItem(@Param('id') id: string): Promise<void> {
    await this.employeeItemsRepository.deleteEmployeeItem(id);
  }
}
