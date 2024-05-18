import { Router } from "express";
import { handleRequest } from "../utils";
import { CategoryService } from "../services/category.service";

export const CategoryRoute = Router();

CategoryRoute.get('/', (req, res) => {
    handleRequest(res, CategoryService.getAllCategories());
});

CategoryRoute.get('/:id', (req, res) => {
    const id = req.params.id as any as number;
    handleRequest(res, CategoryService.getCategoryById(id));
});

CategoryRoute.post('/', (req, res) => {
    handleRequest(res, CategoryService.createCategory(req.body));
});

CategoryRoute.put('/:id', (req, res) => {
    const id = req.params.id as any as number;
    handleRequest(res, CategoryService.updateCategory(id, req.body));
});

CategoryRoute.delete('/:id', (req, res) => {
    const id = req.params.id as any as number;
    handleRequest(res, CategoryService.deleteCategory(id));
});