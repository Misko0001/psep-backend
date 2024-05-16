import { IsNull } from "typeorm";
import { AppDataSource } from "../db";
import { State } from "../entities/State";
import { NameModel } from "../models/name.model";
import { checkIfDefined } from "../utils";

const repo = AppDataSource.getRepository(State);

export class StateService {
    
    static async getAllStates() {
        return await repo.find({
            select: {
                stateId: true,
                stateName: true,
                stateCreatedAt: true,
                stateUpdatedAt: true
            },
            where: {
                stateDeletedAt: IsNull()
            }
        });
    }

    static async getStateById(id: number) {
        const data = await repo.findOne({
            select: {
                stateId: true,
                stateName: true,
                stateCreatedAt: true,
                stateUpdatedAt: true
            },
            where: {
                stateId: id,
                stateDeletedAt: IsNull()
            }
        });
        return checkIfDefined(data);
    }

    static async createState(model: NameModel) {
        const data = await repo.save({
            stateName: model.stateName,
            stateCreatedAt: new Date()
        });
        delete data.stateDeletedAt;
        return data;
    }

    static async updateState(id: number, model: NameModel) {
        const data = await this.getStateById(id);
        data.stateName = model.stateName;
        data.stateUpdatedAt = new Date();
        const newData = await repo.save(data);
        delete newData.stateDeletedAt;
        return newData;
    }

    static async deleteState(id: number) {
        const data = await this.getStateById(id);
        data.stateDeletedAt = new Date();
        await repo.save(data);
    }

}