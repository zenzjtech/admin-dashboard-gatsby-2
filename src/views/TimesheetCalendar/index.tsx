import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(4)
	}
}))

const TimesheetCalendar = props => {
	const { currentTimesheet} = props;
	const classes = useStyles();
	const [value, setValue] = useState(new Date());
	function onChange(nextValue) {
		setValue(nextValue);
	}
	console.log(currentTimesheet);
	const getWorkDurationByDate = (date) => {
		const found = currentTimesheet.dailyReports.find(
			ts => {
				const tsDate = new Date(ts.day);
				return ts.key == date.getDate() && tsDate.getMonth() + 1 === date.getMonth()
			}
		);
		if (found)
			return found.workDuration;
		return null;
	}
	return (
		<div className={classes.root}>
			<Calendar
				onChange={onChange}
				value={value}
				tileContent={
					({ activeStartDate, date, view }) => view === 'month' ?
						<p style={{font: "italic"}}>{getWorkDurationByDate(date)}</p> : null
				}
			/>
		</div>
	)
}

const mapStateToProps = state => ({
	currentTimesheet: state.timesheet.currentTimesheet
})
export default connect(mapStateToProps)(TimesheetCalendar);
