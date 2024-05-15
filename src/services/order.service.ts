import { IsNull } from "typeorm";
import { AppDataSource } from "../db";
import { Order } from "../entities/Order";

const repo = AppDataSource.getRepository(Order);

export class OrderService {
    static async getAllOrders() {
        const data = await repo.find({
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
            }
        });

        data.forEach(order => {
            delete order.orderCustomer.customerDeletedAt;
            delete order.orderState.stateDeletedAt;
            delete order.orderDeletedAt;
        });

        return data;
    }
}