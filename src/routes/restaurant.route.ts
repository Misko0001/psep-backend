import { Router } from "express";
import { handleRequest } from "../utils";
import { RestaurantService } from "../services/restaurant.service";

export const RestaurantRoute = Router();

RestaurantRoute.get('/', (req, res) => {
    handleRequest(res, RestaurantService.getAllRestaurants());
});

RestaurantRoute.get('/:id', (req, res) => {
    const id = req.params.id as any as number;
    handleRequest(res, RestaurantService.getRestaurantById(id));
});

RestaurantRoute.post('/', (req, res) => {
    handleRequest(res, RestaurantService.createRestaurant(req.body));
});

RestaurantRoute.put('/:id', (req, res) => {
    const id = req.params.id as any as number;
    handleRequest(res, RestaurantService.updateRestaurant(id, req.body));
});

RestaurantRoute.delete('/:id', (req, res) => {
    const id = req.params.id as any as number;
    handleRequest(res, RestaurantService.deleteRestaurant(id));
});