import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { EmployeeItemsController } from './employee-items.controller';
import { EmployeeItems, EmployeeItemSchema } from './employee-items.schema';
import { EmployeeItemsRepository } from './employee-items.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { schema: EmployeeItemSchema, name: EmployeeItems.name },
    ]),
  ],
  controllers: [EmployeeItemsController],
  providers: [EmployeeItemsRepository],
})
export class EmployeeItemsModule {}
