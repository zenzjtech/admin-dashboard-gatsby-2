function compareTimesheet(ts1, ts2) {
	return (new Date(ts1.day)).getTime() - (new Date(ts2.day)).getTime();
}
function getEarliestReport(timesheet) {
	const sorted = timesheet.dailyReports.sort(compareTimesheet);
	if (sorted.length)
		return new Date(sorted[0].day);
	return new Date(timesheet.starts);
}

function getLatestReport(timesheet) {
	const sorted = timesheet.dailyReports.sort(compareTimesheet);
	if (sorted.length)
		return new Date(sorted[sorted.length - 1].day);
	return null;
}

function getWorkloadByDate(timesheet, currentDate) {
	const correspondingDate = timesheet
		.dailyReports
		.find(d => (new Date(d.day)).toDateString() === currentDate.toDateString());
	if (!correspondingDate)
		return null;
	return correspondingDate.workDuration;
}

export default {
	getEarliestReport,
	getLatestReport,
	getWorkloadByDate
}
