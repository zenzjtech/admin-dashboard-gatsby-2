import React from 'react'
import { navigate } from 'gatsby'
import { connect } from 'react-redux'
import PageError from '../components/Error/PageError';

const PrivateRoute = ({ loggedIn, location, component: Component, ...rest}) => {
	if (!loggedIn && location.pathname !== '/login') {
		navigate('/login');
		return null;
	}

	return (
		<React.Fragment>
			<PageError/>
			<Component {...rest}/>
		</React.Fragment>
	)
}

const mapStateToProps = (state)=> {
	return {
		loggedIn: state.auth.loggedIn,
	}
}


export default connect(mapStateToProps)(PrivateRoute)
