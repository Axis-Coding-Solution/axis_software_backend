import dotenv, { config, configDotenv } from 'dotenv';
import { sign } from 'jsonwebtoken';

configDotenv();

export const generateToken = (payload) => {
  const token = sign(payload, process.env.JWT_KEY, {
    expiresIn: process.env.TOKEN_EXPIRE_IN,
  });
  return token;
};
