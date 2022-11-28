import * as React from 'react';
import {useMemo} from 'react';
import {styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Status} from "../models/content-interface";
import {OrderInterface} from "../models/order-interface";
import {useNavigate} from "react-router-dom";

export const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

export const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(
    id: number,
    orderNumber: number,
    date: Date,
    finalPrice: number,
    status: string
) {
    return {id, orderNumber, date, finalPrice, status};
}


interface CustomizedTableProps {
    data: OrderInterface[]
}

export default function TableOrdersComponent({data}: CustomizedTableProps) {


    const rows = useMemo(() =>
            data.map((e) =>
                createData(e.id, e.orderNumber,
                    new Date(e.date), e.finalPrice, e.status.toString())
            )
        , [data]);

    const navigate= useNavigate();
    const navigateToEditPage =(id: number) => {
        console.log(data)
        if (data.filter(e => e.id === id).at(0)!.status != Status.Completed){
            navigate('/edit/'+ id.toString());
        }
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 700}} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Orders</StyledTableCell>
                        <StyledTableCell align="right">ID</StyledTableCell>
                        <StyledTableCell align="right">Order Number</StyledTableCell>
                        <StyledTableCell align="right">Date</StyledTableCell>
                        <StyledTableCell align="right">Final Price</StyledTableCell>
                        {/*<StyledTableCell align="right"># Products</StyledTableCell>*/}
                        <StyledTableCell align="right">Status</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.id} onClick={() => navigateToEditPage(row.id)}>
                            <StyledTableCell component="th" scope="row">
                                {row.id}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.id}</StyledTableCell>
                            <StyledTableCell align="right">{row.orderNumber}</StyledTableCell>
                            <StyledTableCell align="right">{row.date.toDateString()}</StyledTableCell>
                            <StyledTableCell align="right">{row.finalPrice}</StyledTableCell>
                            {/*<StyledTableCell align="right">{row.numProducts}</StyledTableCell>*/}
                            <StyledTableCell align="right">{row.status}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
