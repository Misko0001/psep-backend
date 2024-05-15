import { Router } from "express";
import { handleRequest } from "../utils";
import { CategoryService } from "../services/category.service";

export const CategoryRoute = Router();

CategoryRoute.get('/', (req, res) => {
    handleRequest(res, CategoryService.getAllCategorys());
});