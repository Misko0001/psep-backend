import { Router } from "express";
import { handleRequest } from "../utils";
import { RestaurantService } from "../services/restaurant.service";

export const RestaurantRoute = Router();

RestaurantRoute.get('/', (req, res) => {
    handleRequest(res, RestaurantService.getAllRestaurants());
});