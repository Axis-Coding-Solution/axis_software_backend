import { Schema } from '@nestjs/mongoose';
import { Employee } from '../employees/employee';

@Schema()
export class Client extends Employee {
  
}
