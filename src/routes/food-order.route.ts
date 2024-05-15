import { Router } from "express";
import { handleRequest } from "../utils";
import { FoodOrderService } from "../services/food-order.service";

export const FoodOrderRoute = Router();

FoodOrderRoute.get('/', (req, res) => {
    handleRequest(res, FoodOrderService.getAllFoodOrders());
});