import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  databaseUri: process.env.MONGODB_URI,
  node_env: process.env.NODE_ENV,
  bcrypt_sault_round: process.env.BCRYPT_SAULT_ROUND,
  jwt_secrete_key: process.env.JWT_SECRETE_KEY,
  jwt_secrete_date: process.env.JWT_SECRETE_DATE,
  Store_ID: process.env.Store_ID,
  Signature_Key: process.env.Signature_Key,
  Api_EndPoint: process.env.Api_EndPoint,
};
