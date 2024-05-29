import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,
  Salt_Rounds: process.env.Salt_Rounds,
  Default_User_Password: process.env.Default_User_Password,
};
