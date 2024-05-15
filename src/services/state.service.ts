import { IsNull } from "typeorm";
import { AppDataSource } from "../db";
import { State } from "../entities/State";

const repo = AppDataSource.getRepository(State);

export class StateService {
    static async getAllStates() {
        const data = await repo.find({
            where: {
                stateDeletedAt: IsNull()
            }
        });

        data.forEach(state => {
            delete state.stateDeletedAt;
        });

        return data;
    }
}