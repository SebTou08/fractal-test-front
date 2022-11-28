import {useParams} from "react-router-dom";
import {useEffect, useMemo, useState} from "react";
import {Content, Status} from "../models/content-interface";
import OrderService from "../services/order-api.services";
import FormOrderComponent from "../components/form-order.component";

export default function NewOrder() {

    const params = useParams();
    const orderService = useMemo<OrderService>(() => new OrderService(), []);
    //const [orderProduct, setOrderProduct] = useState<>();

    const [actualOrder, setActualOrder] = useState<Content>();
    const [tittle, setTittle] = useState<string>();
    useEffect(
        () => {
            const setDefaultValues = () => {
                setActualOrder({
                    id: 0,
                    orderNumber: 0,
                    date: new Date(),
                    status: Status.Pending,
                    finalPrice: 0
                })
            }
            const validateExistingOrder = async () => {

                const response = (await orderService.getAllOrders()).filter(e => e.id.toString() === params.id).at(0);
                console.log({response})
                if (response == null) {
                    setDefaultValues();
                    setTittle('New Order')
                } else {
                    setTittle('Edit order')
                    setActualOrder(response);
                }


            }
            validateExistingOrder();
        }
        , [])


    if (!actualOrder) {
        return <div> Cargando...</div>
    }
    return (
        <div>
            <FormOrderComponent  data={actualOrder!} tittle={tittle!}/>

        </div>
    )
}
