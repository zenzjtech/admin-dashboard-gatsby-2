import React from 'react';
import Login from '../components/Login';
import { RouteWithLayout } from '../components';
import { Minimal as MinimalLayout } from '../layouts';

const LoginPage = () => (
	<RouteWithLayout
		component={Login}
		layout={MinimalLayout}
	/>
)

export default LoginPage

