import { Request, Response } from "express";
import { ProductService } from "../services/productService.js";
import { exportProductsToExcel, parseProductsFromExcel } from "../utils/excel.js";

const productService = new ProductService();

export class ProductController {
  async getAllProducts(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const search = req.query.search as string;

      const result = await productService.getAllProducts(page, limit, search);
      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : "Failed to fetch products",
      });
    }
  }

  async getProductById(req: Request, res: Response) {
    try {
      const product = await productService.getProductById(req.params.id);
      res.status(200).json({
        success: true,
        data: product
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error instanceof Error ? error.message : "Product not found",
      });
    }
  }

  async createProduct(req: Request, res: Response) {
    try {
      const product = await productService.createProduct(req.body);
      res.status(201).json({
        success: true,
        message: "Product created successfully",
        data: product
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : "Failed to create product",
      });
    }
  }

  async updateProduct(req: Request, res: Response) {
    try {
      const product = await productService.updateProduct(req.params.id, req.body);
      res.status(200).json({
        success: true,
        message: "Product updated successfully",
        data: product
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : "Failed to update product",
      });
    }
  }

  async deleteProduct(req: Request, res: Response) {
    try {
      const result = await productService.deleteProduct(req.params.id);
      res.status(200).json({
        success: true,
        message: result.message
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error instanceof Error ? error.message : "Failed to delete product",
      });
    }
  }

  async duplicateProduct(req: Request, res: Response) {
    try {
      const product = await productService.duplicateProduct(req.params.id);
      res.status(201).json({
        success: true,
        message: "Product duplicated successfully",
        data: product
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : "Failed to duplicate product",
      });
    }
  }

  async exportProducts(req: Request, res: Response) {
    try {
      const result = await productService.getAllProducts(1, 1000); // Get all products
      const excelBuffer = exportProductsToExcel(result.products);
      
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename=products.xlsx');
      res.send(excelBuffer);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : "Failed to export products",
      });
    }
  }

  async importProducts(req: Request, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No file uploaded"
        });
      }

      const productsData = parseProductsFromExcel(req.file.buffer);
      const products = await productService.bulkCreateProducts(productsData);
      
      res.status(201).json({
        success: true,
        message: `${products.length} products imported successfully`,
        data: products
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : "Failed to import products",
      });
    }
  }

  async uploadImage(req: Request, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No image uploaded"
        });
      }

      const imageUrl = `/uploads/${req.file.filename}`;
      res.status(200).json({
        success: true,
        message: "Image uploaded successfully",
        data: { imageUrl }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : "Failed to upload image",
      });
    }
  }
}