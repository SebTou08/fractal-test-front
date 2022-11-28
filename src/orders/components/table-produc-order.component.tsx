import * as React from "react";
import {useEffect, useMemo, useState} from "react";
import {ProdyctsByOrderInterface} from "../models/prodycts-by-order-interface";
import OrderService from "../services/order-api.services";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import {StyledTableCell, StyledTableRow} from "./table-orders.component";
import {
    Box,
    Button,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput, Select, TextField
} from "@mui/material";


function createData(
    id: number,
    name: string,
    unitPrice: number,
    quantity: number,
    finalPrice: number,
) {
    return {id, name, unitPrice, quantity, finalPrice};
}

interface CustomizedProps {
    id: number,
    service: OrderService
}


export default function OrderDetail({id, service}: CustomizedProps) {
    const [productsByOrder, setProductsByOrder] = useState<Array<ProdyctsByOrderInterface>>();
    const fetchProductsByOrderId = async () => {
        setProductsByOrder(await service.getAllProductsIntoAnSpecificOrder(id));
    }
    const [open, setOpen] = useState(false);
    const [newQuantityProd, setNewQuantityProd] = useState<number>();
    useEffect(
        () => {
            fetchProductsByOrderId()
        }
        , []);

    const rows = useMemo(
        () =>

            productsByOrder?.map((e) =>
                createData(
                    e.product.id,
                    e.product.name,
                    e.product.price,
                    e.quantity,
                    e.quantity * e.product.price
                )
            )
        , [productsByOrder, service])
    console.log({rows})
    if (!productsByOrder) {
        return <h3>cargando...</h3>
    }
    const removeProduct = async (productId: number) => {
        const removedSuccessfully = await service.removeProductFromOrder(id, productId);
        if (removedSuccessfully) {
            await fetchProductsByOrderId();
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = async (event: React.SyntheticEvent<unknown>, reason?: string) => {
        if (reason !== 'backdropClick') {
            setOpen(false);
        }
    };

    const saveNewQuantity = async (productId: number) => {
        await service.updateProductQuantityForSpecificOrder(id, productId, newQuantityProd!)
        setOpen(false);
    }

    const quantityForProdHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewQuantityProd(Number(event.target.value))
    };

    return (
        <div>
            <div>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 700}} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Orders</StyledTableCell>
                                <StyledTableCell align="right">ID</StyledTableCell>
                                <StyledTableCell align="right">Name</StyledTableCell>
                                <StyledTableCell align="right">Unit price</StyledTableCell>
                                <StyledTableCell align="right">Quantity</StyledTableCell>
                                <StyledTableCell align="right">Total Price</StyledTableCell>
                                <StyledTableCell align="right">Options</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows?.map((row) => (
                                <StyledTableRow key={row.id}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.id}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{row.id}</StyledTableCell>
                                    <StyledTableCell align="right">{row.name}</StyledTableCell>
                                    <StyledTableCell align="right">{row.unitPrice}</StyledTableCell>
                                    <StyledTableCell align="right">{row.quantity}</StyledTableCell>
                                    <StyledTableCell align="right">{row.finalPrice}</StyledTableCell>
                                    <StyledTableCell align="right">
                                        <div>
                                            <Button variant="text" onClick={handleClickOpen}>Edit</Button>
                                            <Button variant="text" onClick={() => removeProduct(row.id)}>Delete</Button>
                                            <div>
                                                <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                                                    <DialogTitle>Select the product</DialogTitle>
                                                    <DialogContent>
                                                        <Box component="form" sx={{display: 'flex', flexWrap: 'wrap'}}>
                                                            <FormControl sx={{m: 1, minWidth: 120}}>

                                                                <TextField
                                                                    id="outlined-name"
                                                                    label="Quantity"
                                                                    value={newQuantityProd}
                                                                    onChange={quantityForProdHandle}
                                                                />
                                                            </FormControl>
                                                        </Box>
                                                    </DialogContent>
                                                    <DialogActions>
                                                        <Button onClick={handleClose}>Cancel</Button>
                                                        <Button onClick={() => saveNewQuantity(row.id)}>Ok</Button>
                                                    </DialogActions>
                                                </Dialog>
                                            </div>
                                        </div>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

        </div>
    )
}
