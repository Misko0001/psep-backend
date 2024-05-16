import { Router } from "express";
import { handleRequest } from "../utils";
import { FoodOrderService } from "../services/food-order.service";

export const FoodOrderRoute = Router();

FoodOrderRoute.get('/', (req, res) => {
    handleRequest(res, FoodOrderService.getAllFoodOrders());
});

FoodOrderRoute.get('/:id/simple', (req, res) => {
    const id = req.params.id as any as number;
    handleRequest(res, FoodOrderService.getFoodOrderWithoutRelationsById(id));
});

FoodOrderRoute.get('/:id', (req, res) => {
    const id = req.params.id as any as number;
    handleRequest(res, FoodOrderService.getFoodOrderById(id));
});

FoodOrderRoute.post('/', (req, res) => {
    handleRequest(res, FoodOrderService.createFoodOrder(req.body));
});

FoodOrderRoute.put('/:id', (req, res) => {
    const id = req.params.id as any as number;
    handleRequest(res, FoodOrderService.updateFoodOrder(id, req.body));
});

FoodOrderRoute.delete('/:id', (req, res) => {
    const id = req.params.id as any as number;
    handleRequest(res, FoodOrderService.deleteFoodOrder(id));
});