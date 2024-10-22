import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(@InjectConnection() private readonly connection: Connection) {}
  async onModuleInit() {
    try {
      const isConnected = this.connection.readyState === 1;
      if (isConnected) {
        console.log('Database connection established');
      } else {
        console.log('Database connection not established');
      }
    } catch (error) {
      console.error('Error checking database connection:', error);
    }
  }
}
