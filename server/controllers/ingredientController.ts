import { Request, Response } from "express";
import { IngredientService } from "../services/ingredientService.js";
import { exportIngredientsToExcel, parseIngredientsFromExcel } from "../utils/excel.js";

const ingredientService = new IngredientService();

export class IngredientController {
  async getAllIngredients(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const search = req.query.search as string;

      const result = await ingredientService.getAllIngredients(page, limit, search);
      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : "Failed to fetch ingredients",
      });
    }
  }

  async getIngredientById(req: Request, res: Response) {
    try {
      const ingredient = await ingredientService.getIngredientById(req.params.id);
      res.status(200).json({
        success: true,
        data: ingredient
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error instanceof Error ? error.message : "Ingredient not found",
      });
    }
  }

  async createIngredient(req: Request, res: Response) {
    try {
      const ingredient = await ingredientService.createIngredient(req.body);
      res.status(201).json({
        success: true,
        message: "Ingredient created successfully",
        data: ingredient
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : "Failed to create ingredient",
      });
    }
  }

  async updateIngredient(req: Request, res: Response) {
    try {
      const ingredient = await ingredientService.updateIngredient(req.params.id, req.body);
      res.status(200).json({
        success: true,
        message: "Ingredient updated successfully",
        data: ingredient
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : "Failed to update ingredient",
      });
    }
  }

  async deleteIngredient(req: Request, res: Response) {
    try {
      const result = await ingredientService.deleteIngredient(req.params.id);
      res.status(200).json({
        success: true,
        message: result.message
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error instanceof Error ? error.message : "Failed to delete ingredient",
      });
    }
  }

  async duplicateIngredient(req: Request, res: Response) {
    try {
      const ingredient = await ingredientService.duplicateIngredient(req.params.id);
      res.status(201).json({
        success: true,
        message: "Ingredient duplicated successfully",
        data: ingredient
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : "Failed to duplicate ingredient",
      });
    }
  }

  async exportIngredients(req: Request, res: Response) {
    try {
      const result = await ingredientService.getAllIngredients(1, 1000); // Get all ingredients
      const excelBuffer = exportIngredientsToExcel(result.ingredients);
      
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename=ingredients.xlsx');
      res.send(excelBuffer);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : "Failed to export ingredients",
      });
    }
  }

  async importIngredients(req: Request, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No file uploaded"
        });
      }

      const ingredientsData = parseIngredientsFromExcel(req.file.buffer);
      const ingredients = await ingredientService.bulkCreateIngredients(ingredientsData);
      
      res.status(201).json({
        success: true,
        message: `${ingredients.length} ingredients imported successfully`,
        data: ingredients
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : "Failed to import ingredients",
      });
    }
  }

  async getIngredientsByCategory(req: Request, res: Response) {
    try {
      const ingredients = await ingredientService.getIngredientsByCategory(req.params.category);
      res.status(200).json({
        success: true,
        data: ingredients
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : "Failed to fetch ingredients by category",
      });
    }
  }

  async getAllCategories(req: Request, res: Response) {
    try {
      const categories = await ingredientService.getAllCategories();
      res.status(200).json({
        success: true,
        data: categories
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : "Failed to fetch categories",
      });
    }
  }
}