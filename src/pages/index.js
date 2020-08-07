import React from 'react';
import { navigate} from 'gatsby'
import { connect } from 'react-redux'

const IndexPage = (props) => {
	const destination = props.loggedIn ? '/dashboard' : '/login'
	navigate(destination)
	return (
		<></>
	)
};

const mapStateToProps = (state) => {
	return {
		loggedIn: state.auth.loggedIn
	}
}
export default connect(mapStateToProps)(IndexPage);
