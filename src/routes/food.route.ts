import { Router } from "express";
import { handleRequest } from "../utils";
import { FoodService } from "../services/food.service";

export const FoodRoute = Router();

FoodRoute.get('/', (req, res) => {
    handleRequest(res, FoodService.getAllFoods());
});