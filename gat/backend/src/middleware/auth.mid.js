import jwt from 'jsonwebtoken';

const { verify } = jwt;
import { UNAUTHORIZED } from '../constants/httpStatus.js';
import * as dotenv from 'dotenv';
dotenv.config();
export default (req, res, next) => {
  const token = req.headers.access_token;
  if (!token) return res.status(UNAUTHORIZED).send();

  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  } catch (error) {
    res.status(UNAUTHORIZED).send();
  }

  return next();
};

