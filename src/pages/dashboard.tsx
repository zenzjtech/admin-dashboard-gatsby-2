import React from 'react'
import { Dashboard } from '../views';
import { RouteWithLayout } from '../components';
import { Main as MainLayout } from '../layouts';

const DashboardPage = () => (
	<RouteWithLayout
		component={Dashboard}
		layout={MainLayout}
	/>
)

export default DashboardPage
