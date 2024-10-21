import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EmployeeItems } from './employee-items.schema';
import { Model, Types, UpdateWriteOpResult } from 'mongoose';

@Injectable()
export class EmployeeItemsRepository {
  constructor(
    @InjectModel(EmployeeItems.name)
    private readonly employeeItemModel: Model<EmployeeItems>
  ) {}

  getEmployeeItemList(): Promise<EmployeeItems[]> {
    return this.employeeItemModel.find();
  }

  async createEmployeeItem(
    employeeItem: EmployeeItems
  ): Promise<EmployeeItems> {
    return this.employeeItemModel.create(employeeItem);
  }

  updateEmployeeItem(
    id: string,
    employeeItem: EmployeeItems
  ): Promise<UpdateWriteOpResult> {
    return this.employeeItemModel.updateOne(
      { _id: new Types.ObjectId(id) },
      { $set: employeeItem }
    );
  }

  async deleteEmployeeItem(id: string): Promise<void> {
    await this.employeeItemModel.deleteOne({ _id: new Types.ObjectId(id) });
  }
}
