import app from "./app.js";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config();

const PORT = Number(process.env.PORT) || 3001;

const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Backend Server running on port ${PORT}`);
  console.log(`📝 API Documentation:`);
  console.log(`   Health Check: GET http://localhost:${PORT}/api/health`);
  console.log(`   Authentication: POST http://localhost:${PORT}/api/auth/register`);
  console.log(`   Authentication: POST http://localhost:${PORT}/api/auth/login`);
  console.log(`   Products: GET/POST/PUT/DELETE http://localhost:${PORT}/api/products`);
  console.log(`   Ingredients: GET/POST/PUT/DELETE http://localhost:${PORT}/api/ingredients`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`📊 Database: ${process.env.DATABASE_URL ? "Connected to Supabase" : "No database configured"}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  server.close(() => {
    process.exit(0);
  });
});