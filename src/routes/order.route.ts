import { Router } from "express";
import { handleRequest } from "../utils";
import { OrderService } from "../services/order.service";

export const OrderRoute = Router();

OrderRoute.get('/', (req, res) => {
    handleRequest(res, OrderService.getAllOrders());
});

OrderRoute.get('/:id/simple', (req, res) => {
    const id = req.params.id as any as number;
    handleRequest(res, OrderService.getOrderWithoutRelationsById(id));
});

OrderRoute.get('/:id', (req, res) => {
    const id = req.params.id as any as number;
    handleRequest(res, OrderService.getOrderById(id));
});

OrderRoute.post('/', (req, res) => {
    handleRequest(res, OrderService.createOrder(req.body));
});

OrderRoute.put('/:id', (req, res) => {
    const id = req.params.id as any as number;
    handleRequest(res, OrderService.updateOrder(id, req.body));
});

OrderRoute.delete('/:id', (req, res) => {
    const id = req.params.id as any as number;
    handleRequest(res, OrderService.deleteOrder(id));
});