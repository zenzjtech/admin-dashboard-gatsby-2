import React from 'react'
import PrivateRoute from '../components/PrivateRoute'
import { Router } from '@reach/router'
import { Calendar } from '../views';
import { RouteWithLayout } from '../components';
import { Main as MainLayout } from '../layouts';

const DashboardPage = () => (
	<Router>
		<PrivateRoute default component={
			() => <RouteWithLayout component= {Calendar} layout={MainLayout}/>
		}/>
	</Router>
)

export default DashboardPage
