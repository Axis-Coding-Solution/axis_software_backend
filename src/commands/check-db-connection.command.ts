import { Command, CommandRunner } from 'nest-commander';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Command({
  name: 'check-db-connection',
  description: 'Check MongoDB connection',
})
export class CheckDbConnectionCommand extends CommandRunner {
  constructor(@InjectConnection() private readonly connection: Connection) {
    super();
  }

  async run() {
    try {
      const isConnected = this.connection.readyState === 1;
      if (isConnected) {
        console.log('MongoDB connection established');
      } else {
        console.log('MongoDB connection not established');
      }
    } catch (error) {
      console.error('Error checking MongoDB connection:', error);
    }
  }
}
