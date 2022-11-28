import {Status} from "./content-interface";

export interface CreateOrderInterface {
    id: number;
    orderNumber: number;
    date: Date;
    finalPrice: number;
    status: Status
}
