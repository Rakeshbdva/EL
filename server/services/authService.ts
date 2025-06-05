import { eq } from "drizzle-orm";
import { db } from "../config/database.js";
import { users, insertUserSchema, loginSchema, type InsertUser, type User } from "../../shared/schema.js";
import { hashPassword, comparePassword } from "../utils/bcrypt.js";
import { generateToken } from "../utils/jwt.js";

export class AuthService {
  async register(userData: InsertUser & { confirmPassword: string }) {
    // Validate input
    const validatedData = insertUserSchema.parse(userData);
    
    // Check if user already exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, validatedData.email))
      .limit(1);

    if (existingUser.length > 0) {
      throw new Error("User already exists with this email");
    }

    // Hash password
    const hashedPassword = await hashPassword(validatedData.password);

    // Create user
    const newUser = await db
      .insert(users)
      .values({
        ...validatedData,
        password: hashedPassword,
      })
      .returning();

    const userWithoutPassword = {
      id: newUser[0].id,
      email: newUser[0].email,
      name: newUser[0].name,
      role: newUser[0].role,
      createdAt: newUser[0].createdAt,
      updatedAt: newUser[0].updatedAt,
    };

    // Generate token
    const token = generateToken(userWithoutPassword);

    return { user: userWithoutPassword, token };
  }

  async login(loginData: { email: string; password: string }) {
    // Validate input
    const validatedData = loginSchema.parse(loginData);

    // Find user
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, validatedData.email))
      .limit(1);

    if (user.length === 0) {
      throw new Error("Invalid email or password");
    }

    // Check password
    const isValidPassword = await comparePassword(validatedData.password, user[0].password);
    if (!isValidPassword) {
      throw new Error("Invalid email or password");
    }

    const userWithoutPassword = {
      id: user[0].id,
      email: user[0].email,
      name: user[0].name,
      role: user[0].role,
      createdAt: user[0].createdAt,
      updatedAt: user[0].updatedAt,
    };

    // Generate token
    const token = generateToken(userWithoutPassword);

    return { user: userWithoutPassword, token };
  }

  async getUserById(id: string) {
    const user = await db
      .select({
        id: users.id,
        email: users.email,
        name: users.name,
        role: users.role,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      })
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    if (user.length === 0) {
      throw new Error("User not found");
    }

    return user[0];
  }
}