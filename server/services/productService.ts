import { eq, like, sql } from "drizzle-orm";
import { db } from "../config/database.js";
import { products, insertProductSchema, type InsertProduct, type Product } from "../../shared/schema.js";
import { generateQRCode } from "../utils/qr.js";
import { v4 as uuidv4 } from "uuid";

export class ProductService {
  async getAllProducts(page: number = 1, limit: number = 10, search?: string) {
    let query = db.select().from(products);
    
    if (search) {
      query = query.where(
        sql`${products.name} ILIKE ${`%${search}%`} OR ${products.brand} ILIKE ${`%${search}%`} OR ${products.sku} ILIKE ${`%${search}%`}`
      );
    }
    
    const offset = (page - 1) * limit;
    const result = await query.limit(limit).offset(offset);
    
    // Get total count
    const countQuery = search 
      ? db.select({ count: sql<number>`count(*)` }).from(products).where(
          sql`${products.name} ILIKE ${`%${search}%`} OR ${products.brand} ILIKE ${`%${search}%`} OR ${products.sku} ILIKE ${`%${search}%`}`
        )
      : db.select({ count: sql<number>`count(*)` }).from(products);
    
    const [{ count }] = await countQuery;
    
    return {
      products: result,
      pagination: {
        page,
        limit,
        total: count,
        pages: Math.ceil(count / limit)
      }
    };
  }

  async getProductById(id: string) {
    const product = await db.select().from(products).where(eq(products.id, id)).limit(1);
    
    if (product.length === 0) {
      throw new Error("Product not found");
    }
    
    return product[0];
  }

  async createProduct(productData: InsertProduct) {
    const validatedData = insertProductSchema.parse(productData);
    
    // Check if SKU already exists
    const existingProduct = await db
      .select()
      .from(products)
      .where(eq(products.sku, validatedData.sku))
      .limit(1);

    if (existingProduct.length > 0) {
      throw new Error("Product with this SKU already exists");
    }

    // Generate QR code for the product
    const productInfo = `Product: ${validatedData.name}\nBrand: ${validatedData.brand}\nSKU: ${validatedData.sku}`;
    const qrCode = await generateQRCode(productInfo);

    const newProduct = await db
      .insert(products)
      .values({
        ...validatedData,
        qrCode
      })
      .returning();

    return newProduct[0];
  }

  async updateProduct(id: string, productData: Partial<InsertProduct>) {
    const existingProduct = await this.getProductById(id);
    
    // If SKU is being updated, check for duplicates
    if (productData.sku && productData.sku !== existingProduct.sku) {
      const existingSku = await db
        .select()
        .from(products)
        .where(eq(products.sku, productData.sku))
        .limit(1);

      if (existingSku.length > 0) {
        throw new Error("Product with this SKU already exists");
      }
    }

    const updatedProduct = await db
      .update(products)
      .set({ 
        ...productData, 
        updatedAt: new Date() 
      })
      .where(eq(products.id, id))
      .returning();

    return updatedProduct[0];
  }

  async deleteProduct(id: string) {
    await this.getProductById(id); // Check if exists
    
    await db.delete(products).where(eq(products.id, id));
    return { message: "Product deleted successfully" };
  }

  async duplicateProduct(id: string) {
    const originalProduct = await this.getProductById(id);
    
    const duplicatedData = {
      ...originalProduct,
      sku: `${originalProduct.sku}-copy-${Date.now()}`,
      name: `${originalProduct.name} (Copy)`,
    };

    delete (duplicatedData as any).id;
    delete (duplicatedData as any).createdAt;
    delete (duplicatedData as any).updatedAt;
    delete (duplicatedData as any).qrCode;

    return this.createProduct(duplicatedData);
  }

  async bulkCreateProducts(productsData: InsertProduct[]) {
    const validatedProducts = productsData.map(product => insertProductSchema.parse(product));
    
    // Generate QR codes for all products
    const productsWithQR = await Promise.all(
      validatedProducts.map(async (product) => {
        const productInfo = `Product: ${product.name}\nBrand: ${product.brand}\nSKU: ${product.sku}`;
        const qrCode = await generateQRCode(productInfo);
        return { ...product, qrCode };
      })
    );

    const newProducts = await db.insert(products).values(productsWithQR).returning();
    return newProducts;
  }
}