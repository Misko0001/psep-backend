import { IsNull } from "typeorm";
import { AppDataSource } from "../db";
import { Customer } from "../entities/Customer";

const repo = AppDataSource.getRepository(Customer);

export class CustomerService {
    static async getAllCustomers() {
        const data = await repo.find({
            where: {
                customerDeletedAt: IsNull()
            }
        })
        
        data.forEach(customer => {
            delete customer.customerDeletedAt;
        });

        return data;
    }
}