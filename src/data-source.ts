import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { Task } from './entities/task.entity';
import { User } from './entities/user.entity';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',      
  port: 5432,  
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Task],
  synchronize: true, 
});
