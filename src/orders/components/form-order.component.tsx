import * as React from 'react';
import {useEffect, useMemo, useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Content} from "../models/content-interface";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    useTheme
} from '@mui/material';
import OrderService from "../services/order-api.services";
import {ProductsInterface} from "../models/products-interface";
import {ProductsContentInterface} from "../models/products-content-interface";
import {useParams} from "react-router-dom";
import TableOrdersComponent from "./table-orders.component";
import OrderDetail from "./table-produc-order.component";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


interface SelectedOrder {
    data: Content,
    tittle: string
}

export default function FormOrderComponent({data, tittle}: SelectedOrder) {

    const params = useParams();
    const [ordernNum, setOrderNum] = useState<number>(data.orderNumber);
    const [date, setDate] = useState<Date>(new Date());
    const [numProducts, setNumProducts] = useState(0);
    const [finalPrice, setFinalPrice] = useState<number>(data.finalPrice);
    const [products, setProducts] = useState<ProductsInterface>();
    const service = useMemo<OrderService>(() => new OrderService(), []);
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const [addedProduct, setAddedProduct] = useState<ProductsContentInterface>();
    const [quantityForSelectedProd, setQuantityForSelectedProd] = useState<any>();

    const [idForNewProd, setIdForNewProd] = useState<number>(0);

    useEffect(
        () => {
            const loadProducts = async () => {
                const response = (await service.getAllProducts());
                setProducts(response);
            }
            const createNewOrder = async () => {
                const response = await service.createNewOrder();
                setFinalPrice(response.finalPrice);
                setOrderNum(response.orderNumber);
                setDate(response.date);
                setIdForNewProd(response.id);
            }
            if (params.id == '0') {
                createNewOrder();
            }
            loadProducts();
        }
        , [])

    if (!products) {
        return <div> Cargando...</div>
    }
    //NOTE: modal properties
    const handleChangeForSelectedProduct = (event: SelectChangeEvent<any>) => {
        setAddedProduct({
            id: event.target.value.id,
            price: event.target.value.price,
            name: event.target.value.name
        });
        console.log(event.target.value);
        console.log({addedProduct})
        //setOpen(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = async (event: React.SyntheticEvent<unknown>, reason?: string) => {
        await addProductsToOrder();
        if (reason !== 'backdropClick') {
            setOpen(false);
        }
    };


    const orderNumChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOrderNum(Number(event.target.value));
    };

    const quantityForProdHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
        //console.log(event.target.value)
        setQuantityForSelectedProd(event.target.value);
    };
    const saveChanges = () => {
        console.log("saved")
    }

    let productsArray;
    const showProducts = () => {
        productsArray = products.content.map((p) => {
            return {}
        })
    }

    const addProductsToOrder = async () => {
        let updatedPrice;
        updatedPrice = (await service.addProductToOrder(Number(params.id) == 0 ? idForNewProd : Number(params.id), addedProduct?.id!, quantityForSelectedProd)).finalPrice;
        setFinalPrice(updatedPrice)
    }

    return (
        <div>

        <Box
            component="form"
            sx={{
                '& > :not(style)': {m: 1, width: '25ch'},
            }}
            noValidate
            autoComplete="off"
        >
            <h3>{tittle}</h3>

            <TextField
                id="outlined-name"
                label="OrderNum"
                value={ordernNum}
                onChange={orderNumChanged}
            />
            <TextField
                id="outlined-name"
                label="Date"
                disabled
                value={new Date(date).toDateString()}
            />
            <TextField
                id="outlined-name"
                label="# of products"
                value={numProducts}
                disabled
            />
            <TextField
                id="outlined-name"
                label="Final Price"
                disabled
                value={finalPrice}
            />

            <Button onClick={handleClickOpen}>Add new product to this order</Button>
            <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                <DialogTitle>Select the product</DialogTitle>
                <DialogContent>
                    <Box component="form" sx={{display: 'flex', flexWrap: 'wrap'}}>
                        <FormControl sx={{m: 1, minWidth: 120}}>
                            <InputLabel htmlFor="demo-dialog-native">Product</InputLabel>
                            <Select
                                labelId="demo-multiple-name-label"
                                id="demo-multiple-name"
                                value={addedProduct}
                                onChange={handleChangeForSelectedProduct}
                                input={<OutlinedInput label="Name"/>}
                                MenuProps={MenuProps}
                            >

                                {products.content.map((prod) => (
                                    // @ts-ignore
                                    <MenuItem
                                        key={prod.id}
                                        value={prod}
                                        name={prod.name}
                                    >
                                        {prod.name}
                                    </MenuItem>
                                ))}

                            </Select>
                            <TextField
                                id="outlined-name"
                                label="Quantity"
                                value={quantityForSelectedProd}
                                onChange={quantityForProdHandle}
                            />
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Ok</Button>
                </DialogActions>
            </Dialog>
            
        </Box>
            <div>
                <OrderDetail service={service}  id={params.id == '0' ? idForNewProd : Number(params.id)} />
            </div>
        </div>
    );
}
