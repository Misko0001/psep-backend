import { IsNull } from "typeorm";
import { AppDataSource } from "../db";
import { Customer } from "../entities/Customer";
import { CustomerModel } from "../models/customer.model";
import { checkIfDefined } from "../utils";

const repo = AppDataSource.getRepository(Customer);

export class CustomerService {

    static async getAllCustomers() {
        return await repo.find({
            select: {
                customerId: true,
                customerName: true,
                customerEmail: true,
                customerPhone: true,
                customerAddress: true,
                customerCreatedAt: true,
                customerUpdatedAt: true
            },
            where: {
                customerDeletedAt: IsNull()
            }
        });
    }

    static async getCustomerById(id: number) {
        const data = await repo.findOne({
            select: {
                customerId: true,
                customerName: true,
                customerEmail: true,
                customerPhone: true,
                customerAddress: true,
                customerCreatedAt: true,
                customerUpdatedAt: true
            },
            where: {
                customerId: id,
                customerDeletedAt: IsNull()
            }
        });
        return checkIfDefined(data);
    }

    static async createCustomer(model: CustomerModel) {
        const data = await repo.save({
            customerName: model.customerName,
            customerPassword: model.customerPassword,
            customerEmail: model.customerEmail,
            customerPhone: model.customerPhone,
            customerAddress: model.customerAddress,
            customerCreatedAt: new Date()
        });
        delete data.customerDeletedAt;
        return data;
    }

    static async updateCustomer(id: number, model: CustomerModel) {
        const data = await this.getCustomerById(id);
        data.customerName = model.customerName;
        data.customerPassword = model.customerPassword;
        data.customerEmail = model.customerEmail;
        data.customerPhone = model.customerPhone;
        data.customerAddress = model.customerAddress;
        data.customerUpdatedAt = new Date();
        delete data.customerDeletedAt;
        return data;
    }

    static async deleteCustomer(id: number) {
        const data = await this.getCustomerById(id);
        data.customerDeletedAt = new Date();
        await repo.save(data);
    }

}