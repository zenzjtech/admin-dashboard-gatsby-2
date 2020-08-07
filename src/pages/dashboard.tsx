import React from 'react'
import PrivateRoute from '../components/PrivateRoute'
import { Router } from '@reach/router'
import { Dashboard } from '../views';
import { RouteWithLayout } from '../components';
import { Main as MainLayout } from '../layouts';

const DashboardPage = () => (
	<Router>
		<PrivateRoute default component={
			() => <RouteWithLayout component= {Dashboard} layout={MainLayout}/>
		}/>
	</Router>
)

export default DashboardPage
