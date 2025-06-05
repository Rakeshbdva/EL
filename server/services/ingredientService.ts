import { eq, like, sql } from "drizzle-orm";
import { db } from "../config/database.js";
import { ingredients, insertIngredientSchema, type InsertIngredient, type Ingredient } from "../../shared/schema.js";

export class IngredientService {
  async getAllIngredients(page: number = 1, limit: number = 10, search?: string) {
    let query = db.select().from(ingredients);
    
    if (search) {
      query = query.where(
        sql`${ingredients.name} ILIKE ${`%${search}%`} OR ${ingredients.category} ILIKE ${`%${search}%`} OR ${ingredients.eNumber} ILIKE ${`%${search}%`}`
      );
    }
    
    const offset = (page - 1) * limit;
    const result = await query.limit(limit).offset(offset);
    
    // Get total count
    const countQuery = search 
      ? db.select({ count: sql<number>`count(*)` }).from(ingredients).where(
          sql`${ingredients.name} ILIKE ${`%${search}%`} OR ${ingredients.category} ILIKE ${`%${search}%`} OR ${ingredients.eNumber} ILIKE ${`%${search}%`}`
        )
      : db.select({ count: sql<number>`count(*)` }).from(ingredients);
    
    const [{ count }] = await countQuery;
    
    return {
      ingredients: result,
      pagination: {
        page,
        limit,
        total: count,
        pages: Math.ceil(count / limit)
      }
    };
  }

  async getIngredientById(id: string) {
    const ingredient = await db.select().from(ingredients).where(eq(ingredients.id, id)).limit(1);
    
    if (ingredient.length === 0) {
      throw new Error("Ingredient not found");
    }
    
    return ingredient[0];
  }

  async createIngredient(ingredientData: InsertIngredient) {
    const validatedData = insertIngredientSchema.parse(ingredientData);
    
    // Check if ingredient with same name and category already exists
    const existingIngredient = await db
      .select()
      .from(ingredients)
      .where(
        sql`${ingredients.name} = ${validatedData.name} AND ${ingredients.category} = ${validatedData.category}`
      )
      .limit(1);

    if (existingIngredient.length > 0) {
      throw new Error("Ingredient with this name and category already exists");
    }

    const newIngredient = await db
      .insert(ingredients)
      .values(validatedData)
      .returning();

    return newIngredient[0];
  }

  async updateIngredient(id: string, ingredientData: Partial<InsertIngredient>) {
    await this.getIngredientById(id); // Check if exists
    
    const updatedIngredient = await db
      .update(ingredients)
      .set({ 
        ...ingredientData, 
        updatedAt: new Date() 
      })
      .where(eq(ingredients.id, id))
      .returning();

    return updatedIngredient[0];
  }

  async deleteIngredient(id: string) {
    await this.getIngredientById(id); // Check if exists
    
    await db.delete(ingredients).where(eq(ingredients.id, id));
    return { message: "Ingredient deleted successfully" };
  }

  async duplicateIngredient(id: string) {
    const originalIngredient = await this.getIngredientById(id);
    
    const duplicatedData = {
      ...originalIngredient,
      name: `${originalIngredient.name} (Copy)`,
    };

    delete (duplicatedData as any).id;
    delete (duplicatedData as any).createdAt;
    delete (duplicatedData as any).updatedAt;

    return this.createIngredient(duplicatedData);
  }

  async bulkCreateIngredients(ingredientsData: InsertIngredient[]) {
    const validatedIngredients = ingredientsData.map(ingredient => insertIngredientSchema.parse(ingredient));
    
    const newIngredients = await db.insert(ingredients).values(validatedIngredients).returning();
    return newIngredients;
  }

  async getIngredientsByCategory(category: string) {
    const result = await db
      .select()
      .from(ingredients)
      .where(eq(ingredients.category, category));
    
    return result;
  }

  async getAllCategories() {
    const result = await db
      .selectDistinct({ category: ingredients.category })
      .from(ingredients);
    
    return result.map(row => row.category);
  }
}