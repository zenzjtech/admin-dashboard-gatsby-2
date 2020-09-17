import React from 'react'
import { navigate } from 'gatsby'
import { connect } from 'react-redux'

const PrivateRoute = ({ loggedIn, location, component: Component, ...rest}) => {
	if (!loggedIn && location.pathname !== '/login') {
		navigate('/login');
		return null;
	}

	return (
		<Component {...rest}/>
	)
}

const mapStateToProps = (state)=> {
	return {
		loggedIn: state.auth.loggedIn,
	}
}


export default connect(mapStateToProps)(PrivateRoute)
