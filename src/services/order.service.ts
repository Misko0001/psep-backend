import { IsNull } from "typeorm";
import { AppDataSource } from "../db";
import { Order } from "../entities/Order";
import { checkIfDefined } from "../utils";
import { OrderModel } from "../models/order.model";

const repo = AppDataSource.getRepository(Order);

export class OrderService {

    static async getAllOrders() {
        return await repo.find({
            select: {
                orderId: true,
                orderCreatedAt: true,
                orderUpdatedAt: true,
                orderCustomer: {
                    customerId: true,
                    customerName: true,
                    customerEmail: true,
                    customerPhone: true,
                    customerAddress: true
                },
                orderState: {
                    stateId: true,
                    stateName: true
                }
            },
            where: {
                orderCustomer: {
                    customerDeletedAt: IsNull()
                },
                orderState: {
                    stateDeletedAt: IsNull()
                },
                orderDeletedAt: IsNull()
            },
            relations: {
                orderCustomer: true,
                orderState: true
            },
            order: {
                orderCreatedAt: 'DESC'
            }
        });
    }

    static async getOrderById(id: number) {
        const data = await repo.findOne({
            select: {
                orderId: true,
                orderCustomerId: true,
                orderStateId: true,
                orderCreatedAt: true,
                orderUpdatedAt: true
            },
            where: {
                orderCustomer: {
                    customerDeletedAt: IsNull()
                },
                orderState: {
                    stateDeletedAt: IsNull()
                },
                orderId: id,
                orderDeletedAt: IsNull()
            }
        });
        return checkIfDefined(data);
    }

    static async createOrder(model: OrderModel) {
        const data = await repo.save({
            orderCustomerId: model.orderCustomerId,
            orderStateId: model.orderStateId,
            orderCreatedAt: new Date()
        });
        delete data.orderDeletedAt;
        return data;
    }

    static async updateOrder(id: number, model: OrderModel) {
        const data = await this.getOrderById(id);
        data.orderCustomerId = model.orderCustomerId;
        data.orderStateId = model.orderStateId;
        data.orderUpdatedAt = new Date();
        const newData = await repo.save(data);
        delete newData.orderDeletedAt;
        return newData;
    }

    static async deleteOrder(id: number) {
        const data = await this.getOrderById(id);
        data.orderDeletedAt = new Date()
        await repo.save(data);
    }

}