import {Product} from "./product-interface";

export interface Content {
    id: number
    orderNumber: number
    date: string | Date
    finalPrice: number
    status: Status
    products: Product[]
}
 export enum Status{
     Pending,
     InProgress,
     Completed
 }
