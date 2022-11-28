import {useEffect, useMemo, useState} from "react";
import {OrderInterface} from "../models/order-interface";
import OrderService from "../services/order-api.services";
import TableOrdersComponent from "../components/table-orders.component";
import {useNavigate} from "react-router-dom";

export default  function MyOrders() {
    const navigate= useNavigate();
    const [orders, setOrders] = useState<Array<OrderInterface>>();
    const orderService = useMemo<OrderService>(()=> new OrderService(), []);

    useEffect(
        () => {
            const fetchOrders = async () => {
               const response=  await orderService.getAllOrders();
               // @ts-ignore
                setOrders(response);
               console.log(orders)
            }
            fetchOrders();
        }
        ,[])

    if(!orders){
        return <div> Cargando...</div>
    }


    const navigateToEditPage =() => {
        navigate('/edit/0');
    }
    return(
        <div>
            <TableOrdersComponent data={orders!} />
            <button onClick={ navigateToEditPage}>new</button>
        </div>
    )
}
