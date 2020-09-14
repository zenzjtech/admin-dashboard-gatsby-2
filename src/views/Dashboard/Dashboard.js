import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import { timesheetActions } from '../../actions'

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

function Row(props) {
    let { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
    row.history = [
        { date: '2020-01-05', customerId: '11091700', amount: 3 },
        { date: '2020-01-02', customerId: 'Anonymous', amount: 1 },
    ]
    
    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.userid}
                </TableCell>
                <TableCell align="right">{row.key}</TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{(new Date(row.starts)).toDateString()}</TableCell>
                <TableCell align="right">{(new Date(row.ends)).toDateString()}</TableCell>
                <TableCell align="right">Monthly</TableCell>
                <TableCell align="right">Last timesheet</TableCell>
                <TableCell align="right">{row.status}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                History
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Customer</TableCell>
                                        <TableCell align="right">Amount</TableCell>
                                        <TableCell align="right">Total price ($)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.history.map((historyRow) => (
                                        <TableRow key={historyRow.date}>
                                            <TableCell component="th" scope="row">
                                                {historyRow.date}
                                            </TableCell>
                                            <TableCell>{historyRow.customerId}</TableCell>
                                            <TableCell align="right">{historyRow.amount}</TableCell>
                                            <TableCell align="right">
                                                {Math.round(historyRow.amount * row.price * 100) / 100}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}


function CollapsibleTable(props) {
    const { getAllTimesheet } = props;
    const [timesheet, setTimesheet] = useState([]);
    
    useEffect(() => {
        (async () => {
            const response = await getAllTimesheet();
            setTimesheet(response.content);
        })()
    }, []);
    
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Client</TableCell>
                        <TableCell align="right">Job Id</TableCell>
                        <TableCell align="right">Job name</TableCell>
                        <TableCell align="right">Start</TableCell>
                        <TableCell align="right">End</TableCell>
                        <TableCell align="right">Frequency</TableCell>
                        <TableCell align="right">Last Timesheet</TableCell>
                        <TableCell align="right">Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {timesheet
                        .sort((a, b) => new Date(b.starts) - new Date(a.starts))
                        .map((ts) => (
                            <Row key={ts.id} row={ts} />
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        getAllTimesheet: () => dispatch(timesheetActions.getAllTimesheet())
    }
}

export default connect(undefined, mapDispatchToProps)(CollapsibleTable)
