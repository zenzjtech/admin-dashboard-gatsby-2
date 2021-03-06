import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { timesheetActions, userActions, appActions } from '../../../../actions'
import { Link } from '@material-ui/core'
import { navigate } from '@reach/router'

const useRowStyles = makeStyles({
	root: {
		'& > *': {
			borderBottom: 'unset',
		},
	},
});

function Row(props) {
	let { row, setCurrentTimesheet } = props;
	const classes = useRowStyles();

	return (
		<React.Fragment>
			<TableRow className={classes.root}>
				<TableCell align="right">
					<Link
						href="/calendar"
						onClick={(e) => {
							e.preventDefault();
							setCurrentTimesheet(row)
							navigate('/calendar')
						}}
					>
						{row.key}
					</Link>
				</TableCell>
				<TableCell align="right">{row.name}</TableCell>
				<TableCell align="right">{(new Date(row.starts)).toDateString()}</TableCell>
				<TableCell align="right">{(new Date(row.ends)).toDateString()}</TableCell>
				<TableCell align="right">Monthly</TableCell>
				<TableCell align="right">Last timesheet</TableCell>
				<TableCell align="right">{row.status}</TableCell>
			</TableRow>
		</React.Fragment>
	);
}


function CollapsibleTable(props) {
	const { getAllTimesheet,
		setCurrentTimesheet,
		refreshToken,
		showError
	} = props;
	const [timesheet, setTimesheet] = useState([]);

	useEffect(() => {
		(async () => {
			// If user is already logged in, we will check
			// if the token has yet to expired.
			try {
				try {
					await refreshToken()
				} catch (e) {
					showError('Your login has expired, please relogin at the login page' );
					return;
				}
				const response = await getAllTimesheet();
				setTimesheet(response.content);
			} catch (e) {
				showError('There is some errors loading content, please check again at later time')
			}
		})()
	}, []);

	return (
		<TableContainer component={Paper}>
			<Table aria-label="collapsible table">
				<TableHead>
					<TableRow>
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
						.sort((a, b) => {
							// ts-ignore
							return (new Date(b.starts)).getTime() - (new Date(a.starts)).getTime()
						})
						.map((ts) => (
							<Row
								key={ts.id} row={ts}
								setCurrentTimesheet={setCurrentTimesheet}
							/>
						))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

const mapDispatchToProps = dispatch => {
	return {
		getAllTimesheet: () => dispatch(timesheetActions.getAllTimesheet()),
		setCurrentTimesheet: (ts) => dispatch(timesheetActions.setCurrentTimesheet(ts)),
		refreshToken: () => dispatch(userActions.refreshToken()),
		showError: (message) => dispatch(appActions.showError(message))
	}
}

export default connect(undefined, mapDispatchToProps)(CollapsibleTable)
