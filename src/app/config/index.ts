import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  Node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  bcrypt_salt_round:12,
  default_pass: process.env.DEFAULT_PASS,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  refresh_access_secret: process.env.JWT_REFRESH_SECRET,
  jwt_access_expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
  refresh_access_expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  cloudinary_cloud_name: process.env.CLOUDE_NAME,
  cloudinary_api_key: process.env.API_KEY,
  cloudinary_api_secret: process.env.API_SECRET,
};