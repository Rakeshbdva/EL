import * as XLSX from "xlsx";
import { Product, Ingredient } from "../../shared/schema.js";

export const exportProductsToExcel = (products: Product[]): Buffer => {
  const worksheet = XLSX.utils.json_to_sheet(products);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Products");
  
  return XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
};

export const exportIngredientsToExcel = (ingredients: Ingredient[]): Buffer => {
  const worksheet = XLSX.utils.json_to_sheet(ingredients);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Ingredients");
  
  return XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
};

export const parseProductsFromExcel = (buffer: Buffer): any[] => {
  const workbook = XLSX.read(buffer, { type: "buffer" });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  
  return XLSX.utils.sheet_to_json(worksheet);
};

export const parseIngredientsFromExcel = (buffer: Buffer): any[] => {
  const workbook = XLSX.read(buffer, { type: "buffer" });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  
  return XLSX.utils.sheet_to_json(worksheet);
};