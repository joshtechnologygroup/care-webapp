import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import IconButton from '@material-ui/core/IconButton';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import CreateUpdateForm from './CreateUpdateForm';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: '#839fde',
        color: theme.palette.common.white,
        fontSize: 12,
        lineHeight: 1.2,
        padding: `0.8rem 1.6rem`
    },
    body: {
        fontSize: 13,
        padding: `1rem 1.6rem`
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

function createData(name, phone, email) {
    return { name, phone, email };
}

const rows = [
    createData('Frozen yoghurt', 9891782124, 'frozen_yoghurt@covid.com'),
    createData('Ice cream sandwich', 9891782124, 'ice_cream_sandwich@covid.com'),
    createData('Eclair', 9891782124, 'eclair@covid.com'),
    createData('Cupcake', 9891782124, 'cupcake@covid.com'),
    createData('Gingerbread', 9891782124, 'gingerbread@covid.com'),
];

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
    editBtn: {
        padding: 0
    }
});

export default function InchargeList() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [selectedRow, setSelectedRow] = React.useState({name: '', email: '', phone:''});

    const handleClick = (row) => {
        setOpen(true);
        setSelectedRow(row);
    }

    const handleClose = () => {
        setOpen(false);
    }
    return (
        <React.Fragment>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Incharge name</StyledTableCell>
                            <StyledTableCell align="left">Phone</StyledTableCell>
                            <StyledTableCell align="left">Email</StyledTableCell>
                            <StyledTableCell>Edit</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow key={row.name}>
                                <StyledTableCell component="th" scope="row">
                                    {row.name}
                                </StyledTableCell>
                                <StyledTableCell align="left">{row.phone}</StyledTableCell>
                                <StyledTableCell align="left">{row.email}</StyledTableCell>
                                <StyledTableCell>
                                    <IconButton onClick={() => handleClick(row)} className={classes.editBtn} color="primary" aria-label="edit">
                                        <EditIcon />
                                    </IconButton>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <CreateUpdateForm editMode={true} details={selectedRow} open={open} onClose={handleClose} />
        </React.Fragment>
    );
}
