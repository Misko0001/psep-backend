import { Router } from "express";
import { handleRequest } from "../utils";
import { OrderService } from "../services/order.service";

export const OrderRoute = Router();

OrderRoute.get('/', (req, res) => {
    handleRequest(res, OrderService.getAllOrders());
});