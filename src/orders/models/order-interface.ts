import {Status} from "./content-interface";

export interface OrderInterface {
    id: number
    orderNumber: number
    date: string | Date
    finalPrice: number
    status: Status
}

