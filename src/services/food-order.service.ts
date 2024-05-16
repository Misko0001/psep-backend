import { IsNull } from "typeorm";
import { AppDataSource } from "../db";
import { FoodOrder } from "../entities/FoodOrder";
import { checkIfDefined } from "../utils";
import { FoodOrderModel } from "../models/food-order.model";

const repo = AppDataSource.getRepository(FoodOrder);

export class FoodOrderService {

    static async getAllFoodOrders() {
        return await repo.find({
            select: {
                foodOrderId: true,
                foodOrderCreatedAt: true,
                foodOrderUpdatedAt: true,
                foodOrderFood: {
                    foodId: true,
                    foodName: true,
                    foodCategory: {
                        categoryId: true,
                        categoryName: true
                    },
                    foodRestaurant: {
                        restaurantId: true,
                        restaurantName: true
                    }
                },
                foodOrderOrder: {
                    orderId: true,
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
                }
            },
            where: {
                foodOrderFood: {
                    foodCategory: {
                        categoryDeletedAt: IsNull()
                    },
                    foodRestaurant: {
                        restaurantDeletedAt: IsNull()
                    },
                    foodDeletedAt: IsNull()
                },
                foodOrderOrder: {
                    orderCustomer: {
                        customerDeletedAt: IsNull()
                    },
                    orderState: {
                        stateDeletedAt: IsNull()
                    },
                    orderDeletedAt: IsNull()
                },
                foodOrderDeletedAt: IsNull()
            },
            relations: {
                foodOrderFood: {
                    foodCategory: true,
                    foodRestaurant: true
                },
                foodOrderOrder: {
                    orderCustomer: true,
                    orderState: true
                }
            }
        });
    }

    static async getFoodOrderById(id: number) {
        const data = await repo.findOne({
            select: {
                foodOrderId: true,
                foodOrderCreatedAt: true,
                foodOrderUpdatedAt: true,
                foodOrderFood: {
                    foodId: true,
                    foodName: true,
                    foodCategory: {
                        categoryId: true,
                        categoryName: true
                    },
                    foodRestaurant: {
                        restaurantId: true,
                        restaurantName: true
                    }
                },
                foodOrderOrder: {
                    orderId: true,
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
                }
            },
            where: {
                foodOrderFood: {
                    foodCategory: {
                        categoryDeletedAt: IsNull()
                    },
                    foodRestaurant: {
                        restaurantDeletedAt: IsNull()
                    },
                    foodDeletedAt: IsNull()
                },
                foodOrderOrder: {
                    orderCustomer: {
                        customerDeletedAt: IsNull()
                    },
                    orderState: {
                        stateDeletedAt: IsNull()
                    },
                    orderDeletedAt: IsNull()
                },
                foodOrderId: id,
                foodOrderDeletedAt: IsNull()
            },
            relations: {
                foodOrderFood: {
                    foodCategory: true,
                    foodRestaurant: true
                },
                foodOrderOrder: {
                    orderCustomer: true,
                    orderState: true
                }
            }
        });
        return checkIfDefined(data);
    }

    static async getFoodOrderWithoutRelationsById(id: number) {
        const data = await repo.findOne({
            select: {
                foodOrderId: true,
                foodOrderFoodId: true,
                foodOrderOrderId: true,
                foodOrderCreatedAt: true,
                foodOrderUpdatedAt: true,
            },
            where: {
                foodOrderFood: {
                    foodCategory: {
                        categoryDeletedAt: IsNull()
                    },
                    foodRestaurant: {
                        restaurantDeletedAt: IsNull()
                    },
                    foodDeletedAt: IsNull()
                },
                foodOrderOrder: {
                    orderCustomer: {
                        customerDeletedAt: IsNull()
                    },
                    orderState: {
                        stateDeletedAt: IsNull()
                    },
                    orderDeletedAt: IsNull()
                },
                foodOrderId: id,
                foodOrderDeletedAt: IsNull()
            }
        });
        return checkIfDefined(data);
    }

    static async createFoodOrder(model: FoodOrderModel) {
        const data = await repo.save({
            foodOrderFoodId: model.foodOrderFoodId,
            foodOrderOrderId: model.foodOrderOrderId,
            foodOrderCreatedAt: new Date()
        });
        delete data.foodOrderDeletedAt;
        return data;
    }

    static async updateFoodOrder(id: number, model: FoodOrderModel) {
        const data = await this.getFoodOrderWithoutRelationsById(id);
        data.foodOrderFoodId = model.foodOrderFoodId;
        data.foodOrderOrderId = model.foodOrderOrderId;
        data.foodOrderUpdatedAt = new Date();
        const newData = await repo.save(data);
        delete newData.foodOrderDeletedAt;
        return newData;
    }

    static async deleteFoodOrder(id: number) {
        const data = await this.getFoodOrderWithoutRelationsById(id);
        data.foodOrderDeletedAt = new Date();
        await repo.save(data);
    }

}