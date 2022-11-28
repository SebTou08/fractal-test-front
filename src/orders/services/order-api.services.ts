import axios, {AxiosInstance} from "axios";
import {OrderInterface} from "../models/order-interface";
import {ProductsInterface} from "../models/products-interface";
import {CreateOrderInterface} from "../models/create-order-interface";
import {Status} from "../models/content-interface";
import {ProdyctsByOrderInterface} from "../models/prodycts-by-order-interface";

export default class OrderService{
    private instance: AxiosInstance  = axios.create({
        baseURL: 'http://localhost:8080/fractal-api/',
    });

    async getAllOrders(): Promise<Array<OrderInterface>>{
        return (await this.instance.get('orders')).data;
    }

    async getAllProducts(): Promise<ProductsInterface>{
        return (await this.instance.get('products')).data;
    }

    async addProductToOrder(orderId: number, productId: number, quantity: number){
        return (await this.instance.put(`order/${orderId}/product/${productId}`,{
            "quantity": quantity
        })).data;
    }

    async createNewOrder(): Promise<CreateOrderInterface>{
        const data = {
            "date": new Date(),
            "orderNumber": Math.random() * (99999999 - 1111111) + 1111111,
            "status": Status.Pending
        }
        return (await this.instance.post('orders', data)).data;
    }

    async removeProductFromOrder(orderId: number, productId: number): Promise<Boolean>{
        return (await this.instance.put(`order/${orderId}/remove/product/${productId}`)).status.toString().startsWith('2');
    }

    async getAllProductsIntoAnSpecificOrder(orderId: number):Promise<Array<ProdyctsByOrderInterface>>{
        return (await this.instance.get(`/order/${orderId}/products`)).data;
    }

  async updateProductQuantityForSpecificOrder(orderId: number, productId: number, quantity: number): Promise<any>{
        return (await this.instance.put(`order/${orderId}/update/product/${productId}`, {"quantity": quantity})).data;
    }
}

