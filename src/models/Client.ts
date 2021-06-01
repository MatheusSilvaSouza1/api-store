import { EGender } from "../enums/EGender"
import { v4 as uuid } from "uuid";

class Client {
    readonly id: string
    name: string
    cpf: string
    birthDate: Date
    gender: EGender

    constructor() {
        if (!this.id) {
            this.id = uuid()
        }
    }

    createNew(client: Client) {

    }

    update(client: Client) {

    }

    delete(client: Client) {

    }
}

export default Client