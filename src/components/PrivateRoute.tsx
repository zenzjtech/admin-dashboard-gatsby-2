import React, { useEffect, useState } from 'react'
import { navigate } from 'gatsby'
import { connect } from 'react-redux'
import { userActions } from '../actions'

const PrivateRoute = ({ loggedIn, location, component: Component, ...rest}) => {
	const [error, setError] = useState('');
	if (!loggedIn && location.pathname !== '/login') {
		navigate('/login');
		return null;
	}
	// If user is already logged in, we will check
	// if the token has yet to expired.
	useEffect(() => {
		rest
			.refreshToken(rest.user.refreshToken)
			.catch(e => {
				setError(e)
			})
	},[])

	return (
		<Component {...rest}/>
	)
}

const mapStateToProps = (state)=> {
	return {
		loggedIn: state.auth.loggedIn,
		user: state.auth.user
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		refreshToken: refreshToken => dispatch(userActions.refreshToken(refreshToken))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute)
