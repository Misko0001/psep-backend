import { Router } from "express";
import { handleRequest } from "../utils";
import { FoodService } from "../services/food.service";

export const FoodRoute = Router();

FoodRoute.get('/', (req, res) => {
    handleRequest(res, FoodService.getAllFoods());
});

FoodRoute.get('/:id/simple', (req, res) => {
    const id = req.params.id as any as number;
    handleRequest(res, FoodService.getFoodWithoutRelationsById(id));
});

FoodRoute.get('/:id', (req, res) => {
    const id = req.params.id as any as number;
    handleRequest(res, FoodService.getFoodById(id));
});

FoodRoute.post('/', (req, res) => {
    handleRequest(res, FoodService.createFood(req.body));
});

FoodRoute.put('/:id', (req, res) => {
    const id = req.params.id as any as number;
    handleRequest(res, FoodService.updateFood(id, req.body));
});

FoodRoute.delete('/:id', (req, res) => {
    const id = req.params.id as any as number;
    handleRequest(res, FoodService.deleteFood(id));
});