import axios, {AxiosInstance} from "axios";
import {OrderInterface} from "../models/order-interface";
import {ProductsInterface} from "../models/products-interface";

export default class OrderService{
    private instance: AxiosInstance  = axios.create({
        baseURL: 'http://localhost:8080/fractal-api/',
    });

    async getAllOrders(): Promise<OrderInterface>{
        return (await this.instance.get('/orders')).data;
    }

    async getAllProducts(): Promise<ProductsInterface>{
        return (await this.instance.get('/products')).data;
    }


}

