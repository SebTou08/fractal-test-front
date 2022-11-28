import {OrderInterface} from "./order-interface";

export interface ProdyctsByOrderInterface {
    product: Product
    quantity: number
    totalPrice: number
}
export interface Product {
    id: number
    name: string
    price: number
    orderProducts: OrderProduct[]
}

export interface OrderProduct {
    id: Id
    order: OrderInterface
    quantity: number
}

export interface Id {
    orderId: number
    productId: number
}

