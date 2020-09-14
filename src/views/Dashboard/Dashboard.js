import React from 'react'
import { TimesheetTable } from './components'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(4)
	}
}))

const Dashboard = () => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<TimesheetTable/>
		</div>
	)
}

export default Dashboard;
