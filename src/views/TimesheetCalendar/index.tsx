import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Card, CardContent, FormControl, Grid, Input, InputLabel, Typography } from '@material-ui/core'

import { timesheetHelper } from '../../helpers';
import { timesheet } from '../../reducers/timesheet.reducer'

const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(4)
	},
	headerText: {
		textAlign: 'center'
	}
}))

const TimesheetCalendar = props => {
	const { currentTimesheet } = props;
	const classes = useStyles();
	const [currentDate, setCurrentDate] = useState(timesheetHelper.getEarliestReport(currentTimesheet));
	const [workload, setWorkload] = useState(0);

	function onDateChange(nextValue) {
		setCurrentDate(nextValue);
		setWorkload(timesheetHelper.getWorkloadByDate(currentTimesheet, nextValue) || 0);
	}
	console.log(currentTimesheet);
	return (
		<div className={classes.root}>
			<Grid
				container
				spacing={4}
			>
				<Grid
					item
					lg={4}
					md={6}
					xl={4}
					xs={12}
				>
					<Calendar
						onChange={onDateChange}
						value={currentDate}
						tileContent={
							({ date, view }) => view === 'month' ?
								<p style={{font: "italic"}}>{timesheetHelper.getWorkloadByDate(currentTimesheet, date)}</p> : null
						}
					/>
				</Grid>
				<Grid
					item
					lg={6}
					md={6}
					xl={8}
					xs={12}
				>
					<Card>
						<CardContent>
							<Typography
								variant={"h4"}
								component={"h4"}
								className={classes.headerText}
							>
								Edit daily timesheet
							</Typography>
							<form>
								<FormControl>
									<InputLabel htmlFor="component-simple">Workload (hours) </InputLabel>
									<Input
										id="component-simple"
										value={workload}
										type={"number"}
										onChange={(e) => setWorkload(parseInt(e.target.value))} />
								</FormControl>
							</form>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</div>
	)
}

const mapStateToProps = state => ({
	currentTimesheet: state.timesheet.currentTimesheet
})
export default connect(mapStateToProps)(TimesheetCalendar);
