import jwt from "jsonwebtoken";
import { User } from "../../shared/schema.js";

export const generateToken = (user: Omit<User, 'password'>): string => {
  const payload = { 
    id: user.id, 
    email: user.email, 
    name: user.name, 
    role: user.role 
  };
  
  const options = { 
    expiresIn: process.env.JWT_EXPIRES_IN || '7d' 
  };
  
  return jwt.sign(payload, process.env.JWT_SECRET!, options);
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, process.env.JWT_SECRET!);
};