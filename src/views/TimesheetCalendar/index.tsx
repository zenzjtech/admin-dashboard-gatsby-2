import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import {
	Button,
	Card,
	CardActions,
	CardContent,
	FormControl,
	Grid,
	Input,
	InputLabel,
	Typography,
} from '@material-ui/core'

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
	const [tag, setTag] = useState(undefined);
	const [comments, setComments] = useState(undefined);

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
					lg={8}
					md={6}
					xl={8}
					xs={12}
				>
					<Card>
						<form>
							<CardContent>
								<Typography
									variant={"h4"}
									component={"h4"}
									className={classes.headerText}
								>
									Edit daily timesheet
								</Typography>
								<FormControl>
									<InputLabel htmlFor="workload">Workload (hours) </InputLabel>
									<Input
										id="workload"
										value={workload}
										type={"number"}
										onChange={(e) => setWorkload(parseInt(e.target.value))}
									/>
								</FormControl>
								<FormControl>
									<InputLabel htmlFor="tag">Tag </InputLabel>
									<Input
										id="tag"
										value={tag}
										type={"text"}
										onChange={(e) => setTag(e.target.value)}
									/>
								</FormControl>
								<FormControl>
									<InputLabel htmlFor="comments">Comment </InputLabel>
									<Input
										id="comments"
										value={comments}
										type={"text"}
										onChange={(e) => setComments(e.target.value)}
									/>
								</FormControl>
							</CardContent>
							<CardActions>
								<Button size="small" color="primary">
									Share
								</Button>
							</CardActions>
						</form>
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
